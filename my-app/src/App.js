import { Routes, Route, Router } from "react-router-dom"
import './App.css';
import { ValidationSchemaExample } from './components/crud/create';
import Table from './components/crud/table';
import View from "./components/crud/view";
import PrivateRoutes from "./components/protectedRouter";
function App() {
  return (
    <>
      <div className="App">

        <Routes>
          <Route element={<PrivateRoutes />}>

            <Route path="/create" element={<ValidationSchemaExample />} />
            <Route path="/edit/:firstName" element={<ValidationSchemaExample />} />
            <Route path="/view/:id" element={<View />} />
          </Route>
          <Route element={<Table />} path="/" exact />
        </Routes>

      </div>
    </>
  );
}

export default App;
