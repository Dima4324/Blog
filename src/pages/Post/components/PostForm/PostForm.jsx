import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../SpecialPanel/SpecialPanel";
import { useRef } from "react";
import { sanitizeContent } from "./utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePostAsync } from "../../../../store/actions";
import { useServerRequest } from "../../../../hooks";

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const serverRequest = useServerRequest();

  const onSave = () => {
    const newImageUrl = sanitizeContent(imageRef.current.value);
    const newtitle = sanitizeContent(titleRef.current.value);
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(serverRequest, {
		id,
        imageUrl: newImageUrl,
        title: newtitle,
        content: newContent,
      })
    ).then(() => navigate(`/post/${id}`));
  };

  return (
    <div className={className}>
      <Input
        ref={imageRef}
        defaultValue={imageUrl}
        placeholder="Ссылка на изображение"
      />
      <Input ref={titleRef} defaultValue={title} placeholder="Заголовок" />
      <SpecialPanel
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={<Icon id="fa-floppy-o" onClick={onSave} />}
      />
      <p
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning
        className="post-text"
      >
        {content}
      </p>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  & .post-img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;
