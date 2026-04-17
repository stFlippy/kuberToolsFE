import styles from "./Modal.module.css"

type Props = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ title, children, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
