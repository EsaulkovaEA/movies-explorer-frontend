function SearchForm() {
    return (
      <form className="form">
        <div className="form__container">
            <div className="form__search">
                <div className="form__icon"></div>
                <input className="form__input" placeholder="Фильм"/>
                <button className="form__button"/>
            </div>
            <div className="form__select">
                <input className="form__check" type="checkbox" id="check"/>
                <label className="form__text" htmlFor="check">Короткометражки</label>
            </div>
        </div>
      </form>
    );
  }
  
  export default SearchForm;