import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { invoke } from "@tauri-apps/api";
import Button from "@mui/material/Button";
import "../../styles/Dashboard.scss";

export default function Dashboard() {
  const { isAuthenticated } = useAuth0();
  const [result, setResult] = useState("Not clicked");

  const handleClick = async () => {
    const rs: string = await invoke("adsb");
    setResult(rs);
  };

  if (!isAuthenticated) {
    return (
      <div className="root">
        <h1>Dashboard</h1>
        <p>Not authenticated</p>
      </div>
    );
  } else {
    return (
      <div className="root">
        <h1>Dashboard</h1>
        <p>Authenticated</p>
        <Button variant="contained" onClick={handleClick}>
          Click me
        </Button>
        <p>{result}</p>
      </div>
    );
  }
}
