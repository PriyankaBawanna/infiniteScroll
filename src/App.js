import React, { useEffect, useState, useRef } from "react";
import "./App.css";

const APICalling = async () => {
  try {
    const res = await fetch("https://xcountries-backend.azurewebsites.net/all");

    if (res.status != 200) {
      throw new Error(`error ${res.status}`);
    }
    if (res.status === 200) {
      const resCount = await res.json();
      console.log("resCount", resCount);
      return resCount;
    }
  } catch (error) {
    console.error("Error fetching data :", error.message);
    throw error;
  }
};
const Card = ({ flag, name }) => {
  return (
    <div className="card">
      <img src={flag} alt={flag} className="flagimg" />
      <div>{name}</div>
    </div>
  );
};

const Xcountries = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // Tracks the current page
  const [isFetching, setIsFetching] = useState(false); // Tracks fetch status
  const loader = useRef(null); // Reference for the loader div

  useEffect(() => {
    fetchData(page); // Load initial data
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isFetching) {
      fetchData(page);
    }
  }, [isFetching]);

  const fetchData = async (currentPage) => {
    try {
      const APIResponse = await APICalling(currentPage); // Adjust API for pagination
      setData((prevData) => [...prevData, ...APIResponse]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="parentCard">
      {data.map((item, index) => (
        <div key={index}>
          <Card name={item.name} flag={item.flag} />
        </div>
      ))}
      <div ref={loader} className="loader">
        {isFetching && <p>Loading more countries...</p>}
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Xcountries />
    </>
  );
}

export default App;
