import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./styles/globals.scss";
import { routes } from "./utils/data";

const App = ()  => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({key, path, component}: any) => <Route
          key={key}
          path={path}
          Component={component} />)
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
