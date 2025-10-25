import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import StarRating from "./components/ui/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={10}
      color="red"
      size="20"
      className="stars"
      defaultRating={3}
    /> */}
  </React.StrictMode>
);
