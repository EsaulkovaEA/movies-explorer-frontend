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
import {Route, Switch, useHistory, withRouter, useLocation, Redirect} from 'react-router-dom';
import { auth } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isLogged, setLogged] = React.useState(false);
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [userName, setUserName] = React.useState('Аккаунт');
  const [currentUser, setCurrentUser] = React.useState({});
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const history = useHistory();
  const location = useLocation();

  function handleRegister(name, email, password) {
      auth
      .register(name, email, password)
      .then((res) => {
        setLogged(true);
        setUserName(res.name);
        handleLogin(email, password);
      }).catch((err) => {
        if (err === "Ошибка: 409") {
          setError('Пользователь с таким email уже существует'); 
          setTimeout(()=> {setError('')}, 5000);
        } else {
          setError('При регистрации пользователя произошла ошибка');
          setTimeout(()=>{setError('')}, 5000);
      }});
  }

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth.getContent(jwt).then((res) => {
        if (res){
          setLogged(true);
          history.push(location.pathname);
          setUserName(res.name);
        };
      }).catch(err => {console.log(err)})
    };
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        setLogged(true);
        localStorage.setItem('jwt', res.token);
        auth.getContent(localStorage.getItem('jwt')).then((data) => {
          history.push("/movies");
          setCurrentUser(data);
          setUserName(data.name);
        })
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          setError("Вы ввели неправильный логин или пароль");
          setTimeout(()=>{setError('')}, 5000);
        } else {
          setError('При авторизации пользователя произошла ошибка');
          setTimeout(()=>{setError('')}, 5000);
      }});
  }

  function handleQuit() {
    setCurrentUser({});
    setLogged(false);
    setUserName('Аккаунт');
    localStorage.clear();
  }
  
  function handleBurgerToggle() {
    const page = document.querySelector('.page');
    setBurgerOpen(!isBurgerOpen);
    isBurgerOpen ? page.style.overflow = 'scroll' : page.style.overflow = 'hidden';
  }

  function handleEditProfile(obj) {
    auth
      .editProfile(obj)
      .then((res) => {
        setCurrentUser(res);
        setUserName(res.name);
        setSuccess("Данные профиля успешно обновлены");
        setTimeout(()=>{setSuccess('')}, 5000);
      })
      .catch((err) => {
        if (err === "Ошибка: 409")  {
          setError('Пользователь с таким email уже существует');
          setTimeout(()=>{setError('')}, 5000);
         } else {
          setError('При обновлении профиля произошла ошибка');
          setTimeout(()=>{setError('')}, 5000);
      }});
  }

  function saveCard(card) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .saveMovie(card, jwt)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          card.owner = currentUser._id;
        })
        .catch((err) => console.log(err));
    }
  }

  function deleteCard(card) {
    const jwt = localStorage.getItem('jwt');
    const deletedCard = location.pathname === "/movies" ? cards.filter((item) => item.movieId === card.id)[0] : card;
    if (jwt) {
      auth
        .deleteCard(deletedCard._id)
        .then(() => {
          setCards(cards.filter((data) => data._id !== deletedCard._id));
          localStorage.setItem("savedcards", JSON.stringify(cards.filter((item) => (item.owner === currentUser._id) && (item._id !== card._id))));
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    setError('');
    const jwt = localStorage.getItem('jwt');
    
    if (jwt){
    auth
      .getInitialProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    auth
      .getSavedCards()
      .then((data) => {
        setCards(data);
      }).catch((err) => {console.log(err)});
      tokenCheck();
  }}, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
      <Switch>
        <Route exact path="/">
          <Header isLogged={isLogged} isPromo={true} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin} userName={userName}/>
          <Main/>
          <Footer/>
        </Route>
        <ProtectedRoute isLogged={isLogged} exact path="/movies">
          <Header isLogged={isLogged} isPromo={false} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin} userName={userName}/>
          <Movies saveCard={saveCard} deleteCard={deleteCard} cards={cards} setCards={setCards}/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute isLogged={isLogged} exact path="/saved-movies">
          <Header isLogged={isLogged} isPromo={false} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin} userName={userName}/>
          <SavedMovies saveCard={saveCard} deleteCard={deleteCard} cards={cards}/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute isLogged={isLogged} exact path="/profile">
          <Header isLogged={isLogged} isPromo={false} burgerToggle={handleBurgerToggle} isOpen={isBurgerOpen} handleLogin={handleLogin} userName={userName}/>
          <Profile quit={handleQuit} editProfile={handleEditProfile} name={userName} email={currentUser.email} error={error} success={success}/>
          <Footer/>
        </ProtectedRoute>
        <Route exact path="/signup">
        {isLogged ? (<Redirect to="/movies"/>) :
          (<Register onRegister={handleRegister} error={error}/>)}
        </Route>
        <Route exact path="/signin">
        {isLogged ? (<Redirect to="/movies"/>) :
          (<Login onLogin={handleLogin} error={error}/>)}
        </Route>
        <Route path="*">
            <NotFoundPage/>
        </Route>
      </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
