import { moviesApi } from "../../utils/MoviesApi";
import { CardsContext } from "../../contexts/CardsContext";
import MoviesCard from "../../components/MoviesCard/MoviesCard";
import React from "react";

function MoviesCardList(props) {
    const cardsContext = React.useContext(CardsContext);
    return (
                <ul className={props.class}>
                {cardsContext.map((item, _id) => (
                    <div className="card__container" key={_id}>
                        <MoviesCard
                        name={item.nameRU}
                        url={props.class === 'cards' ? `${moviesApi._baseUrl}${item.image.url}` : `${item.image}`}
                        time={`${Math.floor(item.duration / 60) ? `${Math.floor(item.duration / 60)} ч` : ''} ${item.duration % 60 ? `${item.duration % 60} мин`: ''}`}
                        saveCard={props.saveCard}
                        deleteCard={props.deleteCard}
                        trailer={item.trailerLink}
                        class={props.class}
                        card={item}
                        cardList={props.cardList}
                        submitCards={props.submitCards}/>
                    </div>
                ))}
            </ul>          
    );
  }
  
  export default MoviesCardList;