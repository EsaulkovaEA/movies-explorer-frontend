function Portfolio() {
    return (
      <div className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
            <li className="portfolio__item">
                <p className="portfolio__text">Статичный сайт</p>
                <a className="portfolio__link" href="https://esaulkovaea.github.io/how-to-learn/" target="_blank">↗</a>
            </li>
            <li className="portfolio__item">
                <p className="portfolio__text">Адаптивный сайт</p>
                <a className="portfolio__link" href="https://esaulkovaea.github.io/russian-travel/" target="_blank">↗</a>
            </li>
            <li className="portfolio__item">
                <p className="portfolio__text">Одностраничное приложение</p>
                <a className="portfolio__link" href="https://esaulkovaea.nomoredomains.xyz/" target="_blank">↗</a>
            </li>
        </ul>
      </div>
    );
  }
  
  export default Portfolio;