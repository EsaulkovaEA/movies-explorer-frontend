import {Link, Switch, Route} from 'react-router-dom';

function Navigation() {
    return (
        <div className='navtab__container'>
        <nav className="navtab__menu navtab__menu_active">
            <Switch>
                <Route exact path="/movies">
                    <Link to="/movies" className='navtab__item navtab__item_active'>Фильмы</Link>
                    <Link to="/saved-movies" className='navtab__item'>Сохранённые фильмы</Link>
                </Route>
                <Route exact path="/saved-movies">
                    <Link to="/movies" className='navtab__item'>Фильмы</Link>
                    <Link to="/saved-movies" className='navtab__item navtab__item_active'>Сохранённые фильмы</Link>
                </Route>
                <Route exact path="/profile">
                    <Link to="/movies" className='navtab__item'>Фильмы</Link>
                    <Link to="/saved-movies" className='navtab__item'>Сохранённые фильмы</Link>
                </Route>
            </Switch>
        </nav>
        <Link to="/profile" className="header__account">
            <p className='header__text'>Аккаунт</p>
            <div className='header__account-icon'></div>
          </Link>
        </div>
    );
  }
  
  export default Navigation;