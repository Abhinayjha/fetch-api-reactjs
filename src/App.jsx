import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import "./App.css";

function App() {
  const [dataShow, setDataShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => {
        if (json != "") {
          setDataShow(json);
        } else {
          setDataShow([]);
        }
      })
      .catch((error) => {
        console.log("Fetch API Data Error is", error);
        setDataShow([]);
      });
  }, []);

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const itemsInPage = dataShow.slice(firstIndex, lastIndex);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="fetchBoxs">
      <div className="fetchContainer">
        {itemsInPage.map((item) => (
          <div className="fetchBox" key={item.id}>
            <p className="textHeading">
              <strong>ID:</strong>
              {item.id}
            </p>
            <p className="textTitle">
              <strong>Title:</strong>
              {item.title}
            </p>
            <a
              className="anchorStyle"
              href={`https://jsonplaceholder.typicode.com/todos/${item.id}`}
              target="_blank"
            >
              View To Do
            </a>
          </div>
        ))}

        <div
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={Math.ceil(dataShow.length / dataPerPage)}
            page={currentPage}
            onChange={handleChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
