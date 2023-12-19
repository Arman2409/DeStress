import { Route, BrowserRouter, Routes } from "react-router-dom"
import { routes } from "./utils/data";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({key, path, component}: any) => <Route
          key={key}
          path={path}
          element={component} />)
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
