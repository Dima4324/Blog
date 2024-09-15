import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../SpecialPanel/SpecialPanel";
import { useLayoutEffect, useRef, useState } from "react";
import { sanitizeContent } from "./utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePostAsync } from "../../../../store/actions";
import { useServerRequest } from "../../../../hooks";

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
	setImageUrlValue(imageUrl);
	setTitleValue(title);
  }, [imageUrl, title])

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverRequest = useServerRequest();

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(serverRequest, {
        id,
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then(({ id }) => navigate(`/post/${id}`));
  };

  const onImageChange = ({ target }) => setImageUrlValue(target.value);

  const onTitleChange = ({ target }) => setTitleValue(target.value);

  return (
    <div className={className}>
      <h3 className="text">Ссылка на изображение статьи</h3>
      <Input
        value={imageUrlValue}
        onChange={onImageChange}
        placeholder="Ссылка на изображение"
      />
      <h3 className="text">Заголовок статьи</h3>
      <Input
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Заголовок"
      />
      <h3 className="text">Контент статьи</h3>
      <p
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning
        className="post-text"
        data-placeholder="Контент"
      >
        {content}
      </p>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={<Icon id="fa-floppy-o" onClick={onSave} />}
      />
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  & .text {
    margin-bottom: 5px;
  }
  & .post-img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    min-height: 100px;
    font-size: 18px;
    white-space: pre-line;
    border: 1px solid #000;
    padding: 10px;
    margin-top: 0px;
  }

  & .post-text:empty::before {
    content: attr(data-placeholder);
    opacity: 0.5;
  }
`;
