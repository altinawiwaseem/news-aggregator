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
    visible,
    setVisible,
    inputStyleClass,
    buttonStyleClass,
  } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    login(formData);
  };

  return (
    <div className=" flex justify-center items-center h-full mt-10">
      <form onSubmit={handleLogin} className="h-1/2">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg flex flex-col items-center bg-gray-200 h-full">
          <p className="title-font text-2xl mb-4">Login</p>
          <p className="text-red-600">{error}</p>
          <div class="relative mb-4">
            <input
              className={inputStyleClass}
              label="Email"
              placeholder=" E-mail"
              type="email"
              autoComplete="email"
              name="email"
            />
          </div>
          <div className="relative mb-4">
            <input
              className={inputStyleClass}
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
          <button className={buttonStyleClass} type="submit">
            Login
          </button>
          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 " variant="contained">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
