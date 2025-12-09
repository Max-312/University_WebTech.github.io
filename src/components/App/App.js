import { useCallback, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import Main from "../Main/Main.js";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    isLogged: false,
  });
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleRegister = useCallback(({ name, email, password }) => {
    const newUser = { name, email, password };
    setRegisteredUser(newUser);
    setCurrentUser({ name, email, isLogged: true });
  }, []);

  const handleLogin = useCallback(
    ({ email, password }) => {
      if (!registeredUser) {
        return { success: false, message: "Пользователь не найден" };
      }

      if (
        registeredUser.email === email.trim() &&
        registeredUser.password === password
      ) {
        setCurrentUser({
          name: registeredUser.name,
          email: registeredUser.email,
          isLogged: true,
        });
        return { success: true };
      }

      return { success: false, message: "Неверный email или пароль" };
    },
    [registeredUser]
  );

  const handleLogout = useCallback(() => {
    setCurrentUser((prev) => ({ ...prev, isLogged: false }));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...currentUser,
      registeredUser,
      registerUser: handleRegister,
      login: handleLogin,
      logout: handleLogout,
    }),
    [currentUser, handleLogin, handleLogout, handleRegister, registeredUser]
  );

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/movies" element={<Movies />} />

            <Route
              path="/saved-movies"
              element={
                currentUser.isLogged ? (
                  <SavedMovies />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />

            <Route path="/signin" element={<Login />} />

            <Route path="/signup" element={<Register />} />

            <Route
              path="/profile"
              element={
                currentUser.isLogged ? (
                  <Profile />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
