import { useEffect, useState } from "react";
import "./App.css";
import { Landing, Login, NavBar, Register, Home, About } from "./components";
import { Route, Routes } from "react-router-dom";

function App() {
  const [ isAuth, setIsAuth ] = useState(false);
  const [ isLogout, setIsLogout] = useState(true)
  const [ userData, setUserData ] = useState({
    username: "",
    role: "",
    refreshtoken: "",
  });
  function handleAuth() {
    setIsAuth(true);
  }

  function handleUserData(data) {
    setUserData({
      username: data.username,
      role: data.role,
      refreshToken: data.refreshToken,
    });
  }
  
  return (
    <>
      { console.log(isAuth) }
      <NavBar isAuth={isAuth} onSetAuth={setIsAuth} />
      <div className="container">
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Landing />} />
          <Route path="/about" element={<About />} />
          <Route
            exact
            path="/login"
            element={
              <Login
                onSetAuth={handleAuth}
                onSetUser={handleUserData}
              />
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
