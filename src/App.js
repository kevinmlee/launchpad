import { CssVarsProvider } from "@mui/joy/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Dashboard from "./views/Dashboard/Dashboard";
import Launches from "./views/Launches/Launches";
import Expeditions from "./views/Expeditions/Expeditions";

import "./App.css";

function App() {
  return (
    <div className="app container">
      <CssVarsProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/launches" element={<Launches />} />
            <Route exact path="/expeditions" element={<Expeditions />} />
          </Routes>
        </Router>
      </CssVarsProvider>
    </div>
  );
}

export default App;
