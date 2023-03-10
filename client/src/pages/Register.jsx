import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.get(`/users?name=${name}&email=${email}`);
      const duplicateUsers = response.data;
      if (duplicateUsers.length > 0) {
        toast.error("A user with that name or email already exists");
        return;
      }
      await axios.post("/register", {
        name,
        email,
        password,
      });
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Registration failed");
      } else {
        toast.success("Registration successful");
        navigate("/login");
      }
      console.log(error);
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
      <div>
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            className=" w-full border my-1 py-2 px-3 rounded-lg bg-blue-50"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
