function MoviesCard(props) {
    return (
      <li className="card">
        <div className="card__header">
            <h2 className="card__title">{props.name}</h2>
            <p className="card__time">{props.time}</p>
        </div>
        <img className="card__image" src={props.url} alt={props.name}/>
        {props.class === "cards" ?
          <button className={!props.isSaved ? "card__button" : "card__button card__button_saved"} onClick={props.toggleSave}>{!props.isSaved && "Сохранить"}</button> :
          <button className="card__button card__button_close" onClick={props.deleteCard}></button>
        }
        {/* <button className={!props.isSaved ? "card__button" : "card__button card__button_saved"} onClick={props.toggleSave}>{!props.isSaved && "Сохранить"}</button> */}
      </li>
    );
  }
  
  export default MoviesCard;