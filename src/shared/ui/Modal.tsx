type Props = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ title, children, onClose }: Props) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2>{title}</h2>
          <button style={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.7)",
    zIndex: 9999,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "16px",
    borderBottom: "1px solid #1f2937",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  close: {
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  body: {
    flex: 1,
    overflow: "auto",
    padding: "16px",
  },
};