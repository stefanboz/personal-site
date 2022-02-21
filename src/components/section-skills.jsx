import Section from '@/components/section';
import SummaryItem from '@/components/summary-item';

const SectionSkills = ({ skills }) => {
  return (
    <Section title="Skills">
      {skills[0].fields.skill.map(item => {
        return (
          <SummaryItem key={item.id} name={item.key} description={item.value} />
        );
      })}
    </Section>
  );
};

export default SectionSkills;
