import Image from 'next/image';

import { createMd5Hash } from '@/util/helpers';
import { datetime } from '@/util/datetime';

const Comments = ({ comments }) => {
  return (
    <>
      <h2 className="font-bold text-2xl mb-6">
        Discussion ({comments.length})
      </h2>

      {comments.map(comment => {
        const emailLowercase = comment.fields.email.toLowerCase();

        const hashedEmail = createMd5Hash(emailLowercase);

        return (
          <div key={comment.sys.id} className="comment bg-gray-100 p-3 mb-6">
            <div className="comment--header flex mb-4">
              <div className="comment-author-image-wrapper mr-3">
                <Image
                  className="comment-avatar rounded-full"
                  src={`https://www.gravatar.com/avatar/${hashedEmail}`}
                  width={40}
                  height={40}
                />
              </div>
              <div className="comment-metadata">
                <h4 className="comment-author-name font-bold">
                  {comment.fields.author}
                </h4>
                <p className="comment-date text-xs text-gray-600">
                  {datetime(comment.sys.createdAt).format('MMMM D, YYYY')}
                </p>
              </div>
            </div>
            <div className="comment-content" key={comment.id}>
              {comment.fields.body}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
