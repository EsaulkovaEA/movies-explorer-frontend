import {userData} from '../../utils/constants';
import React from 'react';
import {Link} from 'react-router-dom';

function Profile(props) {
    const [name, setName] = React.useState(userData.name);
    const [email, setEmail] = React.useState(userData.email);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeMail(evt) {
        setEmail(evt.target.value);
    }
    return (
      <form className="profile">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <ul className='profile__list'>
            <li className="profile__field">
                <p className='profile__subtitle'>Имя</p>
                <input type="text" defaultValue={name} className="profile__input" onChange={handleChangeName}/>
            </li>
            <li className="profile__field">
                <p className='profile__subtitle'>E-mail</p>
                <input type="email" defaultValue={email} className="profile__input" onChange={handleChangeMail}/>
            </li>
        </ul>
        <div className='profile__footer'>
            <button className='profile__submit'>Редактировать</button>
            <Link to="/" className='profile__quit' onClick={props.quit}>Выйти из аккаунта</Link>
        </div>
      </form>
    );
  }
  
  export default Profile;