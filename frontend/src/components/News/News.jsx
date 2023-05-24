import React, { useContext, useState } from "react";
import { NewsContext } from "../Context/NewsContext";
import NewsCard from "../NewsCard/NewsCard";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { Box, Tab, Tabs } from "@mui/material";
import { style } from "../../utils/style.js";

const News = () => {
  const { news, page, setPage, fetchNews, newsPreferences } =
    useContext(NewsContext);

  const [val, setVal] = useState(0);

  return (
    <>
      <Box display="flex w-full " justifyContent={"center"}>
        <Tabs value={val} onChange={(e, val) => setVal(val)}>
          <Tab
            className="hover:text-blue-800 dark:text-snow dark:hover:text-blue-600"
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
            <div className={style.newDivStyle}>
              {news &&
                news.map((post, i) => <NewsCard post={post} key={i} i={i} />)}
            </div>{" "}
          </div>
        </>
      ) : (
        <div className="w-full flex  justify-center">
          <div className={style.newDivStyle}>
            {" "}
            {newsPreferences &&
              newsPreferences.map((post, i) => (
                <NewsCard post={post} key={i} i={i} />
              ))}{" "}
          </div>
        </div>
      )}

      <Pagination />
    </>
  );
};

export default News;
