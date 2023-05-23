import { useState } from "react";

const NewsCard = ({ post, i }) => {
  let {
    thumbnail = "",
    publishedAt = "",
    url = "",
    sourceName = "",
    title = "",
    description = "",
    author = "",
  } = {};

  if (post?.apiSource === "newsApi") {
    ({
      // Extract the desired properties from the news api object
      urlToImage: thumbnail = "",
      publishedAt = "",
      url = "",
      description = "",
      source: { name: sourceName = "" } = {},
      title = "",
      author = "",
    } = post);
  } else if (post?.apiSource === "guardianApi") {
    ({
      // Extract the desired properties from the guardian object
      fields: { thumbnail = "" } = {},
      webPublicationDate: publishedAt = "",
      webUrl: url = "",
      pillarName: sourceName = "",
      webTitle: title = "",
      fields: { trailText: description = "" } = {},
      tags: [{ webTitle: author = "" } = {}] = [],
    } = post);
  } else if (post?.apiSource === "newYorkApi") {
    ({
      // Extract the desired properties from the new york object
      multimedia: [{ url: thumbnail = "" } = {}] = [],
      pub_date: publishedAt = "",
      web_url: url = "",
      source: sourceName = "",
      headline: { main: title = "" } = {},
      lead_paragraph: description = "",
      byline: { original: author = "" } = {},
    } = post);
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      key={i}
      className="h-full w-full transform transition-transform duration-300 hover:scale-105 dark:shadow-6xl "
    >
      <a
        target="_blank"
        rel="noreferrer"
        href={post?.url}
        className="flex h-full w-full max-w-xl flex-col items-start justify-between rounded-md overflow-hidden shadow-lg dark:text-white cursor-pointer"
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt="news-image"
            className={`h-64 w-full object-fill  group-hover:opacity-75 ${
              imageLoaded ? "" : "hidden"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Render other content */}
        <div className="flex items-center gap-x-4 text-xs p-3">
          <time dateTime={publishedAt} className="text-gray-500">
            {publishedAt}
          </time>
          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {sourceName}
          </span>
        </div>
        <div className="group relative p-3">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-white">
            <span className="absolute inset-0" />
            {title}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-white">
            {description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4 p-3">
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href={post?.author} className="hover:underline">
                <span className="absolute inset-0" />
                {author}
              </a>
            </p>
          </div>
        </div>
      </a>
      {}
    </div>
  );
};

export default NewsCard;
