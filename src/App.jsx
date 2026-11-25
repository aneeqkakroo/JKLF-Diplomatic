import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Position from "./pages/Position";
import Bureau from "./pages/Bureau";
import Statements from "./pages/Statements";
import Statement from "./pages/Statement";
import Documents from "./pages/Documents";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="position" element={<Position />} />
          <Route path="bureau" element={<Bureau />} />
          <Route path="statements" element={<Statements />} />
          <Route path="statements/:slug" element={<Statement />} />
          <Route path="documents" element={<Documents />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
