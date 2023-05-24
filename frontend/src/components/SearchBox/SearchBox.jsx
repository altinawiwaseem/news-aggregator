import React, { useContext, useEffect, useRef, useState } from "react";
import { NewsContext } from "../Context/NewsContext";
import countriesList from "countries-list";
import { languages } from "../../utils/languges";
import { style } from "../../utils/style.js";

function SearchBox() {
  const {
    updateFormData,
    fetchNews,
    formData,
    page,
    paramsArray,
    preferencesArray,
  } = useContext(NewsContext);

  const formRefs = {
    category: useRef(""),
    searchIn: useRef(""),
    country: useRef(""),
    tag: useRef(""),
    q: useRef(""),
    from: useRef(""),
    to: useRef(""),
    language: useRef(""),
  };

  const countries = Object.entries(countriesList.countries).map(
    ([code, country]) => ({
      code,
      name: country.name,
    })
  );

  const defaultLanguage = localStorage.getItem("formData")
    ? getLanguageName(JSON.parse(localStorage.getItem("formData")).language)
    : getLanguageName("en");

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  function getLanguageName(code) {
    const language = languages.find((lang) => lang.code === code);
    return language ? language.name : "";
  }
  function saveFormDataToLocalStorage() {
    const formData = {};
    Object.keys(formRefs).forEach((name) => {
      formData[name] = formRefs[name]?.current?.value || "";
    });

    if (!formData.language) {
      formData.language = "en";
    }

    const formDataObj = {};
    Object.entries(formData).forEach(([name, value]) => {
      formDataObj[name] = value;
      updateFormData(name, value);
    });

    localStorage.setItem("formData", JSON.stringify(formDataObj));
    setSelectedLanguage(formData.language);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    saveFormDataToLocalStorage();
    fetchNews(paramsArray, preferencesArray);
  };
  useEffect(() => {
    const existingData = localStorage.getItem("formData");
    if (!existingData) {
      saveFormDataToLocalStorage();
      fetchNews(paramsArray, preferencesArray);
    }
  }, [formData, page]);

  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full">
      <div className="flex flex-col bg-white w-full p-5 sm:px-20 gap-2 rounded-md drop-shadow-lg relative dark:bg-bg-xiketic dark:shadow-6xl sm:w-3/4">
        <div className="relative flex  w-full gap-2">
          <input
            name="q"
            type="text"
            defaultValue={formData.q || ""}
            className={`${style.inputStyleClass}`}
            ref={formRefs.q}
            placeholder="Keywords or phrases"
          />
        </div>
        <div className="sm:flex sm:gap-4 ">
          <input
            className={`${style.inputStyleClass}`}
            type="text"
            defaultValue={formData.category || ""}
            name="category"
            ref={formRefs.category}
            placeholder="Category"
          />

          <input
            className={`${style.inputStyleClass}`}
            type="text"
            name="searchIn"
            ref={formRefs.searchIn}
            defaultValue={formData.searchIn}
            placeholder="Search in (title, description, content)"
          />
          <input
            className={`${style.inputStyleClass}`}
            type="text"
            ref={formRefs.tag}
            name="tag"
            placeholder="Tag"
            defaultValue={formData.tag}
          />
        </div>
        <div className="sm:flex sm:gap-4">
          <input
            className={`${style.inputStyleClass}`}
            type="text"
            defaultValue={formData.from || ""}
            ref={formRefs.from}
            name="from"
            placeholder="From (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)"
          />
          <input
            className={`${style.inputStyleClass}`}
            type="text"
            defaultValue={formData.to || ""}
            ref={formRefs.to}
            name="to"
            placeholder="To (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)"
          />
        </div>
        <div className="sm:flex sm:gap-4 items-center">
          <div className="relative inline-block w-full">
            <select
              className={style.selectStyle} // Add pr-8 class to accommodate the icon width
              id="country"
              defaultValue={formData.country || ""}
              name="country"
              ref={formRefs.country}
            >
              <option value="">Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 13l-6-6h12l-6 6z" />
              </svg>
            </div>
          </div>

          <div className="relative inline-block w-full">
            <select
              className={style.selectStyle}
              defaultValue={formData.language || ""}
              id="language"
              name="language"
              ref={formRefs.language}
            >
              <option value="en">{getLanguageName("en")}</option>
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 13l-6-6h12l-6 6z" />
              </svg>
            </div>
          </div>

          <div className="relative inline-block w-full">
            <select
              name="sortBy"
              className={style.selectStyle}
              ref={formRefs.sortBy}
              defaultValue={formData.sortBy || ""}
            >
              <option value="">Sort By</option>
              <option value="relevancy">Relevancy</option>
              <option value="popularity">Popularity</option>
              <option value="publishedAt">Published At</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 13l-6-6h12l-6 6z" />
              </svg>
            </div>
          </div>
        </div>{" "}
        <button
          className="btn btn-primary w-2/5 self-center bg-blue-600 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
