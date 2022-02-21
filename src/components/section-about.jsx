import Section from '@/components/section';

const SectionAbout = ({ about }) => {
  return (
    <Section title="About Me">
      <div className="mb-6">
        <p>{about[0].fields.textContent}</p>
      </div>
    </Section>
  );
};

export default SectionAbout;
