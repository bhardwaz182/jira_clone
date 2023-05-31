import React from "react";
import "./Card.css"

export const Card = ({ onDragStart, story_number, story_points, user_image, children }) => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", story_number);
    onDragStart(e, story_number);
  };

    return (
      <div className="card" draggable="true" onDragStart={handleDragStart} data-testid="card">
        {children}
        <div className="card__footer flex space-between">
            <span>{story_number}</span>
            <div>
                <span className="story_pints">{story_points}</span>
                <img className="user_image" src={user_image} alt="User image" width="20" height="20"/>
            </div>

        </div>
      </div>
    
    );
  };
  

  