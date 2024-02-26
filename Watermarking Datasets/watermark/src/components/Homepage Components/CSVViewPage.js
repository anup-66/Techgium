import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
// import {useParams} from "react-router-dom";
// import {loca}
function CSVViewPage() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const folder = location.state.folder;
  const file = location.state.data;
  console.log(folder);
  console.log(file);

  useEffect(()=>{

    fetch(`http://localhost:5000/csvdata?folder=${folder}&file=${file}`)
      .then((res) => res.json()
      .then((data) => {
        setData(data);
        // setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setLoading(false);
      })
  );
  },[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CSV Content</h1>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-teal-800">
            {data.length > 0 &&
              data[0].map((column, index) => (
                <th key={index} className="px-4 py-2">
                  {column}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-teal-800">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CSVViewPage;