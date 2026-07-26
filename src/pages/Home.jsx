import Hero from "../components/Hero";
import About from "../components/About";
import Founders from "../components/Founders";
import ExecutiveCommittee from "../components/ExecutiveCommittee";
import Stats from "../components/Stats";
import GalleryPreview from "../components/GalleryPreview";
import OfficialDocuments from "../components/OfficialDocuments";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Founders />
      <ExecutiveCommittee />
      <Stats />
      <GalleryPreview />
      <OfficialDocuments />
    </>
  );
}
