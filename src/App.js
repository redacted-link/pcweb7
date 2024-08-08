import './App.css';
import GamePage from './views/GamePage';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './views/SignUpPage';
import LoginPage from './views/LoginPage';
import StatsPage from './views/StatsPage';

function App() {
  const router = createBrowserRouter([
    {path: "/", element : <GamePage />},
    {path: "/login", element : <LoginPage />},
    {path: "/signup", element: <SignUpPage />},
    {path: "/stats", element: <StatsPage />},
  ])
  return (
    <RouterProvider router={router} />
  //   <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<GamePage />} />
  //     <Route path="/login" element={<LoginPage />} />
  //     <Route path="/signup" element={<SignUpPage />} />
  //     {/* <Route path="/stat" element={<StatsPage />} /> */}

  //   </Routes>
  // </BrowserRouter>
  );
}

export default App;
