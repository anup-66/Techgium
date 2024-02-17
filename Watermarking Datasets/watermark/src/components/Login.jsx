import React from "react";

function Login() {
  return (
    <div>
      <video
        src="/background.mp4"
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute top-[20%] left-[17%]">
        <div className="w-[500px] h-[500px] border absolute bg-[#FCFBFC] rounded opacity-75 shadow-2xl ml-[480px]">
          <form className="flex flex-col space-y-4 mt-[80px] ml-[50px]">
            <label htmlFor="email" className="text-lg font-semibold font-mono">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              className="p-2 border-2 rounded w-[400px]"
              required
            />

            <label
              htmlFor="password"
              className="text-lg font-semibold font-mono"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              className="p-2 border-2 rounded w-[400px]"
              required
            />

            <button
              type="submit"
              className="bg-[#008080] text-white py-2 rounded font-mono w-[200px] ml-[100px]"
            >
              Login
            </button>
          </form>
          <p className="text-blue text-[15px] underline font-mono text-center mt-[15px]">
            Forgot Password?
          </p>
          <p className="text-blue text-[15px] underline font-mono mt-[15px] text-center">
            New User? <br /> Sign Up!
          </p>
        </div>
        <div className="w-[500px] h-[400px] absolute shadow-2xl mt-[50px]">
          <img src="/assets/img1bg.png" />
        </div>
      </div>
    </div>
  );
}

export default Login;
