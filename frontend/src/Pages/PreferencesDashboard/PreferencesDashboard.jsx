import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function PreferencesDashboard() {
  const [preferences, setPreferences] = useState([]);
  const [editingPreference, setEditingPreference] = useState(null);

  const searchRef = useRef("");
  const categoryRef = useRef("");
  const countryRef = useRef("");
  const languageRef = useRef("");
  const tagRef = useRef("");
  const fromDateRef = useRef("");
  const toDateRef = useRef("");

  const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  useEffect(() => {
    // Fetch preferences from Laravel backend
    axios
      .get(`${baseUrl}/api/preferences`)
      .then((response) => {
        setPreferences(response.data);
        localStorage.setItem("preferences", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching preferences:", error);
      });
  }, []);

  const handleEdit = (preference) => {
    setEditingPreference(preference);
    searchRef.current.value = preference.search;
    categoryRef.current.value = preference.category;
    countryRef.current.value = preference.country;
    languageRef.current.value = preference.language;
    tagRef.current.value = preference.tag;
    fromDateRef.current.value = preference.fromDate;
    toDateRef.current.value = preference.toDate;
  };

  const handleDelete = (preference) => {
    // Delete preference from Laravel backend
    axios
      .delete(`${baseUrl}/api/preferences/${preference.id}`)
      .then((response) => {
        setPreferences((prevPreferences) =>
          prevPreferences.filter((p) => p.id !== preference.id)
        );
        localStorage.setItem(
          "preferences",
          JSON.stringify(preferences.filter((p) => p.id !== preference.id))
        );
        console.log("Preference deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting preference:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const search = searchRef.current.value;
    const category = categoryRef.current.value;
    const country = countryRef.current.value;
    const language = languageRef.current.value;
    const tag = tagRef.current.value;
    const fromDate = fromDateRef.current.value;
    const toDate = toDateRef.current.value;

    if (editingPreference) {
      // Update existing preference in Laravel backend
      axios
        .put(`${baseUrl}/api/preferences/${editingPreference.id}`, {
          search,
          category,
          country,
          language,
          tag,
          fromDate,
          toDate,
        })
        .then((response) => {
          setPreferences((prevPreferences) =>
            prevPreferences.map((p) =>
              p.id === editingPreference.id
                ? {
                    ...p,
                    search,
                    category,
                    country,
                    language,
                    tag,
                    fromDate,
                    toDate,
                  }
                : p
            )
          );
          localStorage.setItem(
            "preferences",
            JSON.stringify(
              preferences.map((p) =>
                p.id === editingPreference.id
                  ? {
                      ...p,
                      search,
                      category,
                      country,
                      language,
                      tag,
                      fromDate,
                      toDate,
                    }
                  : p
              )
            )
          );
          console.log("Preference updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating preference:", error);
        });

      searchRef.current.value = "";
      categoryRef.current.value = "";
      countryRef.current.value = "";
      languageRef.current.value = "";
      tagRef.current.value = "";
      fromDateRef.current.value = "";
      toDateRef.current.value = "";
      setEditingPreference(null);
    } else {
      // Add new preference to Laravel backend
      axios
        .post(`${baseUrl}/api/preferences`, {
          search,
          category,
          country,
          language,
          tag,
          fromDate,
          toDate,
        })
        .then((response) => {
          setPreferences((prevPreferences) => [
            ...prevPreferences,
            response.data,
          ]);
          localStorage.setItem(
            "preferences",
            JSON.stringify([...preferences, response.data])
          );
          console.log("Preference added successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding preference:", error);
        });

      searchRef.current.value = "";
      categoryRef.current.value = "";
      countryRef.current.value = "";
      languageRef.current.value = "";
      tagRef.current.value = "";
      fromDateRef.current.value = "";
      toDateRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 p-4">
        <h2 className="text-2xl mb-4">Control Preferences</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="search" className="block mb-2 font-medium">
              Key Words
            </label>
            <input
              type="text"
              id="search"
              name="search"
              ref={searchRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2 font-medium">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              ref={categoryRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block mb-2 font-medium">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              ref={countryRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block mb-2 font-medium">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              ref={languageRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="block mb-2 font-medium">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              ref={tagRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fromDate" className="block mb-2 font-medium">
              From Date
            </label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              ref={fromDateRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="toDate" className="block mb-2 font-medium">
              To Date
            </label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              ref={toDateRef}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {editingPreference ? "Update Preference" : "Save Preference"}
          </button>
        </form>
      </div>

      <div className="w-full lg:w-2/3 p-4">
        <h2 className="text-2xl mb-4">Preferences List</h2>
      </div>
    </div>
  );
}

export default PreferencesDashboard;
