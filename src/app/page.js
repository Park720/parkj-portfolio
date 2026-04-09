import Navbar       from '@/components/Navbar';
import HomeSection    from '@/components/sections/HomeSection';
import AboutSection   from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection  from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper">
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Junhyung Park · junhyungpark.dev
      </footer>
    </>
  );
}
