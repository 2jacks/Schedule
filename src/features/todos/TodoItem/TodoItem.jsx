import React from "react";

import './TodoItem.css'

export const TodoItem = ({content, date}) => {
   return(
     <div className="todo-item">
        <button className="todo-item__complete-btn">
           <svg>
              <use xlinkHref='#check'/>
           </svg>
        </button>
        <p className="todo-item__content">Забрать справку</p>
        <div className="todo-item__tags">
           <span className="badge bg-secondary">Срочно</span>
           <span className="badge bg-secondary">Каждый день</span>

           <button className='todo-item__edit-btn'>
              <svg>
                 <use xlinkHref='#pen'/>
              </svg>
           </button>
        </div>
        <div className="todo-item__extra-options">
         <button className="todo-item__extra-button">
            <svg>
               <use xlinkHref='#bell'/>
            </svg>
         </button>
         <button className="todo-item__extra-button">
            <svg>
               <use xlinkHref='#update-arrows'/>
            </svg>
         </button>
        </div>
        
     </div>
   )
}
