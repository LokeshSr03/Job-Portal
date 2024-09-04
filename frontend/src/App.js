import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import Header from "./components/Header";
import ProfileScreen from "./screens/ProfileScreen";
import JobsScreen from "./screens/JobsScreen";
import JobsFormScreen from "./screens/JobFromScreen";
import JobsListScreen from "./screens/JobListScreen";
import JobEditScreen from "./screens/JobEditScreen";
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
        <Route path="/admin/jobs/edit/:id" element={<JobEditScreen />} />
        <Route path="/home/jobform" element={<JobsFormScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
