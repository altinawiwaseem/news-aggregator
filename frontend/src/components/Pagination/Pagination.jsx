import React from "react";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onNextPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPrevPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer ml-4"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
