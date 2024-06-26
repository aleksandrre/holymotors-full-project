import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "./Slider";
import Loader from "../loader/Loader";

const Projects = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:1337/projects");
        setProjects(response.data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return loading ? (
    <Loader isFullScreen={true} />
  ) : err ? (
    <h1>{err}</h1>
  ) : (
    <Slider projects={projects} />
  );
};

export default Projects;
