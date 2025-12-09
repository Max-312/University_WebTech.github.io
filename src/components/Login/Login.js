import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const Login = () => {
  const { login, registeredUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: registeredUser?.email || "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login?.(formValues);

    if (result?.success) {
      setError("");
      navigate("/profile");
      return;
    }

    setError(result?.message || "Не удалось войти");
  };

  return (
    <main className="main">
      <section className="login">
        <Logo />
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-container">
            <label className="login__input-label">E-mail</label>
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              minLength="5"
              maxLength="30"
              placeholder="Email"
              autoComplete="off"
              required
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <div className="login__input-container">
            <label className="login__input-label">Пароль</label>
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              minLength="6"
              maxLength="30"
              placeholder="Пароль"
              autoComplete="off"
              required
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          {error && <span className="login__error">{error}</span>}
          <div className="login__button-container">
            <button type="submit" className="login__submit-button">
              Войти
            </button>
          </div>
        </form>
        <div className="login__switch">
          <p className="login__switch-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__switch-link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
