import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Navigation from "../Navigation/Navigation.js";
import Logo from "../Logo/Logo";

const Header = ({ style: { default: isDefaultStyle } }) => {
  const { isLogged } = useContext(CurrentUserContext);
  const [isBurgerOpen, setIsNavigationOpen] = useState(false);
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
  const location = useLocation();

  const handleBurgerClick = () => {
    setIsNavigationOpen(!isBurgerOpen);
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    setIsLogoMenuOpen((prev) => !prev);
  };

  const closeLogoMenu = () => setIsLogoMenuOpen(false);

  useEffect(() => {
    closeLogoMenu();
  }, [location.pathname]);

  const logoMenuItems = useMemo(
    () =>
      isLogged
        ? [
            { to: "/profile", label: "Профиль" },
            { to: "/saved-movies", label: "Сохраненные фильмы" },
          ]
        : [{ to: "/movies", label: "Фильмы" }],
    [isLogged]
  );

  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <Logo onClick={handleLogoClick} />
        {isLogoMenuOpen && (
          <div className="header__logo-menu">
            {logoMenuItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="header__logo-menu-link"
                onClick={closeLogoMenu}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {!isDefaultStyle &&
        (isLogged ? (
          <>
            {isBurgerOpen && (
              <div
                className={`header__background ${
                  isBurgerOpen ? "header__background_active" : ""
                }`}
              />
            )}
            <button
              onClick={handleBurgerClick}
              className="header__menu-button"
              type="button"
            ></button>
            <Navigation
              isNavigationOpen={isBurgerOpen}
              handleBurgerClick={handleBurgerClick}
            />
          </>
        ) : (
          <nav className="header__nav">
            <Link to="/signup" className="header__signup">
              Регистрация
            </Link>
            <Link to="/signin" className="header__signin">
              Войти
            </Link>
          </nav>
        ))}
    </header>
  );
};

export default Header;
