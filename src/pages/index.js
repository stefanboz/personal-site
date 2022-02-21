import { dehydrate, QueryClient, useQuery } from 'react-query';

import SectionAbout from '@/components/section-about';
import SectionBlog from '@/components/section-blog';
import SectionExperience from '@/components/section-experience';
import SectionSkills from '@/components/section-skills';
import SectionContact from '@/components/section-contact';

import { getSiteHeaderData, getHomepageData, getBlogPosts } from '@/util/api';

export default function Index() {
  const { data: headerData } = useQuery('headerData', getSiteHeaderData);

  const { data: homepageData } = useQuery('homepageData', getHomepageData);

  const { data: postsData } = useQuery('blogPosts', getBlogPosts);

  return headerData && homepageData && postsData ? (
    <>
      <SectionAbout about={homepageData.aboutMe} />
      <SectionBlog posts={postsData.posts} />
      <SectionExperience experience={homepageData.workExperience} />
      <SectionSkills skills={homepageData.skills} />
      <SectionContact contactInfo={homepageData.contact} />
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('headerData', getSiteHeaderData);
  await queryClient.prefetchQuery('homepageData', getHomepageData);
  await queryClient.prefetchQuery('blogPosts', getBlogPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
