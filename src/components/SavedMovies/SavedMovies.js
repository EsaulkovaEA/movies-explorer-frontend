import { validateForm } from "../../utils/FormValidator";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CardsContext } from "../../contexts/CardsContext";
import { auth } from "../../utils/MainApi";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies(props) {
  const [cards, setCards] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [cardList, setCardList] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [isActive, setActive] = React.useState("none");
  const width = window.screen.availWidth;
  const cardContainer = width > 1250 ? 12 : width > 767 ? 16 : 5;
  const visible = React.useRef(cardContainer);
  const shorts = React.useRef(false);
  const currentUser = React.useContext(CurrentUserContext);

  function renderCards() {
    return (
      searchText && cardList.filter((item) => item.nameRU.toLowerCase().includes(searchText))
    );
  }
  function renderShortFilms() {
    return renderCards() && renderCards().filter((item) => item.duration <= 40);
  }
  function toggleCheckbox() {
    const checkbox = document.querySelector(".form__check");
    if (shorts.current) {
      checkbox.classList.remove("check_inactive");
      checkbox.classList.add("check_active");
    } else {
      checkbox.classList.remove("check_inactive");
      checkbox.classList.add("check_active");
    }
    if (shorts.current) {
      localStorage.setItem("savedcheckbox", "true");
      if (localStorage.getItem("savedcards")) {
        const shortList = JSON.parse(localStorage.getItem("savedcards")).filter(
          (item) => item.duration <= 40
        );
        setCards(shortList);
        setAmount(shortList.length);
      }
    } else {
      localStorage.setItem("savedcheckbox", "");
      if (localStorage.getItem("savedcards")) {
        const longList = JSON.parse(localStorage.getItem("savedcards"));
        setCards(
          longList.length > visible.current
            ? longList.slice(0, visible.current)
            : longList
        );
        setAmount(longList.length);
      }
    }
  }
  function onShorts() {
    visible.current = cardContainer;
    shorts.current = !shorts.current;
    shorts.current ? submitCards(cards.filter((item) => item.duration <= 40)) : submitCards(JSON.parse(localStorage.getItem("savedcards")));
    toggleCheckbox();
  }
  function handleChangeFilm(evt) {
    setSearchText(evt.target.value.toLowerCase());
    visible.current = cardContainer;
  }
  function submitCards(cards) {
    if (cards) {
      setCards(cards);
    }
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    setActive("flex");
    const newCards = !shorts.current ? renderCards() : renderShortFilms();
    setAmount(newCards.length);
    newCards && localStorage.setItem("savedcards", JSON.stringify(cards));
    newCards && localStorage.setItem("savedamount", `${cards.length}`);
    submitCards(newCards);
    setActive("none");
  }

  React.useEffect(() => {
    validateForm("form");
    setActive("flex");
    auth
      .getSavedCards()
      .then((data) => {
        const initialSavedCards = data.filter(
          (item) => item.owner === currentUser._id
        );
        setCardList(initialSavedCards);
        setCards(initialSavedCards);
        localStorage.setItem('savedcards', JSON.stringify(initialSavedCards));
        setAmount(initialSavedCards.length);
        setActive("none");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    setActive("flex");
    localStorage.getItem("savedamount")
      ? setAmount(parseInt(localStorage.getItem("savedamount")))
      : setAmount(0);
    localStorage.getItem("savedcards") && setCards(JSON.parse(localStorage.getItem("savedcards")));
    if (localStorage.getItem("savedcheckbox")) {
      const checkbox = document.querySelector(".form__check");
      shorts.current = true;
      checkbox.setAttribute("checked", true);
      toggleCheckbox();
      setActive("none");
    }
  }, []);
  return (
    <CardsContext.Provider value={cards}>
      <div className="movies">
        <SearchForm
          handleSubmit={handleSubmit}
          handleChangeFilm={handleChangeFilm}
          onShorts={onShorts}
        />
        <Preloader isActive={isActive} />
        <MoviesCardList
          class="cards cards_saved"
          amount={amount}
          saveCard={props.saveCard}
          deleteCard={props.deleteCard}
          submitCards={submitCards}
          cardList={props.cards}
        />
        {!amount && searchText && !cardList && (
          <p className="cards__error">Ничего не найдено</p>
        )}
      </div>
    </CardsContext.Provider>
  );
}

export default SavedMovies;
