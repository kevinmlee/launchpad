import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <CssVarsProvider>
        <Dashboard />
      </CssVarsProvider>
    </div>
  );
}

export default App;
