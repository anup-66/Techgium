// import React from "react";
import React, { useState, useEffect } from "react";
import View from "./View";
import {Link, useLocation} from 'react-router-dom';
function DatasetType() {
  const [folders, setFolders] = useState([]);
  const location  = useLocation();
  const folder = location.state.folder;
  // const searchParams = new URLSearchParams(location);
  // const folder = searchParams.get("name");
  // const data = searchParams.get('data')
  console.log("hello");
  console.log(folder);
  useEffect(() => {
    fetch(`http://localhost:5000/datasets?folder=${folder}`)
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
        {folders.map((data, index) => (
          <div key={index} className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <Link to={`/View`} state={{folder,data}}>
                <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                  View
                </button>
              </Link>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Other content */}
    </div>
  );
}

export default DatasetType;