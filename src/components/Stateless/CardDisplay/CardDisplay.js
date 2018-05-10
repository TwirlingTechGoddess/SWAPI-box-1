import './CardDisplay.css';
import React from 'react';
import Card from '../Card/Card';


const CardDisplay = ({selectedData,findCard,favorites}) => {
  let clicked;
  const displayCards = selectedData.map((data, index) => {
    const findFavorites = favorites.map(favCard => favCard.id);
    if (findFavorites.includes(data.id)) {
      clicked = true;
    } else {
      clicked = false;
    }
    return (
      <Card 
        data={data}
        key={index}
        id={data.keyList + index}
        clicked={clicked}
        findCard={findCard}
      />
    );
  });

  return (
    <div className='cardCointainer'>
      {displayCards}
    </div>
  );
};

export default CardDisplay;