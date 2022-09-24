import Avatar from '../../images/avatar.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
      <section className="me">
        <div className="me__container">
            <h2 className="title">Студент</h2>
            <div className='me__info'>
                <div className="me__about">
                    <h3 className="description">Екатерина</h3>
                    <p className="me__subtitle">Фронтенд-разработчик, 31 год</p>
                    <p className="me__text">Я&nbsp;родилась и&nbsp;живу в&nbsp;Свердловской области, закончила Уральский государственный экономический университет по&nbsp;специальности &laquo;Математическое обеспечение и&nbsp;администрирование информационных систем&raquo;. С&nbsp;2018 года являюсь администратором сайта, а&nbsp;с&nbsp;2021 года начала углубляться в&nbsp;веб-разработку.</p>
                    <a className="me__github" href="https://github.com/EsaulkovaEA" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="me__avatar" src={Avatar} alt="Аватар студента"/>
            </div>
            <Portfolio/>
        </div>
      </section>
    );
  }
  
  export default AboutMe;