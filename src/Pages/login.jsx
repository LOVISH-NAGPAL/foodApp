import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("input2").focus();
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (userName === "username123" && password === "12345") {
      const jwtToken = "your-jwt-token-here";

      localStorage.setItem("jwtToken", jwtToken);

      navigate("/home");
      return;
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="bg-[#242424]">
      <div className="h-[100vh] sm:w-[80%] mx-auto relative  ">
        <form
          action=""
          className="text-center bg-cyan-900 md:w-2/3 p-4 sm:p-16 m-auto h-full overflow-auto w-full"
          id="login"
          onSubmit={handleFormSubmit}>
          <h1 className="pb-5 pt-12 sm:pt-4">Login</h1>
          <div className="absolute top-0 right-0 text-left p-1 sm:p-5 bg-slate-700 shadow-2xl rounded-xl font-semibold ">
            <p className="">username:- username123</p>
            <p className="text-left">password:- 12345</p>
          </div>

          <div className="w-full my-5 text-left">
            <label
              htmlFor="input1"
              className="text-left w-full text-2xl hover:cursor-pointer">
              Username
            </label>
            <br />
            <input
              type="text"
              className="w-full mt-2 rounded-md h-10 text-left bg-[#242424]"
              placeholder=" Type username"
              id="input1"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="text-left my-5">
            <label
              htmlFor="input2"
              className="text-left text-2xl hover:cursor-pointer">
              Password
            </label>
            <br />
            <input
              type="password"
              className="w-full mt-2 rounded-md h-10 text-left bg-[#242424]"
              placeholder=" Type password"
              id="input2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-10">
            <button
              className="p-4 text-xl hover:scale-125 transition-all duration-300 ease-in-out"
              type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
