import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../hooks";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce, getLastPagerFromLinks } from "./utils";
import { Pagination, PostCard, Search } from "./components";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const serverRequest = useServerRequest();

  useEffect(() => {
    serverRequest("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { posts, links } }) => {
        setPosts(posts);
        setLastPage(getLastPagerFromLinks(links));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverRequest, page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <div className={className}>
      <div className="posts-and-search">
        <Search searchPhrase={searchPhrase} onChange={onSearch} />
        {posts.length > 0 ? (
          <div className="post-list">
            {posts.map(
              ({ id, imageUrl, title, publishedAt, commentsCount }) => (
                <PostCard
                  key={id}
                  id={id}
                  imageUrl={imageUrl}
                  title={title}
                  publishedAt={publishedAt}
                  commentsCount={commentsCount}
                />
              )
            )}
          </div>
        ) : (
          <div className="no-posts-found">Статьи не найдены</div>
        )}
      </div>
      {posts.length > 0 && lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;


  & .post-list {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    padding: 20px 40px 80px;
  }

  & .no-posts-found {
    margin-top: 30px;
    text-align: center;
  }
`;
