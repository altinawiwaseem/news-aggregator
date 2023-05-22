import React, { useContext, useRef, useState } from "react";
import { NewsContext } from "../Context/NewsContext";
import countriesList from "countries-list";
import { languages } from "../../utili/languges";
import NewsCard from "../NewsCard/NewsCard";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

const News = () => {
  const { news, page, setPage, fetchNews } = useContext(NewsContext);

  const handleNextPage = (page) => {
    setPage(page);
    fetchNews();
  };

  const handlePrevPage = (page) => {
    setPage(page);
    fetchNews();
  };
  return (
    <>
      <SearchBox />
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16   pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {/* Display news articles */}

        {news && news.map((post, i) => <NewsCard post={post} key={i} i={i} />)}
      </div>
      <Pagination
        currentPage={page}
        totalPages={10}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </>
  );
};

export default News;
