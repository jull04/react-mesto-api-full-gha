import React from 'react';
import { Routes, Route, Link} from "react-router-dom";
import burger from '../images/burger.svg';
import closeBtn from '../images/close-burger-menu.svg';

function Header({loggedIn, onLogout, email}) {

  const [menu, setMenu] = React.useState(false);
  const [scroll, setScroll] = React.useState(0);

  function handleOpenMenu() {
    setMenu(!menu)
  }

  function handleScroll() {
    setScroll(window.scrollY);
  };

  //При скролле вниз, меню само закрывается
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  return (
    <header className="header">
      <div className="header__logo"/>
      <div className="header__links">
        <Routes>
          <Route path="/sign-up" element={
            <Link to="/sign-in" className="header__link header__button">
              Войти
            </Link>
          }/>

          <Route path="/sign-in" element={
            <Link to="/sign-up" className="header__link header__button">
              Регистрация
            </Link>
          }/>

          <Route path="/" element={loggedIn && (
            <>
              <p className="header__email">{email}</p>
              <button className="header__link header__button" onClick={onLogout}>
                Выйти
              </button>
            </>
          )}/>
        </Routes>
      </div>
    </header>
  )
}

export default Header 