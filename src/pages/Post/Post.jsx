import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../hooks";
import { Comments, PostContent } from "./components";
import { loadPostAsync } from "../../store/actions";
import { selectPost } from "../../store/selectors";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const serverRequest = useServerRequest();
  const post = useSelector(selectPost);

  useEffect(() => {
    dispatch(loadPostAsync(serverRequest, params.id));
  }, [dispatch, serverRequest, params.id]);

  return (
    <div className={className}>
      <PostContent post={post} />
      <Comments comments={post.comments} postId={post.id}/>
    </div>
  );
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
`;
