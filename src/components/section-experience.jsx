import Section from './section';
import SummaryItem from './summary-item';

const SectionExperience = ({ experience }) => {
  if (!experience.length) return null;

  return (
    <Section title="Work Experience">
      {experience[0].fields.experience.data.map(item => {
        return (
          <SummaryItem
            key={item.name}
            name={item.name}
            description={item.content}
            link={item.link}
          />
        );
      })}
    </Section>
  );
};

export default SectionExperience;
