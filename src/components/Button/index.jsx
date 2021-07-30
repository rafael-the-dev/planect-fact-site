import './styles.css';

const Button = ({ customClass, label, clickHandler }) => {
    return (
        <button 
            className={`uppercase outline-none border-none decoration-none bg-transparent text-white 
            opacity-8 button ${customClass}`} 
            onClick={clickHandler}>
            { label }
        </button>
    );
};

export default Button;