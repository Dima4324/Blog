import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { Link } from "react-router-dom";

const PostCardContainer = ({
  className,
  id,
  imageUrl,
  title,
  publishedAt,
  commentsCount,
}) => {
  return (
    <div className={className}>
      <Link to={`/post/${id}`} className="post-card-link">
        <img src={imageUrl} alt={title} />
        <div className="post-card-footer">
          <h4>{title}</h4>
          <div className="post-card-info">
            <div className="published-at">
              <Icon id="fa-calendar-o" inactive="true" size="18px" />
              <p>{publishedAt}</p>
            </div>
            <div className="commnts-count">
              <Icon id="fa-comment-o" inactive="true" size="18px" />
              <p>{commentsCount}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PostCard = styled(PostCardContainer)`
  width: 280px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;

  & .post-card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & h4,
  p {
    margin: 0;
  }

  & .post-card-footer {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid #000;
    padding: 10px;
  }

  & .post-card-info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  & .published-at,
  .commnts-count {
    display: flex;
    gap: 5px;
  }

  & img {
    display: block;
    width: 100%;
    height: 148px;
  }
`;

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};
