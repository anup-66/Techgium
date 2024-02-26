import React, {useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mac_address: ""
  });

  const history = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", formData);
      console.log("SignUp Successful:", response.data);
      // Redirect to DatasetType page upon successful signup
      history("/DatasetType");
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle signup errors
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
            <label htmlFor="username" className="text-lg font-semibold font-mono">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your username"
              className="p-2 border-2 rounded w-[400px]"
              required
              onChange={handleChange}
            />
            <label htmlFor="email" className="text-lg font-semibold font-mono">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your email"
              className="p-2 border-2 rounded w-[400px]"
              required
              onChange={handleChange}
            />

            <label
              htmlFor="password"
              className="text-lg font-semibold font-mono"
            >
              Password:
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Your password"
              className="p-2 border-2 rounded w-[400px]"
              required
              onChange={handleChange}
            />
            <label
              htmlFor = "Mac Addresss"
              className="text-lg font-semibold font-mono">
              Mac Address:
            </label>
             <input
              type="text"
              id="mac_address"
              name="mac_address"
              placeholder="Your Mac Address"
              className="p-2 border-2 rounded w-[400px]"
              required
              onChange={handleChange}
            />

            <button
              type="button"
              className="bg-[#008080] text-white py-2 rounded font-mono w-[200px] ml-[100px]"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </form>
          <p className="text-blue text-[15px] underline font-mono text-center mt-[15px]">
            Forgot Password?
          </p>

        </div>
        <div className="w-[500px] h-[400px] absolute shadow-2xl mt-[50px]">
          <img src="/assets/img1bg.png" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
