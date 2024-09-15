import styled from "styled-components";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../hooks";
import { Comments, PostContent, PostForm } from "./components";
import { loadPostAsync, RESET_POST_DATA } from "../../store/actions";
import { selectPost } from "../../store/selectors";
import { Error, PrivateContent } from "../../components";
import { ROLE } from "../../constants";

const PostContainer = ({ className }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const isCreating = !!useMatch("/post");
  const isEditing = !!useMatch("/post/:id/edit");
  const serverRequest = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }

    dispatch(loadPostAsync(serverRequest, params.id)).then((postData) => {
      setError(postData.error);
      setIsLoading(false);
    });
  }, [dispatch, serverRequest, params.id, isCreating]);

  if (isLoading) {
    return null;
  }

  const SpeificPostPage =
    isCreating || isEditing ? (
      <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <PostForm post={post} />
        </div>
      </PrivateContent>
    ) : (
      <div className={className}>
        <PostContent post={post} />
        <Comments comments={post.comments} postId={post.id} />
      </div>
    );

  return error ? <Error error={error} /> : SpeificPostPage;
};

export const Post = styled(PostContainer)`
  padding: 40px 80px;
`;
