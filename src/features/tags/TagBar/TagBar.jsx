import React from 'react'

import './TagBar.css'

export const TagBar = () => {
   return(
     <aside className="tagbar">
         <h2 className="tagbar__title">Теги</h2>
         <ul className="tagbar__list">
            <li className="tagbar__list-item">Срочно</li>
            <li className="tagbar__list-item">Каждый день</li>
            <li className="tagbar__list-item">По настроению</li>
            <li className="tagbar__list-item">Необязательно</li>
         </ul>
         <button className="tagbar__button">
            <img src="assets/arrow.svg" alt=""/>
         </button>
     </aside>)
}
