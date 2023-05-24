import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserContext } from "../../components/Context/UserContext";
import { style } from "../../utils/style.js";
import { NewsContext } from "../../components/Context/NewsContext";

export default function Login() {
  const { login, error, visible, setVisible } = useContext(UserContext);
  const { getPreferencesFromDatabase } = useContext(NewsContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    login(formData);
    getPreferencesFromDatabase();
  };

  return (
    <div className=" flex justify-center items-center h-full mt-10">
      <form onSubmit={handleLogin} className="h-1/2">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg flex flex-col items-center bg-gray-200 h-full">
          <p className="title-font text-2xl mb-4">Login</p>
          <p className="text-red-600">{error}</p>
          <div class="relative mb-4">
            <input
              className={style.inputStyleClass}
              label="Email"
              placeholder=" E-mail"
              type="email"
              autoComplete="email"
              name="email"
            />
          </div>
          <div className="relative mb-4">
            <input
              className={style.inputStyleClass}
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
          <button className={style.buttonStyleClass} type="submit">
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
