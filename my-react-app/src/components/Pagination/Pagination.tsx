import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
  totalResults?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
  totalResults,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!totalPages || currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className="page-section page-section-row">
        <p>
          <strong>Results:</strong> {totalResults}
        </p>
        <p>
          <strong>Pages:</strong> {totalPages}
        </p>
      </div>
      <div className="page-section page-section-row">
        <PaginationButton
          direction="Previous"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        />
        <div>
          <strong>{currentPage}</strong>
        </div>
        <PaginationButton
          direction="Next"
          onClick={handleNext}
          disabled={!!totalPages && currentPage >= totalPages}
        />
      </div>
    </>
  );
};
