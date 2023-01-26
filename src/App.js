import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import SideNav from "./components/SideNav";
import EssayOutlineGenerator from "./pages/EssayOutlineGenerator";
import ImageGenerator from "./pages/ImageGenerator";
import TextEditor from "./pages/TextEditor";

function App() {
  return (
    <div className="App min-h-screen flex">
      <BrowserRouter>
        <SideNav />
        <main className="py-10 px-6">
          <div className="max-w-5xl w-11/12 m-auto">
            <Routes>
              <Route path="/" element={<TextEditor />} />
              <Route path="/image_generator" element={<ImageGenerator />} />
              <Route
                path="/essay_outline_generator"
                element={<EssayOutlineGenerator />}
              />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
