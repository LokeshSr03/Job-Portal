import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Header from "./components/Header";
import ProfileScreen from "./screens/ProfileScreen";
import JobsScreen from "./screens/JobsScreen";
import JobsFormScreen from "./screens/JobFromScreen";
import JobsListScreen from "./screens/JobListScreen";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<JobsListScreen />} />
        <Route path="/jobs" element={<JobsScreen />} />

        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />

        <Route path="/home/jobform" element={<JobsFormScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
