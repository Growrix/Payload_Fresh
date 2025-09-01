import HeroSection from '../components/HeroSection';
import DemoGrid from '../components/DemoGrid';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <>
      <HeroSection />
      <DemoGrid />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <ContactForm />
      </section>
    </>
  );
}
