import React from 'react';
import { auth } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {
  const [isSaved, setSaved] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  function makeSavedCard() {
    setSaved(true);
    props.saveCard(props.card);
  }
  function makeNotSavedCard() {
    setSaved(false);
    props.submitCards(props.cardList.filter((item) => (item.owner === currentUser._id) && (item._id !== props.card._id)));
    localStorage.setItem("savedcards", JSON.stringify(props.cardList.filter((item) => (item.owner === currentUser._id) && (item._id !== props.card._id))));
    props.deleteCard(props.card);
  }
  React.useEffect(() => {
    auth.getSavedCards().then((res) => {
      const revise = res.filter((item) => (item.nameRU === props.card.nameRU) && (item.owner === currentUser._id));
      revise.length ? setSaved(true) : setSaved(false);
    }).catch((err) => {console.log(err)});
  }, [props.card]);
    return (
      <li className="card">
        <div className={`card__header`}>
            <h2 className="card__title">{props.name}</h2>
            <p className="card__time">{props.time}</p>
        </div>
        <a href={props.trailer} target="_blank">
          <img className="card__image" src={props.url} alt={props.name}/>
        </a>
        {props.class === "cards" ?
          <button type="button" className={!isSaved ? "card__button" : "card__button card__button_saved"} onClick={makeSavedCard} disabled={isSaved}>{!isSaved && "Сохранить"}</button> :
          <button type="button" className="card__button card__button_close" onClick={makeNotSavedCard}></button>
        }
      </li>
    );
  }
  
  export default MoviesCard;