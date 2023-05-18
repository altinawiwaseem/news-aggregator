import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  //open register form when join us button in header is clicked
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  //when a user is loggedin after auth
  const [openLoginForm, setOpenLoginForm] = useState(false);
  //sign in the right user from db
  const [signIn, setSignIn] = useState({});
  //for eye icon in password
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const login = async (formData) => {
    console.log("url", process.env.REACT_APP_BASE_BACKEND_URL + "/api/login");
    await axios
      .post(baseUrl + "/api/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setError("");
        navigate("/");
      })
      .then(() => {
        // Call localStorageUser function
        localStorageUser();
      })
      .catch((error) => {
        console.log(error);
        setError("The email address or password is incorrect");
      });
  };

  const handleLogout = async () => {
    try {
      await axios
        .post(baseUrl + "/api/logout", {})
        .then(() => {
          setUser("");
        })
        .then(localStorage.clear("user"))
        .then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };
  const localStorageUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);

    return;
  };

  useEffect(() => {
    localStorageUser();
  }, []);

  const handleShowRegisterForm = () => {
    console.log(openRegisterForm);
    console.log(openLoginForm);
    setOpenRegisterForm(true);
    setOpenLoginForm(false);
  };

  const handleShowLoginForm = () => {
    setOpenRegisterForm(false);
    setOpenLoginForm(true);
  };

  return (
    <UserContext.Provider
      value={{
        baseUrl,
        login,
        error,
        user,
        setUser,
        handleLogout,
        openRegisterForm,
        setOpenRegisterForm,
        openLoginForm,
        setOpenLoginForm,
        signIn,
        setSignIn,
        handleShowRegisterForm,
        handleShowLoginForm,
        visible,
        setVisible,
        localStorageUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };
