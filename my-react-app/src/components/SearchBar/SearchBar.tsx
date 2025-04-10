import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar = ({ value, onSearchChange }: SearchBarProps) => {
  const handleChange = (value: string) => {
    onSearchChange(value);
  };
  return (
    <>
      <label>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Enter username"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          aria-label="Search bar"
        />
      </label>
    </>
  );
};
