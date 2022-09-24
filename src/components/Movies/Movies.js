import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
    return (
      <div className="movies">
        <SearchForm/>
        <MoviesCardList isSaved={props.isSaved} toggleSave={props.toggleSave} class="cards"/>
      </div>
    );
  }
  
  export default Movies;