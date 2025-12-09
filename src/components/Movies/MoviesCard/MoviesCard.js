import { useContext, useMemo } from "react";
import { cardListSave } from "../../../utils/moviesArray.js";
import { CurrentUserContext } from "../../../context/CurrentUserContext.js";

const MoviesCard = ({ name, duration, image, movieId, cardButtonStyle }) => {
  const { isLogged } = useContext(CurrentUserContext);
  const movieCardSaved = useMemo(
    () => cardListSave.some((i) => i.movieId === movieId),
    [movieId]
  );

  const shouldRenderButton = !cardButtonStyle.save || isLogged;

  const saveButtonClass = () => {
    if (!cardButtonStyle.save) {
      return "card__button-delete";
    }
    return movieCardSaved ? "card__button-saved" : "";
  };

  return (
    <article className="card">
      <div className="card__container">
        <h5 className="card__title">{name}</h5>
        <span className="card__duration">{`${duration} минут`}</span>
      </div>
      <img src={image} alt={name} className="card__image" />
      {shouldRenderButton && (
        <button className={`card__button ${saveButtonClass()}`}>
          {!cardButtonStyle.save || movieCardSaved ? "" : "Сохранить"}
        </button>
      )}
    </article>
  );
};

export default MoviesCard;
