import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/Context/UserContext";
//image
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
  const { handleShowLoginForm, visible, setVisible, baseUrl } =
    useContext(UserContext);

  const navigate = useNavigate();
  /* getting the registration details from the user to register as a new user */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios
        .post(baseUrl + "/api/register", {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
        })
        .then(localStorage.clear("preferences"))
        .then(navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    /* overlay for register component on top of home component ---homepage */
    <div className=" flex justify-center align-center z-10">
      {/* registration form */}
      <form onSubmit={handleSubmit}>
        <div className=" bg-nav-raisin-black-4 text-white rounded-lg p-8 flex flex-col m-3 m-10 font-poppins">
          <p className="title-font text-2xl mb-4">Register</p>
          <div className="relative mb-4">
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              label="First Name"
              placeholder="First name"
              type="text"
              autoComplete="firstName"
              name="firstName"
              required
            />
          </div>
          <div class="relative mb-4">
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              label="Last Name"
              placeholder="Last name"
              type="text"
              autoComplete="lastName"
              name="lastName"
              required
            />
          </div>
          <div className="relative mb-4">
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              label="Email"
              placeholder=" E-mail"
              type="email"
              autoComplete="email"
              name="email"
              required
            />
          </div>
          <div class="relative mb-4">
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              label="Password"
              placeholder="Password"
              type={visible ? "password" : "text"}
              autoComplete="new-password"
              name="password"
              required
            />
            {/* to show / hide password */}
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
            Register
          </button>

          <p className="register-link">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyber-yellow "
              variant="contained"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
