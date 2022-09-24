import { validateForm } from "../../utils/FormValidator";
import Logo from '../../images/logo.png';
import {Link} from 'react-router-dom';
import React from 'react';

function Register(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handleChangeName(evt) {
        setName(evt.target.value);
    }
    function handleChangeMail(evt) {
        setEmail(evt.target.value);
    }
    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }
    function handleSubmit (e) {
        e.preventDefault();
        if (password) {
            props.onRegister(name, email, password);
        }
      };
    React.useEffect(() => {
        validateForm("register");
      }, []);
    return (
      <div className="register">
        <div className="register__container">
            <Link to="/" className="header__link">
                <img className="header__logo" alt="Логотип" src={Logo}/>
            </Link>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form onSubmit={handleSubmit} className='register__form'>
                <p className='register__field'>Имя</p>
                <div className='register__auth-container'>
                    <input type="text" className="register__input" minLength="2" maxLength="30" required id='name' placeholder="Введите Ваше имя" onChange={handleChangeName}></input>
                    <span className='register__error error__name'>Некорректное имя</span>
                </div>
                <p className='register__field'>E-mail</p>
                <div className='register__auth-container'>
                    <input type="email" className="register__input" minLength="2" maxLength="30" required id='email' placeholder="Введите адрес электронной почты" onChange={handleChangeMail}></input>
                    <span className='register__error error__email'>Некорректный адрес электронной почты</span>
                </div>
                <p className='register__field'>Пароль</p>
                <div className='register__auth-container'>
                    <input id="password" type="password" minLength="2" maxLength="30" className="register__input" required placeholder="Введите пароль" onChange={handleChangePassword}></input>
                    <span className='register__error error__password'>Некорректный пароль</span>
                </div>
                <p className="register__submit-error">{props.error}</p>
                <button type="submit" className='register__button'>Зарегистрироваться</button>
                <p className='register__text'>Уже зарегистрированы?<Link className="register__text register__text_link" to="/signin">Войти</Link></p>
            </form>
            </div>
        </div>
    );
  }
  
  export default Register;