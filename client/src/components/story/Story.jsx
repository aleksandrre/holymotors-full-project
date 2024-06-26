import React, { useEffect, useState } from "react";
import "./story.style.scss";
import Loader from "../loader/Loader";
import axios from "axios";

const fetchStory = async () => {
  try {
    const response = await axios.get("http://localhost:1337/stories");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch story data");
  }
};

const Story = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState({});

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true);
        const data = await fetchStory();
        setStory(data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStoryData();
  }, []);

  return loading ? (
    <Loader isFullScreen={true} />
  ) : err ? (
    <h1>{err}</h1>
  ) : (
    <article
      className="story-article"
      id="story"
      style={{
        backgroundImage: `url(${story[0].bgImage})`,
      }}
    >
      <div className="top-space"></div>
      <div className="story-container">
        <div className="story-content ">
          <div className="story-content-headings">
            <h1>{story[0].title}</h1>
            <p className="sub-info">{story[0].subInfo}</p>
            <p className="short-description">{story[0].shortDescription}</p>
          </div>
          <div
            className="story-content-description"
            dangerouslySetInnerHTML={{
              __html: story[0].longDescription,
            }}
          />
        </div>
        <div className="story-partners">
          {story[0].partnerImages &&
            story[0].partnerImages.map((partner, index) => (
              <img key={index} src={partner} alt="partner" />
            ))}
        </div>
      </div>
      <div className="bottom-space"></div>
    </article>
  );
};

export default Story;
