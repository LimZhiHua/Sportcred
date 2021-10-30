import React from "react";
import "./Card.css";

function Card(props) {
    return (
        <div className="answer-card">
            {props.children}
        </div>
    )
}

export default Card;