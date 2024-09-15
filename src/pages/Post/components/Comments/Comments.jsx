import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Comment } from "./components/Comment/Comment";
import { useServerRequest } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectUserRole } from "../../../../store/selectors";
import { addCommentAsync } from "../../../../store/actions";
import { PROP_TYPE, ROLE } from "../../../../constants";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");

  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const isGuest = userRole === ROLE.GUEST;

  const dispatch = useDispatch();

  const serverRequest = useServerRequest();

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(serverRequest, userId, postId, content));
    setNewComment("");
  };

  return (
    <div className={className}>
      {!isGuest && (
        <div className="new-comment">
          <textarea
            name="comment"
            value={newComment}
            placeholder="комментарий"
            onChange={({ target }) => setNewComment(target.value)}
          ></textarea>
          <Icon
            id="fa-paper-plane-o"
            size="18px"
            onClick={() => onNewCommentAdd(userId, postId, newComment)}
          />
        </div>
      )}
      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            postId={postId}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  width: 580px;
  margin: 0 auto;

  & .new-comment {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 50px 0 0;
  }

  & .new-comment textarea {
    width: 550px;
    height: 120px;
    font-size: 18px;
    resize: none;
  }

  & .comments {
    display: flex;
    flex-direction: column;
  }
`;

Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
  postId: PropTypes.string.isRequired,
};
