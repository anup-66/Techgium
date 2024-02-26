// import React from "react";
import React, { useState, useEffect } from "react";
import View from "./View";
import axios from 'axios';
import {Link, useLocation,useNavigate} from 'react-router-dom';


function DatasetType() {
  const [folders, setFolders] = useState([]);
  const location  = useLocation();
  const folder = location.state.folder;
  const history = useNavigate();
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
  const handleDownloadFolder = async (folder, data) => {
    try {
      const authenticated = await axios.get("http://localhost:5000/authorised")
      console.log("hello------");
      console.log(authenticated.data.message);
      if (authenticated.data.message==="login"){
        history("/login");
        return;
      }
      console.log(folder)
      console.log(data)
      const response = await axios.get(`http://localhost:5000/download?folder=${folder}&data=${data}`, { responseType: 'blob' }); // Ensure the response type is blob for file downloads
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${folder}.zip`); // You might want to give a more meaningful name based on folder/data
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading folder:', error);
    }
  };


  return (
    <div>
      <div className="grid grid-cols-4 grid-row-1 gap-3 ml-[15px] mt-[20px]">
        {folders.map((data, index) => (
          <div key={index} className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              {folder === 'Text_dataset'? (
          <Link to={`/CSVViewPage`} state={{folder, data}}>
            <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
              View
            </button>
          </Link>
        ) : (
          <Link to={`/View`} state={{folder, data}}>
            <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
              View
            </button>
          </Link>
        )}
              <button onClick={() => {handleDownloadFolder(folder, data)}} className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
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