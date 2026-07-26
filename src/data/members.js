// Executive committee placeholder photos (17 members).
// Replace each import with the real photo file when available.
import m1 from "../assets/images/members/member-01.jpg";
import m2 from "../assets/images/members/member-02.jpg";
import m3 from "../assets/images/members/member-03.jpg";
import m4 from "../assets/images/members/member-04.jpg";
import m5 from "../assets/images/members/member-05.jpg";
import m6 from "../assets/images/members/member-06.jpg";
import m7 from "../assets/images/members/member-07.jpg";
import m8 from "../assets/images/members/member-08.jpg";
import m9 from "../assets/images/members/member-09.jpg";
import m10 from "../assets/images/members/member-10.jpg";
import m11 from "../assets/images/members/member-11.jpg";
import m12 from "../assets/images/members/member-12.jpg";
import m13 from "../assets/images/members/member-13.jpg";
import m14 from "../assets/images/members/member-14.jpg";
import m15 from "../assets/images/members/member-15.jpg";
import m16 from "../assets/images/members/member-16.jpg";
import m17 from "../assets/images/members/member-17.jpg";

// Placeholder names — replace with real committee member names.
const placeholderNames = [
  "R. Anbarasan", "K. Vijayalakshmi", "M. Suresh Kumar", "S. Kalaivani",
  "P. Rajendran", "T. Meenakshi", "V. Gopinath", "N. Saravanan",
  "A. Bhuvaneswari", "D. Manikandan", "L. Priyadharshini", "C. Sathish",
  "G. Kavitha", "J. Elumalai", "B. Ramya", "H. Sivakumar", "F. Nandhini"
];

export const members = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17].map(
  (photo, i) => ({ id: i + 1, photo, name: placeholderNames[i] })
);
