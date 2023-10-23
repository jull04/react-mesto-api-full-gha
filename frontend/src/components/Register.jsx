import React from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";

function Register ({onRegister}) {

  const {handleChange, values, errors, isValid} = useFormValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values.email, values.password)
  }

  return (
    <main className="content">
      <div className="auth">
        <p className="auth__title">Регистрация</p>
        <form className="auth__form form" onSubmit={handleSubmit} noValidate>
          <input
            className={errors.email ? "auth__input auth__input_valid_error" : "auth__input"}
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="auth__error auth__error_visible">{errors.email}</span>
          <input
            className={errors.password ? "auth__input auth__input_valid_error" : "auth__input"}
            required
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="6"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="auth__error auth__error_visible">{errors.password}</span>
        <div className="auth__button-container">
          <button disabled={!isValid} type="submit" className={isValid ? "auth__button" : "auth__button auth__button_disabled"}>
          Зарегистрироваться
          </button>
        </div>
        </form>
        <p className="auth__signin">
          Уже зарегистрированы?{" "} <Link to="/sign-in" className="auth__link">{" "}Войти</Link>
        </p>
      </div>
    </main>
  ) 
}

  export default Register