import { validateForm } from "../../utils/FormValidator";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CardsContext } from "../../contexts/CardsContext";
import { moviesApi } from "../../utils/MoviesApi";
import React from "react";

function Movies(props) {
  const [cards, setCards] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [cardList, setCardList] = React.useState("");
  const [amount, setAmount] = React.useState(1);
  const [isActive, setActive] = React.useState("none");
  const [submitted, setSubmitted] = React.useState(false);
  const width = window.screen.availWidth;
  const cardContainer = width > 1250 ? 12 : width > 767 ? 16 : 5;
  const visible = React.useRef(cardContainer);
  const shorts = React.useRef(false);

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
      localStorage.setItem("checkbox", "true");
      if (localStorage.getItem("cards")) {
        const shortList = JSON.parse(localStorage.getItem("cards")).filter(
          (item) => item.duration <= 40
        );
        setCards(shortList);
        setAmount(shortList.length);
      }
    } else {
      localStorage.setItem("checkbox", "");
      if (localStorage.getItem("cards")) {
        const longList = JSON.parse(localStorage.getItem("cards"));
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
    shorts.current ? submitCards(cards.filter((item) => item.duration <= 40)) : submitCards(JSON.parse(localStorage.getItem("cards")));
    toggleCheckbox();
  }
  function handleChangeFilm(evt) {
    setSearchText(evt.target.value.toLowerCase());
    visible.current = cardContainer;
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    setSubmitted(true);
    setActive("flex");
    const newCards = !shorts.current ? renderCards() : renderShortFilms();
    setAmount(newCards.length);
    if (newCards) {
      localStorage.setItem("cards", JSON.stringify(newCards));
      localStorage.setItem("amount", `${newCards.length}`);
      setCards(newCards.length > visible.current ? newCards.slice(0, visible.current) : newCards);
    }
    setActive("none");
  }

  function handleSetVisible() {
    const newCards = !shorts.current
      ? JSON.parse(localStorage.getItem("cards"))
      : JSON.parse(localStorage.getItem("cards")).filter(
          (item) => item.duration <= 40
        );
    visible.current += width > 1250 ? 3 : 2;
    setCards(
      newCards.length > visible.current
        ? newCards.slice(0, visible.current)
        : newCards
    );
  }

  function submitCards(cards) {
    if (cards) {
      setCards(cards);
    }
  }

  React.useEffect(() => {
    validateForm("form");
    setActive("flex");
    setSubmitted(false);
    moviesApi
      .getInitialCards()
      .then((data) => {
        setCardList(data);
        setActive("none");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    setActive("flex");
    localStorage.getItem("amount")
      ? setAmount(parseInt(localStorage.getItem("amount")))
      : setAmount(0);
    localStorage.getItem("cards") &&
      setCards(
        JSON.parse(localStorage.getItem("cards")).length > visible.current
          ? JSON.parse(localStorage.getItem("cards")).slice(0, visible.current)
          : JSON.parse(localStorage.getItem("cards"))
      );
    if (localStorage.getItem("checkbox")) {
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
          class="cards"
          amount={amount}
          saveCard={props.saveCard}
          deleteCard={props.deleteCard}
        />
        {amount >= cardContainer && amount > visible.current && (
          <div className="cards__also">
            <button
              type="button"
              className="cards__other"
              onClick={handleSetVisible}
            >
              Ещё
            </button>
          </div>
        )}
        {!amount && searchText && submitted && (
          <p className="cards__error">Ничего не найдено</p>
        )}
      </div>
    </CardsContext.Provider>
  );
}

export default Movies;
