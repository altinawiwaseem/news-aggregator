import React, { useContext, useRef, useState } from "react";
import { NewsContext } from "../Context/NewsContext";
import countriesList from "countries-list";
import { languages } from "../../utili/languges";

const News = () => {
  const { formRefs, updateFormData, fetchNews, news } = useContext(NewsContext);

  const defaultLangauesOption = "en";

  const defaultLanguage = localStorage.getItem("formData")
    ? getLanguageName(JSON.parse(localStorage.getItem("formData")).language)
    : getLanguageName(defaultLangauesOption);

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  function getLanguageName(code) {
    const language = languages.find((lang) => lang.code === code);
    return language ? language.name : "";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const languageValue = formRefs.language.current.value;

    // Update the selected language in the state
    setSelectedLanguage(languageValue);

    const formData = {};

    Object.keys(formRefs).forEach((name) => {
      formData[name] = formRefs[name]?.current?.value;
    });
    const formDataObj = {};
    Object.entries(formData).forEach(([name, value]) => {
      formDataObj[name] = value;
      localStorage.setItem("formData", JSON.stringify(formDataObj));
      updateFormData(name, value);
    });

    fetchNews();
  };

  const countries = Object.entries(countriesList.countries).map(
    ([code, country]) => ({
      code,
      name: country.name,
    })
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/*  <input
          type="text"
          name="q"
          ref={formRefs.q}
          placeholder="Keywords or phrases"
        />
        <input
          type="text"
          name="category"
          ref={formRefs.category}
          placeholder="Category"
        />
        <select id="country" name="country" ref={formRefs.country}>
          <option value="">All</option>

          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="searchIn"
          ref={formRefs.searchIn}
          placeholder="Search in (title, description, content)"
        />

        <input
          type="text"
          ref={formRefs.sources}
          name="sources"
          placeholder="Sources"
        />

        <input
          type="text"
          ref={formRefs.from}
          name="from"
          placeholder="From (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)"
        />
        <input
          type="text"
          ref={formRefs.to}
          name="to"
          placeholder="To (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)"
        /> */}

        {/* < label htmlFor="language">Language:</label>
        <select id="language" name="language" ref={formRefs.language}>
          <option value="en">{selectedLanguage}</option>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <select name="sortBy">
          ref={formRefs.sortBy}
          <option value="">Sort By</option>
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
          <option value="publishedAt">Published At</option>
        </select> */}
        <button type="submit">Submit</button>
      </form>
      {/* Display news articles */}
      <ul>
        {news &&
          news?.map((article) => <li key={article.title}>{article.title}</li>)}
      </ul>
    </div>
  );
};

export default News;
