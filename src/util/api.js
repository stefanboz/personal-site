import { createClient } from 'contentful';
import { createClient as createManagementClient } from 'contentful-management';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN,
});

export const managementClient = createManagementClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN,
});

export async function getSiteHeaderData() {
  const siteHeader = await client.getEntries({ content_type: 'siteHeader' });
  const avatar = await client.getEntries({ content_type: 'avatar' });
  const personalLinks = await client.getEntries({
    content_type: 'personalLinks',
  });

  return {
    siteHeader: siteHeader.items,
    avatar: avatar.items,
    personalLinks: personalLinks.items,
  };
}

export const getHomepageData = async () => {
  const aboutMe = await client.getEntries({ content_type: 'aboutMe' });

  const workExperience = await client.getEntries({
    content_type: 'workExperience',
  });

  const skills = await client.getEntries({
    content_type: 'skills',
  });

  const contact = await client.getEntries({
    content_type: 'contact',
  });

  return {
    aboutMe: aboutMe.items,
    workExperience: workExperience.items,
    skills: skills.items,
    contact: contact.items,
  };
};

export const getBlogPosts = async () => {
  const posts = await client.getEntries({ content_type: 'blogPost' });

  return {
    posts: posts.items,
  };
};

export const getSingleBlogPost = async url => {
  let slug = url;

  if (slug.charAt(0) === '/') {
    slug = url.slice(1);
  }

  const post = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });

  return {
    posts: post.items,
  };
};

export const getLinks = async () => {
  const links = await client.getEntries({ content_type: 'usefulLinks' });

  return {
    links: links.items,
  };
};

export const getPostComments = async post => {
  if (!post) {
    return {
      comments: [],
    };
  }

  const comments = await client.getEntries({
    content_type: 'comment',
    'fields.subject.sys.contentType.sys.id': 'blogPost',
    'fields.subject.fields.slug': post.fields.slug,
  });

  return {
    comments: comments.items,
  };
};
