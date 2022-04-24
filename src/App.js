import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Main } from './Pages/Main';
import { AuthPage } from './Pages/Auth/AuthPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<AuthPage />} />
        <Route exact path="/register" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;