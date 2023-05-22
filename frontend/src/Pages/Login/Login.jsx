import { useContext } from "react";
import { Link } from "react-router-dom";
/* import { UserContext } from "../Context/UserContext"; */
//image
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserContext } from "../../components/Context/UserContext";

export default function Login() {
  const {
    login,
    error,
    handleShowRegisterForm,
    setOpenLoginForm,
    visible,
    setVisible,
  } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    setOpenLoginForm(false);

    const formData = new FormData(event.target);
    login(formData);
  };

  return (
    /* overlay for register component on top of home component ---homepage */
    <div className="fixed w-full h-full top-20 left-0 right-0 bg-neutral-800/75 flex justify-center align-center z-10">
      {/* overlay of register component*/}
      <div className="absolute top-50 left-50 z-50 ">
        <form onSubmit={handleLogin}>
          <div className="bg-nav-raisin-black-4 text-white rounded-lg p-8 flex flex-col m-3 m-10 font-poppins">
            <p className="title-font text-2xl mb-4">Login</p>
            <p>{error}</p>
            <div class="relative mb-4">
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-col"
                label="Email"
                placeholder=" E-mail"
                type="email"
                autoComplete="email"
                name="email"
              />
            </div>
            <div className="relative mb-4">
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                label="Password"
                placeholder="Password"
                type={visible ? "password" : "text"}
                autoComplete="new-password"
                name="password"
              />
              <span
                className="absolute right-5 top-3"
                onClick={() => setVisible(!visible)}
              >
                {!visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <button
              className="text-white bg-btn-majorelle-blue border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-4"
              type="submit"
            >
              Login
            </button>
            <p className="text-sm sm:text-md">
              Don't have an account ?{" "}
              {
                <button
                  onClick={handleShowRegisterForm}
                  className="text-cyber-yellow hover:text-primary-bg"
                  variant="contained"
                >
                  Register
                </button>
              }
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
