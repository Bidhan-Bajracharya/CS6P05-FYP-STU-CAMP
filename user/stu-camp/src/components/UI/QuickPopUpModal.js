import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import "../../styles/modal.css";

const Backdrop = ({ onClose }) => {
  return <div className="backdrop-quick"></div>;
};

const ModalOverlay = (props) => {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className={`modal-quick-popup dark:bg-cb`}>
        <div className="dark:bg-cb">{props.children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("quick-overlay");

const QuickPopUpModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default QuickPopUpModal;
