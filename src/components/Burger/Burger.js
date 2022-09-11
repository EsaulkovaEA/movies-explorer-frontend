import {Link, Switch, Route} from 'react-router-dom';

function Burger(props) {
    return (
      <div className={props.isPromo ? "burger burger_white" : "burger"} onClick={props.burgerToggle}>
        <div className={!props.isOpen ? "burger__container" : "burger__container burger__container_active"}>
            <div className='burger__overlay' onClick={props.burgerToggle}></div>
            <div className="burger__content">
                <nav className="burger__menu">
                    <Switch>
                        <Route exact path="/">
                            <Link to="/" className='burger__link burger__link_active'>Главная</Link>
                            <Link to="/movies" className='burger__link'>Фильмы</Link>
                            <Link to="/saved-movies" className='burger__link'>Сохранённые фильмы</Link>
                        </Route>
                        <Route exact path="/movies">
                            <Link to="/" className='burger__link'>Главная</Link>
                            <Link to="/movies" className='burger__link burger__link_active'>Фильмы</Link>
                            <Link to="/saved-movies" className='burger__link'>Сохранённые фильмы</Link>
                        </Route>
                        <Route exact path="/saved-movies">
                            <Link to="/" className='burger__link'>Главная</Link>
                            <Link to="/movies" className='burger__link'>Фильмы</Link>
                            <Link to="/saved-movies" className='burger__link burger__link_active'>Сохранённые фильмы</Link>
                        </Route>
                        <Route exact path="/profile">
                            <Link to="/" className='burger__link'>Главная</Link>
                            <Link to="/movies" className='burger__link'>Фильмы</Link>
                            <Link to="/saved-movies" className='burger__link'>Сохранённые фильмы</Link>
                        </Route>
                    </Switch>
                </nav>
                <div className="burger__account">
                    <Link to="/profile" className='burger__text'>Аккаунт</Link>
                    <div className='burger__account-icon'></div>
                </div>
                <button className='burger__close' onClick={props.burgerToggle}></button>
            </div>
        </div>
      </div>
    );
  }
  
  export default Burger;