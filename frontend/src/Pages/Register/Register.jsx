import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/Context/UserContext";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { style } from "../../utils/style.js";

export default function Register() {
  const { visible, setVisible, baseUrl } = useContext(UserContext);

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
    <div className=" flex justify-center items-center h-full mt-10 dark:text-snow">
      {/* registration form */}
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg flex flex-col items-center bg-gray-200 drop-shadow-lg  dark:bg-bg-xiketic dark:shadow-6xl">
          <p className="title-font text-2xl mb-4">Register</p>
          <div className="relative mb-4">
            <input
              className={style.inputStyleClass}
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
              className={style.inputStyleClass}
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
              className={style.inputStyleClass}
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
              className={style.inputStyleClass}
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

          <button className={style.buttonStyleClass} type="submit">
            Register
          </button>

          <p className="register-link">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 " variant="contained">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
