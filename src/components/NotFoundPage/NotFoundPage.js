import {Link} from 'react-router-dom';

function NotFoundPage() {
    return (
      <div className="not-found">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__text">Страница не найдена</p>
        <Link to="/" className='not-found__link'>Назад</Link>
      </div>
    );
  }
  
  export default NotFoundPage;