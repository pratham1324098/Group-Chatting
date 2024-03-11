import Hero from "./pages/Hero/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/Not-Found";
import Central from "./pages/Central/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {};

export default function App({}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/central/:roomName" element={<Central />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}
