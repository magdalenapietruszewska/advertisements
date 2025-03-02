import React, { useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

import Edit from "./components/Edit";
import Home from "./components/Home";
import New from "./components/New";
import NotFound from "./components/NotFound";
import Start from "./components/Start";

import "./styles.scss";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkPassword = (password: string) => {
    if (password === "recruitment") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Start checkPassword={checkPassword} />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/new"
            element={isAuthenticated ? <New /> : <Navigate to="/" />}
          />
          <Route
            path="/edit/:id"
            element={isAuthenticated ? <Edit /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
