// import React from "react";

// const Download = () => {
//   return (
//     <div className="flex flex-col w-[40%] p-4">
//       <div className="">
//         <form className="flex flex-col space-y-4 mt-[80px] ml-[50px]">
//           <label htmlFor="email" className="text-lg font-semibold font-mono">
//             Username:
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter Username"
//             className="p-2 border-2 rounded w-[400px]"
//             required
//           />

//           <label htmlFor="password" className="text-lg font-semibold font-mono">
//             MAC address:
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter MAC address"
//             className="p-2 border-2 rounded w-[400px]"
//             required
//           />

//           <button
//             type="submit"
//             className="bg-[#008080] text-white py-2 rounded font-mono w-[200px] ml-[100px]"
//           >
//             Download
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Download;

// import React, { useState } from "react";

// const Download = () => {
//   const [username, setUsername] = useState("");
//   const [macAddress, setMacAddress] = useState("");

//   const handleDownload = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/encrypt", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           mac_address: macAddress,
//         }),
//       });

//       if (response.ok) {
//         console.log("Encryption successful");
//         // You may want to trigger the download here
//       } else {
//         console.error("Encryption failed");
//       }
//     } catch (error) {
//       console.error("Error during encryption:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col w-[40%] p-4">
//       <div className="">
//         <form
//           className="flex flex-col space-y-4 mt-[80px] ml-[50px]"
//           onSubmit={handleDownload}
//         >
//           <label htmlFor="username" className="text-lg font-semibold font-mono">
//             Username:
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter Username"
//             className="p-2 border-2 rounded w-[400px]"
//             required
//           />

//           <label
//             htmlFor="macAddress"
//             className="text-lg font-semibold font-mono"
//           >
//             MAC address:
//           </label>
//           <input
//             type="text"
//             id="mac_address"
//             name="mac_address"
//             value={macAddress}
//             onChange={(e) => setMacAddress(e.target.value)}
//             placeholder="Enter MAC address"
//             className="p-2 border-2 rounded w-[400px]"
//             required
//           />

//           <button
//             type="button"
//             onClick="encryptFolder()"
//             className="bg-[#008080] text-white py-2 rounded font-mono w-[200px] ml-[100px]"
//           >
//             Download
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Download;

import React, { useState } from "react";

const Download = () => {
  const [username, setUsername] = useState("");
  const [macAddress, setMacAddress] = useState("");

  const encryptFolder = async () => {
    // Validate inputs
    if (!username || !macAddress) {
      alert("Please enter both username and MAC address.");
      return;
    }
    //if the user name is duplicate prompt the user to typr something new.

    // Mock encryption API endpoint (replace with your actual endpoint)
    const apiUrl = "http://localhost:5000/encrypt";

    // try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("mac_address", macAddress);
    fetch(apiUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => {
        //   if (response.ok) {
        alert("Encryption successful! Check the server output folder.");
        //     // You may want to trigger the download here
        //   } else {
        //     alert("Encryption failed. Check the console for details.");
        //     console.error(response.statusText);
        //   }
      })

      .catch((error) => {
        alert("An error occurred. Check the console for details.");
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col w-[40%] p-4">
      <div className="">
        <form
          className="flex flex-col space-y-4 mt-[80px] ml-[50px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="username" className="text-lg font-semibold font-mono">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="p-2 border-2 rounded w-[400px]"
            required
          />

          <label
            htmlFor="macAddress"
            className="text-lg font-semibold font-mono"
          >
            MAC address:
          </label>
          <input
            type="text"
            id="macAddress"
            name="macAddress"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value)}
            placeholder="Enter MAC address"
            className="p-2 border-2 rounded w-[400px]"
            required
          />

          <button
            type="button"
            onClick={encryptFolder}
            className="bg-[#008080] text-white py-2 rounded font-mono w-[200px] ml-[100px]"
          >
            Download
          </button>
        </form>
      </div>
    </div>
  );
};

export default Download;
