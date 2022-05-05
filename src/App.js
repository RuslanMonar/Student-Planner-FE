import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Main } from './Pages/Main';
import { AuthPage } from './Pages/Auth/AuthPage';
import { Dashboard } from './Pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<AuthPage />} />
        <Route exact path="/register" element={<AuthPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;