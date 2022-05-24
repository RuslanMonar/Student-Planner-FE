import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Main } from './Pages/Main';
import { AuthPage } from './Pages/Auth/AuthPage';
import { Dashboard } from './Pages/Dashboard';
import { Calendar } from './Components/Dashboard/Calendar';
import { Statistics } from './Components/Dashboard/Statistics';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<AuthPage />} />
        <Route exact path="/register" element={<AuthPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;