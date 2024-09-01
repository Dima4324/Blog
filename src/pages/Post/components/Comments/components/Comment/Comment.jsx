import styled from "styled-components";
import { Icon } from "../../../../../../components";

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
  return (
    <div className={className}>
      <div className="information-panel">
        <div className="author-container">
          <Icon id="fa-user-circle-o"/>
          <p className="author">{author}</p>
        </div>
        <div className="published-at-container">
          <Icon id="fa-calendar-o" />
          <p className="published-at">{publishedAt}</p>
        </div>
      </div>
      <div className="comment-text">{content}</div>
    </div>
  );
};

export const Comment = styled(CommentContainer)`
	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author-container {
		display: flex;
	}

	& .published-at-container {
		display: flex;
	}
`;
