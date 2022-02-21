import Link from 'next/link';

const classes = {
  wrapper: 'mb-6',
  name: 'font-semibold text-gray-900 pb-1',
  description: 'text-md text-gray-600 font-light',
};

const SummaryItem = ({ name, description, link = null, internal = false }) => {
  let linkContent;

  if (internal) {
    linkContent = (
      <Link href={`/${link}`}>
        <a>{name}</a>
      </Link>
    );
  } else {
    linkContent = <a href={link}>{name}</a>;
  }

  return (
    <div className={classes.wrapper}>
      <h3
        className={`${classes.name} ${
          link ? 'hover:underline hover:text-black' : ''
        }`}
      >
        {link ? linkContent : name}
      </h3>
      <div
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: `${description}` }}
      />
    </div>
  );
};

export default SummaryItem;
