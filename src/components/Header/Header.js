import NavTab from '../NavTab/NavTab';
import Logo from '../../images/logo.png';
import logoAuth from '../../images/logoauth.png';
import {Link} from 'react-router-dom';

function Header(props) {
    return (
    <header className={!props.isPromo ? "header header_auth" : "header"}>
        <div className={!props.isPromo ? "header__container header__container_auth" : "header__container"}>
            <Link to="/" className="header__link">
                <img className={props.isLogged ? "header__logo" : "header__logo header__logo_auth"} alt="Логотип" src={props.isLogged ? logoAuth : Logo}/>
            </Link>
            <nav className={!props.isPromo ? "header__menu" : props.isLogged ? "header__menu header__menu_auth" : "header__menu header__menu_inactive"}>
                <NavTab isLogged={props.isLogged} burgerToggle={props.burgerToggle} isOpen={props.isOpen} handleLogin={props.handleLogin} isPromo={props.isPromo}/>
            </nav>
        </div>
    </header>
)};

export default Header;