import React from 'react';

interface PaginationProps {
  numOfPages: number;
  currentPage: number;
  handleNavButtonClick: (action: string) => void;
  handlePaginationButtonClick: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  numOfPages,
  currentPage,
  handleNavButtonClick,
  handlePaginationButtonClick,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button onClick={() => handleNavButtonClick('First')}>First</button>
      <button onClick={() => handleNavButtonClick('Prev')} disabled={currentPage === 1}>
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePaginationButtonClick(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button onClick={() => handleNavButtonClick('Next')} disabled={currentPage === numOfPages}>
        Next
      </button>
      <button onClick={() => handleNavButtonClick('Last')}>Last</button>
    </div>
  );
};

export default Pagination;
