import Section from '@/components/section';

const SectionContact = ({ contactInfo }) => {
  return (
    <Section title="Contact">
      <div className="mb-6">
        <p>{contactInfo[0].fields.contactInfo}</p>
      </div>
    </Section>
  );
};

export default SectionContact;
