import React from "react";
import "./FloatingSection.css";

function FloatingSection(props) {
    return (
        <div className={"floating-section " + props.className}>
            {props.children}
        </div>
    )
}

export default FloatingSection;