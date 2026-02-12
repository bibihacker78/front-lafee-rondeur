import React from "react";

const ConseilComponent = (props) => {
    return (
        <div className="items" id="conseil">
          <p className="date">{props.date}</p>
          <img src={props.image} alt="" />
          <h4>{props.titre}</h4>
          <p> {props.info} </p>
        </div>
  


    )
        
};
export default ConseilComponent;