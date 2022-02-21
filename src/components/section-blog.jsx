import Link from 'next/link';

import Section from '@/components/section';
import SummaryItem from '@/components/summary-item';

const SectionBlog = ({ posts }) => {
  return (
    <Section title="Latest Posts">
      {posts.map(post => {
        return (
          <SummaryItem
            key={post.sys.id}
            name={post.fields.title}
            description={post.fields.subtitle}
            link={post.fields.slug}
            internal
          />
        );
      })}
      {posts.length >= 5 && (
        <Link href="/blog">
          <a className="text-gray-500 text-sm hover:text-black">
            View all posts &rarr;
          </a>
        </Link>
      )}
    </Section>
  );
};

export default SectionBlog;
