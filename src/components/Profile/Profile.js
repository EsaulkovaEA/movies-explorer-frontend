import React from 'react';
import { validateForm } from '../../utils/FormValidator';
import {Link} from 'react-router-dom';

function Profile(props) {
    const [name, setName] = React.useState(props.name);
    const [email, setEmail] = React.useState(props.email);
    const [isDisabled, setDisabled] = React.useState(true);
    const [error, setError] = React.useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeMail(evt) {
        setEmail(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        if (email && name && ((name !== props.name) || (email !== props.email))) {
            setDisabled(false);
            props.editProfile({name, email});
        } else if (email && name && (name === props.name) && (email === props.email)) {
            setDisabled(true);
            setError("Вы не внесли изменений в Ваш профиль");
            setTimeout(() => {setError('')}, 5000);
        }
        setName(props.name);
        setEmail(props.email);
        setDisabled(true);
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
            <p className="register__submit-error">{error ? error : props.error}</p>
            <button type="submit" className={!isDisabled ? "profile__button" : "profile__button profile__button_inactive"} disabled={isDisabled}>Редактировать</button>
            <Link to="/" className='profile__quit' onClick={props.quit}>Выйти из аккаунта</Link>
        </div>
      </form>
    );
  }
  
  export default Profile;