import React, { useState } from "react";
import MenuAppBar from "../lib/navbar";
import { invoke } from "@tauri-apps/api";
import Button from "@mui/material/Button";
import "../../styles/Dashboard.scss";

export default function Dashboard() {
  const [result, setResult] = useState("Not clicked");

  const handleClick = async () => {
    const rs: string = await invoke("adsb");
    setResult(rs);
  };

  return (
    <div className="root">
      <MenuAppBar />
      <h1>Dashboard</h1>
      <p>Authenticated</p>
      <Button variant="contained" onClick={handleClick}>
        Click me
      </Button>
      <p>{result}</p>
    </div>
  );
}
