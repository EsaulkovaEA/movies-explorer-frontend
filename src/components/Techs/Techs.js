function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="title">Технологии</h2>
        <div className="techs__description">
            <h3 className="description">7 технологий</h3>
            <p className="text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className="techs__stack">
            <li className="techs__item">HTML</li>
            <li className="techs__item">CSS</li>
            <li className="techs__item">JS</li>
            <li className="techs__item">React</li>
            <li className="techs__item">Git</li>
            <li className="techs__item">Express.js</li>
            <li className="techs__item">MongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
