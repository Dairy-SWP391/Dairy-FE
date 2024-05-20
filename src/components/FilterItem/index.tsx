// styling
import styles from "./styles.module.scss";

interface FilterItemProps {
  text: string;
  qty?: number;
  value: string;
  active: string;
  onClick: (value: string) => void;
}

const FilterItem = ({
  text,
  qty = 0,
  value,
  active,
  onClick,
}: FilterItemProps) => {
  return (
    <button
      className={`${styles.button} ${value === active ? styles.active : ""}`}
      onClick={() => onClick(value)}
    >
      <span className={`${styles.text} subheading-2`}>{text}</span>
      <span className="text-sm text-highlight-inverse">({qty})</span>
    </button>
  );
};

export default FilterItem;
