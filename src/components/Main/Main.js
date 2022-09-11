import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  return (
    <div className="main">
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
    </div>
  );
}

export default Main;