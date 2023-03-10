import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed");
      }
    }
  }

  return (
    <div className="sm:my-6 my-2 lg:px-32 md:px-16 px-4 w-full h-screen justify-center flex flex-col sm:flex-row items-center gap-4  md:justify-around">
      <div className="flex flex-col gap-9 items-center w-auto ">
        <span className="animate-bounce flex items-center w-[50%] h-[50%] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-full -rotate-90  text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </span>
        <span className="text-2xl sm:text-4xl -mt-6 font-bold  block">
          Reserve
        </span>
      </div>
      <div className="">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form
          className="max-w-md mx-auto flex flex-col gap-4"
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            className="inputText w-full border my-1 py-2 px-3 rounded-lg"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            className="inputText w-full border my-1 py-2 px-3 rounded-lg"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-blue-500" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
