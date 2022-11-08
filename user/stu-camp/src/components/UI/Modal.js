import "../../styles/modal.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideInputBox } from "../../features/homeSlice";

const Backdrop = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="backdrop"
      onClick={() => {
        dispatch(hideInputBox());
      }}
    ></div>
  );
};

const ModalOverlay = (props) => {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className={`modal dark:bg-cb`}>
        <div className="content dark:bg-cb">{props.children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
