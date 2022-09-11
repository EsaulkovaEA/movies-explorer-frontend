function Footer() {
    return (
      <footer className="footer">
        <div className="footer__container">
            <p className="footer__authors">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
                <p className="footer__copyright">&copy;&nbsp;2022</p>
                <nav className="footer__menu">
                    <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com/EsaulkovaEA" target="_blank">Github</a>
                </nav>
            </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;