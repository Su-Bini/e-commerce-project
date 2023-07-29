import styles from "./CategoryItem.module.css";

interface CategoryItemProps {
  children: string;
  onClick?: (category: string) => void;
}

export default function CategoryItem({ children, onClick }: CategoryItemProps) {
  const handleItemClick = () => {
    onClick && onClick(children);
  };

  return (
    <div className={styles.flex} onClick={handleItemClick}>
      <img
        src="http://placehold.it/130x130.png/ffffff/000000"
        className={styles.image}
      />
      <div>{children}</div>
    </div>
  );
}
