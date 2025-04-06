interface PaginationButtonProps {
  direction: string;
  onClick: () => void;
  disabled?: boolean;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  direction,
  onClick,
  disabled = false,
}) => {
  return (
    <button className="navbutton" onClick={onClick} disabled={disabled}>
      {direction}
    </button>
  );
};
