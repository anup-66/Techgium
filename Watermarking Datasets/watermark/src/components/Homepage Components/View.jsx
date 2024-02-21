// import React from "react";
import React, { useState, useEffect } from "react";

import {Link, useLocation} from 'react-router-dom';
function View() {
  const [folders, setFolders] = useState([]);
  const location  = useLocation();
  const folder = location.state.folder;
  const data = location.state.data;
  // const folder = searchParams.get('state').get("folder");
  console.log("hello");
  console.log(folder);
  console.log(data)
  // console.log(data);
  useEffect(() => {
    fetch(`http://localhost:5000/image_files?folder=${folder}&data=${data}`)
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  }, []);

  return (
    <div>
      {/* Other content */}
      <div className="grid grid-cols-4 grid-row-1 gap-3 ml-[15px] mt-[20px]">
        {folders.map((image, index) => (
          <div key={index} className="border-2 w-[300px] h-[300px]">
              <img src = {`http://localhost:5000/get_image?folder=${folder}&data=${data}&image=${image}`} className="w-full h-full object-cover"/>
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default View;