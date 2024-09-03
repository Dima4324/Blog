import styled from "styled-components";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import {
  selectModalIsOpen,
  selectModalOnCancel,
  selectModalOnComfirm,
  selectModalText,
} from "../../store/selectors";

const ModalContainer = ({ className }) => {
  const isOpen = useSelector(selectModalIsOpen);
  const text = useSelector(selectModalText);
  const onConfirm = useSelector(selectModalOnComfirm);
  const onCancel = useSelector(selectModalOnCancel);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <div className="overlay">
        <div className="box">
          <h3>{text}</h3>
          <div className="buttons">
            <Button width="120px" onClick={onConfirm}>
              Да
            </Button>
            <Button width="120px" onClick={onCancel}>
              Нет
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  & h3 {
    margin-top: 0;
  }

  & .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
  }

  & .box {
    display: flex;
    flex-direction: column;
    align-items: center;
	position: relative;
	top: 50%;
	transform: translate(0px, -50%);
    width: 400px;
    margin: 0 auto;
	background-color: #fff;
	border: 2px solid #000;
	padding: 20px;
  }


  & .buttons {
	display: flex;
	gap: 15px;
  }
`;
