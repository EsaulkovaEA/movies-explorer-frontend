import React from 'react';

function SearchForm(props) {
    return (
        <form className="form" onSubmit={props.handleSubmit}>
          <div className="form__container">
              <div className="form__form">
                  <div className="form__icon"></div>
                  <div className="form__input-container">
                    <input className="form__input" placeholder="Фильм" onChange={props.handleChangeFilm} required id="film" />
                    <span className='form__error error__film'>Нужно ввести ключевое слово</span>
                  </div>
                  <button type="submit" className="form__button"/>
              </div>
              <div className="form__select">
                  <input className="form__check check_inactive" type="checkbox" id="check"/>
                  <label className="form__text" htmlFor="check" onClick={props.onShorts}>Короткометражки</label>
              </div>
          </div>
        </form>
    );
  }
  
  export default SearchForm;