import { createContext, useState } from "react";
import Header from "./components/Header";
import "./scss/app.scss";
import { Outlet } from "react-router-dom";


export const searchContext = createContext();
function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      <searchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
