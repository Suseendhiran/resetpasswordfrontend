import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../Providers/AuthProvider";

function Index() {
  const { setToken } = useAuth();
  const history = useHistory();
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <div>
      <h1>You are Logged in!</h1>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Index;
