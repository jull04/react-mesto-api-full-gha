import React from 'react';
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import { useState } from 'react';

function Header({loggedIn, email}) {

  const navigate = useNavigate();

  const [menuActive, setMenuActive] = useState(false)

  function handleClick() {
    menuActive === false ? setMenuActive(true) : setMenuActive(false)
  }

  function onLogout() {
    setMenuActive(false);
    localStorage.removeItem('jwt');
    navigate("/sign-in");
  }

  return (
    <header className={`header ${menuActive !== false ? 'header_opened' : ''}`}>
      <div className="header__logo"/>
        <Routes>
          <Route path="/sign-up" element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }/>

          <Route path="/sign-in" element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }/>
        </Routes>
          <Routes>
          <Route path="/" element={loggedIn && (
            <>
            <div className={`header__links ${menuActive !== false ? 'header__links_opened' : ''}`}>
              <p className="header__email">{email}</p>
              <button className="header__link" onClick={onLogout}>
                Выйти
              </button>
              </div>
              <button className={`header__burger ${menuActive !== false ? 'header__burger_active' : ''}`} onClick={handleClick}></button>
            </>
          )}/>
        </Routes>
    </header>
  )
}

export default Header 