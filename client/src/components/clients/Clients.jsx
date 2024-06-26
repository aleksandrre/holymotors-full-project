import React, { useEffect, useState } from "react";
import axios from "axios";
import "./clients.style.scss";
import Loader from "../loader/Loader";
import ClientInfiniteSlider from "./ClientInfiniteSlider";

const fetchClientsFromAPI = async () => {
  try {
    const response = await axios.get("http://localhost:1337/clients");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch clients");
  }
};

const Clients = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState({
    firstRow: [],
    secondRow: [],
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await fetchClientsFromAPI();
        const dataLength = data.length;

        const isOddQty = dataLength % 2 !== 0;

        const payload = {};

        if (isOddQty) {
          payload.firstRow = data.slice(0, Math.ceil(dataLength / 2));
          payload.secondRow = data.slice(Math.ceil(dataLength / 2));
        } else {
          payload.firstRow = data.slice(0, dataLength / 2);
          payload.secondRow = data.slice(dataLength / 2);
        }
        setClients(payload);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return loading ? (
    <Loader isFullScreen={true} />
  ) : err ? (
    <h1>{err}</h1>
  ) : (
    <section className="clients-section" id="clients">
      <h2>clients</h2>
      <div className="marquees">
        <ClientInfiniteSlider row={clients.firstRow} reverseDirection={true} />
        <ClientInfiniteSlider
          row={clients.secondRow}
          reverseDirection={false}
        />
      </div>
    </section>
  );
};

export default Clients;
