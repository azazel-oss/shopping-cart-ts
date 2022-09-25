import styles from "./Modal.module.css";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

type OverlayProps = {
  children?: ReactNode;
};

type BackdropProps = {
  onClick: React.MouseEventHandler;
};

type ModalProps = {
  onBackdropClick: React.MouseEventHandler;
  children?: ReactNode;
};

const Backdrop = ({ onClick }: BackdropProps) => {
  return <div onClick={onClick} className={styles.backdrop} />;
};

const ModalOverlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalEl = document.getElementById("overlays") as HTMLElement;

const Modal: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={onBackdropClick} />, portalEl)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalEl)}
    </React.Fragment>
  );
};

export default Modal;
