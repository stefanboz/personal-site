import { managementClient } from '@/util/api';

export default async (req, res) => {
  let googleUrl =
    'https://www.google.com/recaptcha/api/siteverify?secret=' +
    process.env.NEXT_PUBLIC_RECAPTCHA_SECRETKEY +
    '&response=' +
    req.body.captcha;

  let captchaResponse = await fetch(googleUrl);

  if (captchaResponse.status === 200 && captchaResponse.statusText === 'OK') {
    const comment = req.body;

    const space = await managementClient.getSpace(
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    );

    const environment = await space.getEnvironment('master');

    const post = await environment.getEntry(comment.post_id);

    try {
      await environment.createEntry('comment', {
        fields: {
          body: { 'en-US': comment.content },
          author: { 'en-US': comment.author_name },
          subject: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: post.sys.id,
              },
            },
          },
          email: { 'en-US': comment.author_email },
          parentComment: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: comment.parentCommentId,
              },
            },
          },
        },
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: true,
          message: 'record created, awaiting approval',
        })
      );
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({ success: false, message: 'Error posting comment' })
      );
    }
  } else {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Captcha failed' }));
  }
};
