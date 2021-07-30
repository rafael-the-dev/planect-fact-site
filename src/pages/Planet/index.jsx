import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Button from "../../components/Button";
import HeaderLink from "../../components/HeaderLink";
import Info from "../../components/Info";
import data from '../../data.json';
import './styles.css';

const Planet = () => {
    const { id } = useParams();
    const history = useHistory();

    const [ planet, setPlanet ] = useState({});
    const [ highlight, setHighlight ] = useState({});
    const [ currentActiveButton, setCurrentActiveButton ] = useState(null);

    const planetImage = useRef(null);
    const geologyImage = useRef(null);
    const mainRef = useRef(null);
    const contentDivision = useRef(null);
    const navigationRef = useRef(null);
    const buttonsContainer = useRef(null);

    const menuButtonClickHandler = event => {
        navigationRef.current.classList.toggle('header__navigation--mobile');
        mainRef.current.classList.toggle('menu-opened');
        event.target.classList.toggle('opacity-5');
    }

    const toggleDiv = width => {
        if(width >= 610) {
            if(!contentDivision.current.contains(buttonsContainer.current)) {
                contentDivision.current.append(buttonsContainer.current);
                navigationRef.current.classList.remove('header__navigation--mobile');
                mainRef.current.classList.remove('menu-opened');
            }
        } else {
            if(contentDivision.current.contains(buttonsContainer.current))
                mainRef.current.prepend(buttonsContainer.current)
        }
    }

    const setImageSource = (ref, imageName) => {
        import( `../../assets/images/${imageName}`)
            .then(img => ref.current.src = img.default)
            .catch(console.log);
    }

    const changeButtonState = element => {
        currentActiveButton.classList.remove(`button--${planet.name.toLowerCase()}`);
        element.target.classList.add(`button--${planet.name.toLowerCase()}`);
        setCurrentActiveButton(c => element.target); 
    }

    const surfaceClickHandler = event => {
        changeButtonState(event);
        setHighlight(h => planet.geology);
        setImageSource(planetImage, planet.images.planet);
        planetImage.current.classList.remove('animation');
        geologyImage.current.classList.add('geology-image--display');
    }

    const structureClickHandler = event => {
        changeButtonState(event);
        setHighlight(h => planet.structure);
        setImageSource(planetImage, planet.images.internal);
        planetImage.current.classList.remove('animation');
        geologyImage.current.classList.remove('geology-image--display');
    }

    const overviewClickHandler = event => {
        changeButtonState(event);
        setHighlight(h => planet.overview);
        setImageSource(planetImage, planet.images.planet);
        planetImage.current.classList.add('animation');
        geologyImage.current.classList.remove('geology-image--display');
    }

    useEffect(() => {
        const result =  data.filter(item => item.name.toLowerCase() === id.toLowerCase());

        toggleDiv(window.innerWidth);
        window.addEventListener('resize', event => {
            toggleDiv(event.target.innerWidth);
        });

        if(result.length === 0) {
            history.push('./planets/earth');
        } else {
            setPlanet(p => result[0]);
            setHighlight(h => result[0].overview);
            const planetName = result[0].name.toLowerCase();
            setCurrentActiveButton(c => document.querySelector(`.button--${planetName}`));

            setImageSource(planetImage, result[0].images.planet);
            setImageSource(geologyImage, result[0].images.geology);

            planetImage.current.classList.add('animation');

            document.querySelectorAll('.header__link').forEach(item => {
                if(item.textContent.trim().toLowerCase() === planetName) {
                    item.classList.add(`link--${planetName}`)
                }
            })
        };
        
        return () => {
            const name = planet.name;
            const planetName = name ? name.toLowerCase() : '';

            document.querySelectorAll('.header__link').forEach(item => {
                item.classList.remove(`link--${planetName}`)
            });
            document.querySelectorAll('button').forEach(item => {
                item.classList.remove(`button--${planetName}`);
            });
        }

    }, [ id, history, planet ]);

    useEffect(() => {
        
    }, [ ]);

    return (
        <div className="background">
            <header className="align-center flex flex-column flex-row-md justify-between px-5 py-1 w-100 header">
                <div className="align-center flex justify-between justify-center-sm w-100 header__division">
                    <Link 
                        to='/planets/earth' 
                        className="uppercase text-white decoration-none font-weight-7 header__logo" >
                        The planets
                    </Link>
                    <button className="fas fa-bars text-white outline-none border-none 
                    bg-transparent d-none-sm header__menu-button" onClick={menuButtonClickHandler}></button>
                </div>
                <nav ref={navigationRef} className="d-none d-flex-sm absolute w-100 px-5 header__navigation">
                    <ul className="align-stretch flex flex-column flex-row-sm justify-between w-100 header__list">
                        <li className="header__item">
                            <HeaderLink text="Mercury" paramName="mercury" customClass="header__link--mercury" />
                        </li>
                        <li className="header__item">
                            <HeaderLink text="venus" paramName="venus" customClass="header__link--venus" />
                        </li>
                        <li className="header__item">
                            <HeaderLink text="earth" paramName="earth" customClass="header__link--earth" />
                        </li>
                        <li className="header__item">
                            <HeaderLink text="mars" paramName="mars" customClass="header__link--mars" />
                        </li>
                        <li className="header__item">
                            <HeaderLink text="jupiter" paramName="jupiter" customClass="header__link--jupiter" />
                        </li>
                        <li className="header__item">
                            <HeaderLink text="saturn" paramName="saturn" customClass="header__link--saturn" />
                        </li>
                        <li className="header__item">
                            <HeaderLink text="uranus" paramName="uranus" customClass="header__link--uranus" />
                        </li>
                        <li className="header__item">
                            <HeaderLink text="neptune" paramName="neptune" customClass="header__link--neptune" />
                        </li>
                    </ul>
                </nav>
            </header>
            <main ref={mainRef} className="w-100 bg-cover bg-center main">
                <div ref={buttonsContainer} className="d-none-sm flex flex-column-sm justify-between w-100 buttons-container">
                    <Button label="Overview" clickHandler={overviewClickHandler} customClass={`button--${planet.name ? planet.name.toLowerCase() : ''}`} />
                    <Button label="Structure" clickHandler={structureClickHandler} />
                    <Button label="Surface" clickHandler={surfaceClickHandler} />
                </div>
                <section className="relative align-center py-3  flex flex-column justify-center-md flex-row-md w-100 px-5 content">
                    <figure className="relative content__image-container">
                        <img ref={planetImage} src="" className="d-block w-100 h-100 animation" alt={ planet.name }/>
                        <img ref={geologyImage}  src=""  className="absolute d-none geology-image" alt={`surface of ${planet.name}`}/>
                    </figure>
                    <div ref={contentDivision} className="align-center flex flex-column-md justify-between w-100 content__division">
                        <div className="align-center flex flex-column align-start-sm text-center text-white w-100 content__info">
                            <h1 className="font-weight-7 uppercase content__title">{ planet.name }</h1>
                            <p className="opacity-7 content__description">
                                { highlight.content }
                            </p>
                            <p className="content__source flex opacity-8">Source
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white flex align-center opacity-9 content__source-link" 
                                    href={highlight.source}>
                                    Wikipedia
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="align-stretch flex flex-column flex-row-sm justify-between py-2 px-5 w-100">
                    <Info label="Rotation time" value={planet.rotation} />
                    <Info label="Revolution time" value={planet.revolution} />
                    <Info label="Radius" value={planet.radius} />
                    <Info label="Average temp" value={planet.temperature} />
                </section>
            </main>
        </div>
    );
};

export default Planet;