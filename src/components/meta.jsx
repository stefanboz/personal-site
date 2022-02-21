import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="Front-end web developer" />
      <meta name="author" content="Stefan Bozic" />
      <title>Stefan Bozic | Front-end Web Developer</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon_io2/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon_io2/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon_io2/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon_io2/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon_io2/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon_io2/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />
      <meta property="og:image" content={`/profile-stefan.jpg`} />
    </Head>
  );
}
