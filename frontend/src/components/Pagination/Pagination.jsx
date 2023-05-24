import React, { useContext, useEffect } from "react";
import { style } from "../../utils/style.js";
import { NewsContext } from "../Context/NewsContext";

const Pagination = () => {
  const { page, setPage, fetchNews } = useContext(NewsContext);
  const totalPages = 10;
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
    /* fetchNews(); */
  }, [page]);

  return (
    <div className="flex justify-center m-4">
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className={style.buttonStyleClass}
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className={style.buttonStyleClass}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
