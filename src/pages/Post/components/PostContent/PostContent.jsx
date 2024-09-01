import styled from "styled-components";
import { H2, Icon } from "../../../../components";

const PostContentContainer = ({
  className,
  post: { title, imageUrl, content, publishedAt },
}) => {
  return (
    <div className={className}>
      <img src={imageUrl} alt={title} className="post-img" />
      <H2>{title}</H2>
      <div className="special-panel">
        <div className="published-at">
          <Icon id="fa-calendar-o"></Icon>
          <p>{publishedAt}</p>
        </div>
        <div className="buttons">
          <Icon id="fa-pencil-square-o"></Icon>
          <Icon id="fa-trash-o"></Icon>
        </div>
      </div>
      <p className="post-text">{content}</p>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  & .post-img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .special-panel {
    display: flex;
    justify-content: space-between;
	margin: 20px 0;
  }

  & .published-at {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
  }

  & .published-at > p {
    margin: 0;
  }

  & .published-at > button, .buttons > button {
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    gap: 10px;
  }

  & .post-text {
	font-size: 18px;
  }
`;
