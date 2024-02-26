// import React from "react";
import React, { useState, useEffect } from "react";
import DatasetType from "./DatasetType";
import {useLocation} from "react-router-dom";
import { Link } from 'react-router-dom';
function Datasets() {
  const [folders, setFolders] = useState([]);
  // const location  = useLocation();
  // const folder = location.state;
  useEffect(() => {
    fetch(`http://localhost:5000/folders`)
      .then((res) => res.json())
      .then((data) => {
        setFolders(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 grid-row-1 gap-3 ml-[15px] mt-[20px]">
        {folders.map((folder, index) => (
          <div key={index} className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
                {/*{folder}*/}
                {/*<Link to={`/DatasetType?name=${folder}`}>*/}
              <Link to={'/DatasetType'} state ={{folder}}>
                <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                  View All
                </button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Datasets;