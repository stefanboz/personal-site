import Link from 'next/link';
import Image from 'next/image';

import { useHeaderData } from '@/hooks/useHeaderData';

const classes = {
  wrapper: 'block md:mb-6 md:flex STEFAN',
  imageWrapper: 'w-full max-w-150 max-h-150',
  imageLinkWrapper: 'block',
  image:
    'block profile-image rounded-full transform transition-all duration-150 hover:scale-105',
  contentWrapper: 'flex-none pt-6 md:pt-1 md:flex-1 md:pl-20',
  name: 'text-5xl text-gray-900 font-bold leading-tight hover:text-black',
  description: 'text-gray-600',
  list: 'mt-6 uppercase tracking-wider',
  item: 'inline list-none pr-4',
  link:
    'inline-block py-2 font-semibold text-xs text-gray-600 hover:text-black',
};

const LayoutHeader = () => {
  const { data: headerData } = useHeaderData();

  return headerData ? (
    <div className={classes.wrapper}>
      <div className={classes.imageWrapper}>
        <Link href="/">
          <a id="avatarWrapper" className={classes.imageLinkWrapper}>
            <Image
              className={classes.image}
              alt={headerData.siteHeader[0].fieldsNameLastName}
              src={`https:${headerData.avatar[0].fields.avatar.fields.file.url}`}
              layout="fixed"
              width={150}
              height={150}
            />
          </a>
        </Link>
      </div>
      <div className={classes.contentWrapper}>
        <h1 className={classes.name}>
          <Link href="/">
            <a>{headerData.siteHeader[0].fields.nameLastName}</a>
          </Link>
        </h1>
        <p className={classes.description}>
          {headerData.siteHeader[0].fields.shortDescription}
        </p>
        <ul className={classes.list}>
          <li className={classes.item}>
            <a
              className={classes.link}
              href={headerData.personalLinks[0].fields.link[0].value}
            >
              {headerData.personalLinks[0].fields.link[0].key}
            </a>
          </li>

          <li className={classes.item}>
            <a
              className={classes.link}
              href={headerData.personalLinks[0].fields.link[1].value}
            >
              {headerData.personalLinks[0].fields.link[1].key}
            </a>
          </li>

          <li className={classes.item}>
            <Link href="/blog">
              <a className={classes.link}>Blog</a>
            </Link>
          </li>

          <li className={classes.item}>
            <Link href="/links">
              <a className={classes.link}>Links</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    'Loading...'
  );
};

export default LayoutHeader;
