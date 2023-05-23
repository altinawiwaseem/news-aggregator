import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { style } from "../../utili/style.js";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  const { buttonStyleClass } = useContext(UserContext);

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
    <div className="flex justify-center m-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={style.buttonStyleClass}
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={style.buttonStyleClass}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
