import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getSiteHeaderData, getLinks } from '@/util/api';

import Section from '@/components/section';
import SingleLink from '@/components/single-link';

const Links = () => {
  const { data } = useQuery('links', getLinks);

  return (
    <>
      <Section title="Some Useful Links">
        {!!data.links.length &&
          data.links[0].fields.links.map(link => (
            <SingleLink key={link.id} url={link.key} description={link.value} />
          ))}
      </Section>
    </>
  );
};

export default Links;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('headerData', getSiteHeaderData);

  await queryClient.prefetchQuery('links', getLinks);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
