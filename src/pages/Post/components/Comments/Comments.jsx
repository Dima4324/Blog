import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Comment } from "./components/Comment/Comment";
import { useServerRequest } from "../../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../store/selectors";
import { addCommentAsync } from "../../../../store/actions";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");

  const userId = useSelector(selectUserId)

  const dispatch = useDispatch();

  const serverRequest = useServerRequest();

  const onNewCommentAdd = (userId, postId, content) => {
	dispatch(addCommentAsync(serverRequest, userId, postId, content));
  }
  return (
    <div className={className}>
      <div className="new-comment">
        <textarea
		name="comment"
          value={newComment}
          placeholder="комментарий"
          onChange={({ target }) => setNewComment(target.value)}
        ></textarea>
        <Icon id="fa-paper-plane-o" onClick={() => onNewCommentAdd(userId, postId, newComment)}/>
      </div>
      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
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
  display: flex;
  width: 580px;
  margin: 0 auto;

  & .new-comment {
	display: flex;
	align-items: flex-start;
	width: 100%;
	margin: 20px 0 0;
  }

  & .new-comment textarea {
	resize: none;
	width: 100%;
	height: 120px;
	padding: 5px;
	font-size: 18px;
	font-weight: 500;
  }
`;
