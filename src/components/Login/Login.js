import { validateForm } from "../../utils/FormValidator";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handleChangeMail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (password) {
      props.onLogin(email, password);
    }
  }
  React.useEffect(() => {
    validateForm("register");
  }, []);
  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="header__link">
          <img className="header__logo" alt="Логотип" src={Logo} />
        </Link>
        <h2 className="register__title">Рады видеть!</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <p className="register__field">E-mail</p>
          <div className="register__auth-container">
            <input
              type="email"
              className="register__input"
              minLength="2"
              maxLength="30"
              required
              id="email"
              placeholder="Введите адрес электронной почты"
              onChange={handleChangeMail}
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"
            ></input>
            <span className="register__error error__email">
              Некорректный адрес электронной почты
            </span>
          </div>
          <p className="register__field">Пароль</p>
          <div className="register__auth-container">
            <input
              id="password"
              type="password"
              minLength="2"
              maxLength="30"
              className="register__input"
              required
              placeholder="Введите пароль"
              onChange={handleChangePassword}
            ></input>
            <span className="register__error error__password">
              Некорректный пароль
            </span>
          </div>
          <p className="register__submit-error">{props.error}</p>
          <button type="submit" className="register__button">
            Войти
          </button>
          <p className="register__text">
            Ещё не зарегистрированы?
            <Link className="register__text register__text_link" to="/signup">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
