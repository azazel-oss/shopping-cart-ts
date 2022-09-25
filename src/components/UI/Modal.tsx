import styles from "./Modal.module.css";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

type OverlayProps = {
  children?: ReactNode;
};

type ModalProps = {
  children?: ReactNode;
};

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

const ModalOverlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalEl = document.getElementById("overlays") as HTMLElement;

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalEl)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalEl)}
    </React.Fragment>
  );
};

export default Modal;
