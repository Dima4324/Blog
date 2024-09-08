import { useEffect, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { PAGINATION_LIMIT } from "../../constants";
import { getLastPagerFromLinks } from "./utils";
import { Pagination, PostCard } from "./components";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const serverRequest = useServerRequest();

  useEffect(() => {
    serverRequest("fetchPosts", page, PAGINATION_LIMIT).then(
      ({ res: { posts, links } }) => {
		console.log(posts)
        setPosts(posts);
        setLastPage(getLastPagerFromLinks(links));
      }
    );
  }, [serverRequest, page]);

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
      {lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  & .post-list {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    padding: 20px 40px;
  }
`;
