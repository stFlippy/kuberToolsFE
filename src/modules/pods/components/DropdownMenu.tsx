import { useState, useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  menu: React.ReactNode;
};

function DropdownMenu({ children, menu }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.background = "#374151")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.background = "transparent")
    }>
      
      <div onClick={() => setOpen(!open)}>{children}</div>

      {open && (
        <div style={styles.menu}>
          {menu}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

const styles = {
  menu: {
    position: "absolute" as const,
    top: "100%",
    right: 0,
    background: "#1f2937",
    borderRadius: "8px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
    padding: "6px",
    zIndex: 10,
    minWidth: "120px",
  },
  item: {
    padding: "8px 10px",
    cursor: "pointer",
    borderRadius: "6px",
  },
};