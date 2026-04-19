import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailSurat from "./pages/DetailSurat";

function App() {
  return (
    <HashRouter>
      <div className="container-fluid">
        <div className="row min-vh-100">
          <div className="col-12 col-md-4 col-lg-3 p-0">
            <Navbar />
          </div>

          <div className="col-12 col-md-8 col-lg-9 p-0">
            <Content>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/surat/:id" element={<DetailSurat />} />
              </Routes>
            </Content>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;