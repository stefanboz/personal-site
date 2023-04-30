import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getSiteHeaderData, getBlogPosts } from '@/util/api';

import Section from '@/components/section';
import SummaryItem from '@/components/summary-item';

const Blog = () => {
  const { data: postsData } = useQuery('blogPosts', getBlogPosts);

  return (
    <>
      <Section title="All Blog Posts">
        {!!postsData.posts.length &&
          postsData.posts.map(post => {
            return (
              <SummaryItem
                key={`post-${post.sys.id}`}
                name={post.fields.title}
                description={post.fields.subtitle}
                link={post.fields.slug}
                internal
              />
            );
          })}
      </Section>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('headerData', getSiteHeaderData);

  await queryClient.prefetchQuery('blogPosts', getBlogPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
