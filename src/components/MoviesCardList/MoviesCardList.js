import {films, savedFilms} from "../../utils/constants";
import MoviesCard from "../../components/MoviesCard/MoviesCard";

function MoviesCardList(props) {
    let list;
    if (props.class === "cards") {
        list = films;
    } else {
        list = savedFilms;
    }
    return (
        <>
            <ul className={props.class}>
                {list.map((item, _id) => (
                <div className="card__container" key={_id}>
                    <MoviesCard
                    name={item.name}
                    url={item.url}
                    time={item.time}
                    isSaved={props.isSaved}
                    toggleSave={props.toggleSave}
                    class={props.class}
                    />
                </div>
                ))}
            </ul>
            {props.class === "cards" && 
            <div className="cards__also">
                <button className="cards__other">Ещё</button>
            </div>}
            
        </>
    );
  }
  
  export default MoviesCardList;