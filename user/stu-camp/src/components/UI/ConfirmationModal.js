import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import "../../styles/modal.css";

const Backdrop = ({ onClose }) => {
  return (
    <div
      className="backdrop"
      onClick={() => {
        onClose();
      }}
    ></div>
  );
};

const ModalOverlay = (props) => {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className={`modal-confirmation dark:bg-cb`}>
        <div className="dark:bg-cb">{props.children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const ConfirmationModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default ConfirmationModal;
