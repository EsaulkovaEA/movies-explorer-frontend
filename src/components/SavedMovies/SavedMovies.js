import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
    return (
      <div className="movies">
        <SearchForm/>
        <MoviesCardList isSaved={props.isSaved} toggleSave={props.toggleSave} class="cards saved-cards"/>
      </div>
    );
  }
  
  export default SavedMovies;