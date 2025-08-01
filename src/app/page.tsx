import Hero from "./sections/Hero";
import PartnersAndProjects from "./sections/PartnersAndProjects";
import HowZKEmailWorks from "./sections/HowZKEmailWorks";
import Resources from "./sections/Resources";
import FAQs from "./sections/FAQs";

export default function Home() {
  return (
    <div className="grid-container">
      <div className="noise-layer" />
      <div
        className="noise-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8.25rem",
          overflow: "auto",
        }}
      >
        <Hero />
        <PartnersAndProjects />
        <HowZKEmailWorks />
        <Resources />
        <FAQs />
      </div>
    </div>
  );
}
