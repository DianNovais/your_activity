import React from "react";
import styles from "./Modal.module.css";

type Props = {
    children: React.ReactNode;
};

function Modal({children}: Props) {

    const hideModal = (e:React.MouseEvent): void => {
        const modal = document.querySelector("#modal");
        modal!.classList.add("hide")
    }
  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={hideModal}></div>
      <div className={styles.modal}>
        <p>Modal</p>
        {children}
      </div>
    </div>
  );
}

export default Modal;
