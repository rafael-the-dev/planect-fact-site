import { Link } from 'react-router-dom';
import './styles.css';

const HeaderLink = ({ paramName, text, customClass }) => {
    return (
        <Link to={`/planets/${paramName}`} className={`uppercase decoration-none font-weight-7 text-white 
        flex align-center header__link ${customClass}`} >{ text }</Link>
    );
};

export default HeaderLink;