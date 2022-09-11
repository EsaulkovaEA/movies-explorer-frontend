function AboutProject() {
  return (
    <section className="project">
      <div className="project__container">
        <h2 className="title">О проекте</h2>
        <div className="project__description">
            <div className="project__column">
                <p className="project__subtitle">Дипломный проект включал 5 этапов</p>
                <p className="text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="project__column">
                <p className="project__subtitle">На выполнение диплома ушло 5 недель</p>
                <p className="text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className="project__time">
            <p className="project__weeks project__weeks_backend">1 неделя</p>
            <p className="project__weeks project__weeks_frontend">4 недели</p>
            <p className="project__caption">Back-end</p>
            <p className="project__caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
