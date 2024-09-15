import styled from "styled-components";
import { useEffect, useLayoutEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../hooks";
import { Comments, PostContent, PostForm } from "./components";
import { loadPostAsync, RESET_POST_DATA } from "../../store/actions";
import { selectPost } from "../../store/selectors";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isCreating = useMatch("/post");
  const isEditing = useMatch("/post/:id/edit");
  const serverRequest = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      return;
    }

    dispatch(loadPostAsync(serverRequest, params.id));
  }, [dispatch, serverRequest, params.id, isCreating]);

  return (
    <div className={className}>
      {isCreating || isEditing ? (
        <PostForm post={post} />
      ) : (
        <>
          <PostContent post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
};

export const Post = styled(PostContainer)`
  padding: 40px 80px;
`;
