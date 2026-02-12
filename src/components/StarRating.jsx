import React, { useState } from "react";

const StarRating = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0); // État pour la note actuelle
  const [hover, setHover] = useState(0); // État pour l'étoile survolée

  const handleRating = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value); 
    }
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={starValue}
            className={`star ${
              starValue <= (hover || rating) ? "filled" : ""
            }`}
            onClick={() => handleRating(starValue)} 
            onMouseEnter={() => setHover(starValue)} 
            onMouseLeave={() => setHover(0)} 
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
