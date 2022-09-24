import Burger from '../Burger/Burger';
import Navigation from '../Navigation/Navigation';
import {Link, Switch, Route} from 'react-router-dom';

function NavTab(props) {
    return (
      <div className="navtab">
        <Switch>
          <Route exact path="/">
            <div className='navtab__container'>
              <nav className={props.isLogged ? "navtab__menu navtab__menu_inactive" : "navtab__menu"}>
                <Link to="/signup" className='navtab__register'>Регистрация</Link>
                <Link to="/signin" className='navtab__login'>Войти</Link>
              </nav>
              <nav className={props.isLogged ? "navtab__menu navtab__menu_promo" : "navtab__menu navtab__menu_inactive"}>
                <Link to="/movies" className='navtab__item'>Фильмы</Link>
                <Link to="/saved-movies" className='navtab__item'>Сохранённые фильмы</Link>
              </nav>
              <Link to="/profile" className={props.isLogged ? "header__account_promo" : "header__account header__account_inactive"}>{props.userName}</Link>
            </div>
            {props.isLogged &&
            <Burger burgerToggle={props.burgerToggle} isOpen={props.isOpen} isPromo={props.isPromo} userName={props.userName}/>}
          </Route>
          <Route exact path="/movies">
            <Navigation userName={props.userName}/>
            <Burger burgerToggle={props.burgerToggle} isOpen={props.isOpen} userName={props.userName}/>
          </Route>
          <Route exact path="/saved-movies">
          <Navigation userName={props.userName}/>
            <Burger burgerToggle={props.burgerToggle} isOpen={props.isOpen} userName={props.userName}/>
          </Route>
          <Route exact path="/profile">
          <Navigation userName={props.userName}/>
            <Burger burgerToggle={props.burgerToggle} isOpen={props.isOpen} userName={props.userName}/>
          </Route>
        </Switch>
      </div>
    );
  }
  
  export default NavTab;
  