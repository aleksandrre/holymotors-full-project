import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "./Slider";
import Loader from "../loader/Loader";

const fetchWorks = async () => {
  try {
    const response = await axios.get("http://localhost:1337/works");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch works data");
  }
};

const Works = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorksData = async () => {
      try {
        setLoading(true);
        const data = await fetchWorks();
        setWorks(data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorksData();
  }, []);

  return loading ? (
    <Loader isFullScreen={true} />
  ) : err ? (
    <h1>{err}</h1>
  ) : (
    <Slider works={works} />
  );
};

export default Works;
