import styles from "./Pagination.module.css";
import cx from "clsx";
interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onClickPageButton: (pageNumber: number) => void;
}

export default function Pagination({
  currentPage,
  maxPage,
  onClickPageButton,
}: PaginationProps) {
  return (
    <div className={styles.container}>
      <button
        className={cx(styles.button, styles.blueButton)}
        disabled={currentPage === 1}
        onClick={() => onClickPageButton(currentPage - 1)}
      >
        {"< 이전"}
      </button>
      {new Array(maxPage).fill(null).map((_, i) => (
        <PageButton
          key={i}
          number={i + 1}
          onClick={onClickPageButton}
          selected={i + 1 === currentPage}
        />
      ))}
      <button
        className={cx(styles.button, styles.blueButton)}
        disabled={currentPage === maxPage}
        onClick={() => onClickPageButton(currentPage + 1)}
      >
        {"다음 >"}
      </button>
    </div>
  );
}

interface PageButtonProps {
  onClick: (pageNumber: number) => void;
  number: number;
  selected: boolean;
}

function PageButton({ onClick, number, selected }: PageButtonProps) {
  return (
    <button
      className={cx(styles.button, { [styles.selected]: selected })}
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );
}
