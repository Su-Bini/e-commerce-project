import styles from "./Badge.module.css";

interface BadgeProps {
  style: {
    fontSize: string;
    color: string;
    backgroundColor: string;
    width: string;
    borderRadius?: string;
  };
  children: string | number | React.ReactNode;
}
export default function Badge({ style, children }: BadgeProps) {
  return (
    <div style={style} className={styles.badge}>
      {children}
    </div>
  );
}
