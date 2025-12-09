import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const Register = () => {
  const { registerUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!registerUser) {
      setError("Регистрация временно недоступна");
      return;
    }

    registerUser(formValues);
    setError("");
    navigate("/profile");
  };

  return (
    <main className="main">
      <section className="register">
        <Logo />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__input-container">
            <label className="register__input-label">Имя</label>
            <input
              className="register__input"
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
              value={formValues.name}
              onChange={handleChange}
            />
          </div>

          <div className="register__input-container">
            <label className="register__input-label">E-mail</label>
            <input
              className="register__input"
              type="email"
              name="email"
              id="email"
              minLength="5"
              maxLength="30"
              autoComplete="off"
              placeholder="Email"
              required
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <div className="register__input-container">
            <label className="register__input-label">Пароль</label>
            <input
              className="register__input"
              type="password"
              name="password"
              id="password"
              minLength="6"
              maxLength="30"
              placeholder="Пароль"
              required
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          {error && <span className="register__error">{error}</span>}
          <div className="register__button-container">
            <button type="submit" className="register__submit-button">
              Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__switch">
          <p className="register__switch-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__switch-link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
