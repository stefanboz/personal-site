const classes = {
  wrapper: 'mb-6',
  name: 'font-semibold text-gray-900 pb-1',
  description: 'text-md text-gray-600 font-light',
  link: 'break-words',
};

const SingleLink = ({ url, description }) => {
  return (
    <div className={classes.wrapper}>
      <h3 className={`${classes.name} ${'hover:underline hover:text-black'}`}>
        <a
          className={classes.link}
          href={url}
          target="__blank"
          rel="nofollow noopener"
        >
          {url}
        </a>
      </h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default SingleLink;
