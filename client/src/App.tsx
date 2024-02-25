import Hero from "./pages/Hero/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/Not-Found";

type Props = {};

export default function App({}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
