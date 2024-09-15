import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { PostCard } from "./components";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);

  const serverRequest = useServerRequest();

  useEffect(() => {
    serverRequest("fetchPosts").then((posts) => {
      setPosts(posts.res);
    });
  }, [serverRequest]);

  return (
    <div className={className}>
      <div className="post-list">
        {posts.map(({ id, imageUrl, title, publishedAt, commentsCount }) => (
          <PostCard
            key={id}
            id={id}
            imageUrl={imageUrl}
            title={title}
            publishedAt={publishedAt}
            commentsCount={commentsCount}
          />
        ))}
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
width: 100%;
margin: 0 auto;

  & .post-list {
    display: flex;
	flex-wrap: wrap;
	gap: 40px;
	padding: 20px 40px;
  }
`;
