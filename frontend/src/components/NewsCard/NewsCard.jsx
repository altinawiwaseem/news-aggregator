import React, { useContext } from "react";
import { NewsContext } from "../Context/NewsContext";

const NewsCard = ({ post }) => {
  const { news } = useContext(NewsContext);
  return (
    <div className=" dark:bg-bg-xiketic bg-">
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16   pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article
          key={post.id}
          className="flex max-w-xl flex-col items-start justify-between rounded-md overflow-hidden shadow-lg dark:text-white"
        >
          <img
            src={post?.urlToImage}
            alt="news-image"
            className="h-64 w-full object-cover object-center group-hover:opacity-75"
          />
          <div className="flex items-center gap-x-4 text-xs p-3">
            <time dateTime={post?.publishedAt} className="text-gray-500">
              {post?.publishedAt}
            </time>
            <a
              href={post?.url}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {post?.source?.name}
            </a>
          </div>
          <div className="group relative p-3">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-white">
              <span className="absolute inset-0" />
              {post.title}
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-white">
              {post.description}
            </p>
          </div>
          <div className="relative mt-8 flex items-center gap-x-4 p-3">
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <a href={post?.author} className="hover:underline">
                  <span className="absolute inset-0" />
                  {post.author}
                </a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsCard;
