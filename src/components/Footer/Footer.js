const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Проект BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>

        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a
                className="footer__nav-link"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__nav-item">
              <a
                className="footer__nav-link"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
