import { useState, useEffect, useRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import Loader from '@/components/loader';

const CommentForm = ({ postId }) => {
  const [authorName, setAuthorName] = useState(null);
  const [authorEmail, setAuthorEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [captcha, setCaptcha] = useState(null);
  const [processingComment, setProcessingComment] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [messageContent, setMessageContent] = useState(null);

  const recaptchaRef = useRef(null);
  const commentForm = useRef(null);

  const fieldChangeHandler = event => {
    switch (event.target.name) {
      case 'commenter-name':
        setAuthorName(event.target.value);
        break;
      case 'commenter-email':
        setAuthorEmail(event.target.value);
        break;
      case 'commenter-message':
        setMessage(event.target.value);
        break;
    }
  };

  const onChange = token => {
    setCaptcha(token);
  };

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      const recaptchaValue = recaptchaRef.current.getValue();

      if (recaptchaValue) {
        setProcessingComment(true);

        const fields = {
          author_name: authorName,
          author_email: authorEmail,
          content: message,
          post_id: postId, // getting this from the main component
          captcha: captcha,
        };

        let commentLocalApi = await fetch('/api/comments', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(fields),
        });

        if (commentLocalApi.status === 200) {
          setMessageSuccess(true);
          setMessageContent('Your comment is waiting approval.');
        }
      }
    },
    [authorName, authorEmail, message, captcha]
  );

  const resetData = () => {
    setCaptcha(null);
    setProcessingComment();

    setTimeout(() => {
      setMessageSuccess(false);
    }, 5000);
  };

  useEffect(() => {
    if (messageSuccess) {
      resetData();
      commentForm.current.reset();
    }
  }, [messageSuccess]);

  return (
    <div className="comment-form max-w-xl">
      <h2 className="mb-8 text-lg font-semibold">Leave a Comment</h2>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit}
        autoComplete="new-password"
        method="POST"
        ref={commentForm}
      >
        <div className="mb-6">
          <label htmlFor="commenter-name" className="block mb-1">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            onChange={fieldChangeHandler}
            type="text"
            name="commenter-name"
            className="border-gray-400 border-solid border focus:outline-none focus:border-teal-300 focus:shadow-md rounded block w-full p-2"
            autoComplete="new-password"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="commenter-email" className="block mb-1">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            onChange={fieldChangeHandler}
            type="email"
            name="commenter-email"
            className="border-gray-400 border-solid border focus:outline-none focus:border-teal-300 focus:shadow-md rounded block w-full p-2"
            autoComplete="new-password"
          />
        </div>
        <label className="block mb-1">Your Comment</label>
        <textarea
          onChange={fieldChangeHandler}
          name="commenter-message"
          className="border-gray-400 border-solid border focus:outline-none focus:border-teal-300 focus:shadow-md rounded resize-none mb-4"
          rows="6"
        ></textarea>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
          onChange={onChange}
        />

        <button
          type="submit"
          className="btn-submit-comment bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 max-w-xs disabled:opacity-50 disabled:pointer-events-none "
          disabled={
            !authorName ||
            !authorEmail ||
            !message ||
            !captcha ||
            processingComment
              ? true
              : false
          }
        >
          {processingComment ? <Loader /> : 'Post Comment'}
        </button>
        {messageSuccess && (
          <p className="mt-4 text-green-400">{messageContent}</p>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
