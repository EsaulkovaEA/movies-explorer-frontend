import React from 'react';
import { validateForm } from '../../utils/FormValidator';
import {Link} from 'react-router-dom';

function Profile(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeMail(evt) {
        setEmail(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        props.editProfile({name, email});
    }

    React.useEffect(() => {
        validateForm("profile")
    }, []);

    return (
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${props.name}!`}</h2>
        <ul className='profile__list'>
            <li className="profile__field">
                <p className='profile__subtitle'>Имя</p>
                <div className='profile__auth-container'>
                    <input type="text" defaultValue={props.name} className="profile__input" onChange={handleChangeName} id="name" minLength="2" maxLength="30" required/>
                    <span className='profile__error error__name'>Некорректное имя</span>
                </div>
            </li>
            <li className="profile__field">
                <p className='profile__subtitle'>E-mail</p>
                <div className='profile__auth-container'>
                    <input type="email" defaultValue={props.email} className="profile__input" onChange={handleChangeMail} id="email" minLength="2" maxLength="30" required
                    pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"/>
                    <span className='profile__error error__email'>Некорректный адрес электронной почты</span>
                </div>
            </li>
        </ul>
        <div className='profile__footer'>
            <p className="profile__submit-message">{props.success}</p>
            <p className="register__submit-error">{props.error}</p>
            <button type="submit" className='profile__button'>Редактировать</button>
            <Link to="/" className='profile__quit' onClick={props.quit}>Выйти из аккаунта</Link>
        </div>
      </form>
    );
  }
  
  export default Profile;