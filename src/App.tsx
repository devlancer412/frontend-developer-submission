import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import { ErrorPage, GalleryPage, WelcomePage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path=":address" element={<GalleryPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
