import styled from "styled-components";
import { H2, Icon } from "../../../../components";
import { SpecialPanel } from "../SpecialPanel/SpecialPanel";
import { useNavigate } from "react-router-dom";

const PostContentContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <img src={imageUrl} alt={title} className="post-img" />
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={
          <Icon
            id="fa-pencil-square-o"
            onClick={() => navigate(`/post/${id}/edit`)}
          />
        }
      />
      <p className="post-text">{content}</p>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  & .post-img {
    width: 280px;
    height: 150px;
    float: left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;
