import logo from './logo.svg';
import './App.css';
import AddInvoiceComponent from "./components/AddInvoiceComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListInvoiceComponent from "./components/ListInvoiceComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListInvoiceComponent />} />
          <Route path="/Invoice" element={<ListInvoiceComponent />} />
          <Route path="/add-Invoice" element={<AddInvoiceComponent />} />
          <Route path="/add-Invoice/:id" element={<AddInvoiceComponent />} />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
