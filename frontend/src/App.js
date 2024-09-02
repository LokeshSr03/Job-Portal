import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
