import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

function App() {
  const [isLogged, setLogged] = React.useState(false);
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const [isSaved, setSaved] = React.useState(false);

  const history = useHistory();

  function handleLogin() {
    setLogged(true);
    history.push("/");
  }

  function handleRegister() {
    history.push("/signin")
  }

  function handleQuit() {
    setLogged(false);
  }
  
  function handleBurgerToggle() {
    const page = document.querySelector('.page');
    setBurgerOpen(!isBurgerOpen);
    isBurgerOpen ? page.style.overflow = 'scroll' : page.style.overflow = 'hidden';
  }

  function handleToggleSave() {
    setSaved(!isSaved);
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header isLogged={isLogged} isPromo={true} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin}/>
          <Main/>
          <Footer/>
        </Route>
        <Route exact path="/movies">
          <Header isLogged={isLogged} isPromo={false} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin}/>
          <Movies isSaved={isSaved} toggleSave={handleToggleSave}/>
          <Footer/>
        </Route>
        <Route exact path="/saved-movies">
          <Header isLogged={isLogged} isPromo={false} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin}/>
          <SavedMovies isSaved={isSaved} toggleSave={handleToggleSave}/>
          <Footer/>
        </Route>
        <Route exact path="/profile">
          <Header isLogged={isLogged} isPromo={false} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin}/>
          <Profile quit={handleQuit}/>
          <Footer/>
        </Route>
        <Route exact path="/signup">
          <Register onRegister={handleRegister}/>
        </Route>
        <Route exact path="/signin">
          <Login onLogin={handleLogin}/>
        </Route>
        <Route path="*">
            <NotFoundPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
