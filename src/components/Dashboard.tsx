import React, { useState, useEffect } from "react";
import MenuAppBar from "../lib/navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { invoke } from "@tauri-apps/api";
import Button from "@mui/material/Button";
import "../../styles/Dashboard.scss";

export default function Dashboard() {
  const [result, setResult] = useState<unknown>(0);
  const [lastUpdated, setLastUpdated] = useState<string>("never");
  const { user } = useAuth0();
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  const handleClick = async () => {
    const rs = await invoke("mongo_count");
    setResult(rs);
    setLastUpdated(new Date().toLocaleString());
    if (timerId) {
      clearInterval(timerId);
    }
    const newTimerId = setInterval(async () => {
      const newRs = await invoke("mongo_count");
      setResult(newRs);
      setLastUpdated(new Date().toLocaleString());
    }, 3600000);
    setTimerId(newTimerId);
  };

  useEffect(() => {
    const newTimerId = setInterval(async () => {
      const newRs = await invoke("mongo_count");
      setResult(newRs);
      setLastUpdated(new Date().toLocaleString());
    }, 3600000);
    setTimerId(newTimerId);
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, []);

  return (
    <div className="root">
      <MenuAppBar />
      <div className="content">
        <h1>ADS-B Military Analytics DevOps</h1>
        <h3>Welcome {user?.nickname}</h3>
        <p className="rootresult">
          Amount of Documents: {result as number}
          <h6>Last Updated: {lastUpdated}</h6>
        </p>
        <Button variant="contained" onClick={handleClick} sx={{ m: 1 }}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
