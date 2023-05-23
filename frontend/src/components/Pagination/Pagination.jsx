import React, { useContext, useEffect } from "react";
import { style } from "../../utili/style.js";
import { NewsContext } from "../Context/NewsContext";

const Pagination = ({ currentPage, totalPages }) => {
  const { page, setPage, fetchNews } = useContext(NewsContext);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchNews();
  }, [currentPage]);

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
