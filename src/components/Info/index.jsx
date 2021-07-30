import './styles.css';

const Info = ({ label, value }) => {
    return (
        <div className="align-center align-start-sm flex flex-column-sm justify-between text-white py-1 px-5 w-100 info">
            <span className="opacity-7 uppercase info__title">{ label }</span>
            <span className="uppercase info__description">{ value }</span>
        </div>
    );
};

export default Info;