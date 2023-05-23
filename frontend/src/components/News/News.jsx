import React, { useContext, useState } from "react";
import { NewsContext } from "../Context/NewsContext";
import NewsCard from "../NewsCard/NewsCard";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";

const News = () => {
  const { news, page, setPage, fetchNews, newsPreferences } =
    useContext(NewsContext);
  const [val, setVal] = useState(0);
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
      <Box display="flex w-full" justifyContent={"center"}>
        <Tabs value={val} onChange={(e, val) => setVal(val)}>
          <Tab
            className="hover:text-blue-800 dark:text-snow dark:hover:text-blue-600 "
            label="All News"
          />
          <Tab
            className="hover:text-blue-800 dark:text-snow dark:hover:text-blue-600 "
            label="My News"
          />
        </Tabs>
      </Box>

      {val === 0 ? (
        <>
          <SearchBox />
          <div className="w-full flex  justify-center">
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16   pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3  justify-center  sm:w-5/6">
              {news &&
                news.map((post, i) => <NewsCard post={post} key={i} i={i} />)}
            </div>{" "}
          </div>
        </>
      ) : (
        <div className="w-full flex  justify-center">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16   pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 sm:w-5/6">
            {" "}
            {newsPreferences &&
              newsPreferences.map((post, i) => (
                <NewsCard post={post} key={i} i={i} />
              ))}{" "}
          </div>
        </div>
      )}

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
