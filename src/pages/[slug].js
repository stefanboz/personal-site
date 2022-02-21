import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import {
  getSiteHeaderData,
  getBlogPosts,
  getSingleBlogPost,
  getPostComments,
} from '@/util/api';

import PostBody from '@/components/post-body';
import SectionSeparator from '@/components/section-separator';
import Comments from '@/components/comments-list';
import CommentForm from '@/components/comment-form';

export default function Post() {
  const router = useRouter();

  const { data } = useQuery(['singlePost', router.query.slug], () =>
    getSingleBlogPost(router.query.slug)
  );

  const { data: postComments } = useQuery(
    'comments',
    () => getPostComments(data.posts[0]),
    {
      enabled: !!data,
    }
  );

  return (
    <article>
      <Head>
        <title>
          Stefan Bozic |{' '}
          {data && !!data.posts.length
            ? data.posts[0].fields.title
            : 'Front-end Web Developer'}
        </title>
        <meta
          property="og:image"
          content={
            data && !!data.posts.length
              ? data.posts[0].fields.coverImage.fields.file.url
              : ''
          }
        />
      </Head>

      {data && !!data.posts.length && (
        <>
          <PostBody
            title={data.posts[0].fields.title}
            subtitle={data.posts[0].fields.subtitle}
            date={data.posts[0].fields.date}
            content={data.posts[0].fields.postContent}
            featuredImage={data.posts[0].fields.coverImage}
          />
          <SectionSeparator />

          {postComments && !!postComments.comments.length && (
            <Comments comments={postComments.comments} />
          )}
          <CommentForm postId={data.posts[0].sys.id} />
        </>
      )}
    </article>
  );
}

export async function getServerSideProps({ req }) {
  const { url } = req;

  let slug = url;

  if (url.charAt(0) === '/') {
    slug = url.slice(1);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('headerData', getSiteHeaderData);

  await queryClient.prefetchQuery('blogPosts', getBlogPosts);

  await queryClient.prefetchQuery(['singlePost', slug], () =>
    getSingleBlogPost(url)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
