import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ImagePlus, LogOut, Trash2, UploadCloud } from "lucide-react";
import { auth, db, storage } from "./Firebase";

const MAX_IMAGES = 30;

const emptyForm = { titleEn: "", titleTa: "", descriptionEn: "", descriptionTa: "" };

export default function Admin() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Guard the route: anyone without a session gets bounced back to login.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login", { replace: true });
      } else {
        setCheckingAuth(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  // Live gallery list, oldest first.
  useEffect(() => {
    const q = query(collection(db, "galleryImages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setImages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadingImages(false);
      },
      () => setLoadingImages(false)
    );
    return unsubscribe;
  }, []);

  const isFull = images.length >= MAX_IMAGES;

  const handleFieldChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const resetForm = () => {
    setForm(emptyForm);
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setFormError("");

    if (isFull) {
      setFormError(`Gallery is full. Remove an image before adding another (limit ${MAX_IMAGES}).`);
      return;
    }
    if (!file) {
      setFormError("Choose an image to upload.");
      return;
    }
    if (!form.titleEn.trim() || !form.titleTa.trim()) {
      setFormError("Add a title in both English and Tamil.");
      return;
    }

    const path = `gallery/${crypto.randomUUID()}-${file.name}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    setUploading(true);
    task.on(
      "state_changed",
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (err) => {
        setFormError(err.message || "Upload failed. Try again.");
        setUploading(false);
      },
      async () => {
        try {
          const imageUrl = await getDownloadURL(task.snapshot.ref);
          await addDoc(collection(db, "galleryImages"), {
            imageUrl,
            storagePath: path,
            titleEn: form.titleEn.trim(),
            titleTa: form.titleTa.trim(),
            descriptionEn: form.descriptionEn.trim(),
            descriptionTa: form.descriptionTa.trim(),
            createdAt: serverTimestamp(),
          });
          resetForm();
        } catch (err) {
          setFormError(err.message || "Could not save image details.");
        } finally {
          setUploading(false);
        }
      }
    );
  };

  const handleDelete = async (image) => {
    if (!window.confirm("Delete this image? This can't be undone.")) return;
    setDeletingId(image.id);
    try {
      if (image.storagePath) {
        await deleteObject(ref(storage, image.storagePath));
      }
      await deleteDoc(doc(db, "galleryImages", image.id));
    } catch (err) {
      window.alert(err.message || "Could not delete image.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login", { replace: true });
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-bg">
        <p className="text-sm text-dark/50">Checking session…</p>
      </div>
    );
  }

  return (
    <section className="bg-bg py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-dark sm:text-3xl">
              Activity Gallery
            </h1>
            <p className="mt-1 text-sm text-dark/50">
              {images.length} / {MAX_IMAGES} images used
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-dark/15 px-4 py-2 text-sm font-medium text-dark transition hover:bg-dark/5"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Upload form */}
        <div className="mb-10 rounded-2xl border border-dark/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-dark">
            <ImagePlus size={18} className="text-primary" />
            Add Image
          </h2>

          {isFull && (
            <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
              You've reached the {MAX_IMAGES}-image limit. Delete an image to add a new one.
            </p>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-dark/60">
                Image file
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                disabled={isFull || uploading}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-dark/70 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Title (English)"
                value={form.titleEn}
                onChange={handleFieldChange("titleEn")}
                disabled={isFull || uploading}
              />
              <Field
                label="Title (Tamil)"
                value={form.titleTa}
                onChange={handleFieldChange("titleTa")}
                disabled={isFull || uploading}
              />
              <Field
                label="Description (English)"
                value={form.descriptionEn}
                onChange={handleFieldChange("descriptionEn")}
                disabled={isFull || uploading}
                textarea
              />
              <Field
                label="Description (Tamil)"
                value={form.descriptionTa}
                onChange={handleFieldChange("descriptionTa")}
                disabled={isFull || uploading}
                textarea
              />
            </div>

            {formError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600" role="alert">
                {formError}
              </p>
            )}

            {uploading && (
              <div className="h-2 w-full overflow-hidden rounded-full bg-dark/10">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isFull || uploading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UploadCloud size={16} />
              {uploading ? `Uploading… ${progress}%` : "Add Image"}
            </button>
          </form>
        </div>

        {/* Existing images */}
        {loadingImages ? (
          <p className="text-sm text-dark/50">Loading gallery…</p>
        ) : images.length === 0 ? (
          <p className="text-sm text-dark/50">No images yet. Add the first one above.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-2xl border border-dark/10 bg-white shadow-sm">
                <div className="aspect-square overflow-hidden">
                  <img src={image.imageUrl} alt={image.titleEn} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-dark">{image.titleEn}</p>
                  <p className="truncate text-xs text-dark/50">{image.titleTa}</p>
                </div>
                <button
                  onClick={() => handleDelete(image)}
                  disabled={deletingId === image.id}
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 opacity-0 shadow-sm transition-opacity hover:bg-white group-hover:opacity-100 disabled:opacity-60"
                  aria-label="Delete image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Field({ label, value, onChange, disabled, textarea }) {
  const Component = textarea ? "textarea" : "input";
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-dark/60">
        {label}
      </label>
      <Component
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={textarea ? 3 : undefined}
        className="w-full rounded-xl border border-dark/15 bg-bg px-3 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}