import styled from "styled-components";
import { Icon } from "../../../../../../components";

const CommentContainer = ({ className, author, content, publishedAt }) => {
  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author-container">
            <Icon id="fa-user-circle-o" size="18px" />
            <p className="author">{author}</p>
          </div>
          <div className="published-at-container">
            <Icon id="fa-calendar-o" size="18px"/>
            <p className="published-at">{publishedAt}</p>
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      <Icon id="fa-trash-o" className="delete-comment" size="18px" margin="5px 0 0 0"/>
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  width: 100%;
  gap: 10px;

  & .comment {
  display: flex;
  flex-direction: column;
  gap: 10px;
	width: 550px;
	padding: 5px 10px;
	border: 1px solid #000;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;
  }

  & .author-container {
    display: flex;
	gap: 10px;
  }

  & .published-at-container {
    display: flex;
	gap: 10px;
  }

  & .author, .published-at {
	margin: 0;
  }
`;
