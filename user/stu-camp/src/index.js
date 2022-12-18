import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //     <Provider store={store}>
  //       <AuthProvider>
  //         <App />
  //       </AuthProvider>
  //     </Provider>
  // </React.StrictMode>
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
