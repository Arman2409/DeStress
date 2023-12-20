import { Route, BrowserRouter, Routes } from "react-router-dom"
import { routes } from "./utils/data";

import "./styles/globals.scss";

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
