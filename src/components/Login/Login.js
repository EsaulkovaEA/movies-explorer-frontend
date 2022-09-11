import {userData} from '../../utils/constants';
import Logo from '../../images/logo.png';
import {Link} from 'react-router-dom';

function Login(props) {
    return (
      <div className="register">
        <div className="register__container">
            <Link to="/" className="header__link">
                <img className="header__logo" alt="Логотип" src={Logo}/>
            </Link>
            <h2 className='register__title'>Рады видеть!</h2>
            <form onSubmit={props.onLogin} className='register__form'>
                <p className='register__field'>E-mail</p>
                <div className='register__auth-container'>
                    <input type="email" defaultValue={userData.email} className="register__input" minLength="2" maxLength="30" required></input>
                    <span className='register__error'>Что-то пошло не так...</span>
                </div>
                <p className='register__field'>Пароль</p>
                <div className='register__auth-container'>
                    <input id="password" type="password" minLength="2" maxLength="30" className="register__input" required></input>
                    <span className='register__error'>Что-то пошло не так...</span>
                </div>
                <button type="submit" className='login__submit'>Войти</button>
                <p className='register__text'>Ещё не зарегистрированы?<Link className="register__text register__text_link" to="/signup">Регистрация</Link></p>
            </form>
            </div>
        </div>
    );
  }
  
  export default Login;