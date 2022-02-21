import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { datetime } from '@/util/datetime';

const classes = {
  wrapper: 'mt-16 blog-content',
  title: 'mt-16 text-4xl text-gray-900 font-bold',
  date: 'text-gray-600 font-light mt-2',
  featuredImageWrapper: 'mt-4 blog-featured-image overflow-hidden',
  featuredImage: 'rounded-2xl',
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

export default function PostBody({ title, date, content, featuredImage }) {
  return (
    content && (
      <div>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.date}>
          Posted on {datetime(date).format('MMMM D, YYYY')}
        </p>
        {featuredImage && (
          <div className={classes.featuredImageWrapper}>
            <Image
              className={classes.featuredImage}
              src={`https:${featuredImage.fields.file.url}`}
              alt={featuredImage.fields.description}
              width={featuredImage.fields.file.details.image.width}
              height={featuredImage.fields.file.details.image.height}
            />
          </div>
        )}
        <div className={classes.wrapper}>
          {documentToReactComponents(content, options)}
        </div>
      </div>
    )
  );
}
