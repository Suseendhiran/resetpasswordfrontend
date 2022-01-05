import React, { createContext, useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Spinner from "../Components/Spinner";

const loaderContext = createContext();

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <loaderContext.Provider value={{ loading, setLoading }}>
      <Modal sx={{ dispaly: "flex" }} open={loading}>
        <Spinner />
      </Modal>
      {children}
    </loaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(loaderContext);
  if (!context) {
    throw new Error("useLoader must be used within Loadercontext provider");
  }
  return context;
}
