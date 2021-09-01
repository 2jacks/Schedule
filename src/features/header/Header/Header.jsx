import React from 'react'

import './Header.css'

export const Header = () => {
   return (
     <header className="header">
        <div className="container">
           <div className="row justify-content-between align-items-center pt-2 pb-2">
              <span className="logo col">Schedule</span>

              <nav className="nav col-12 col-md mt-3 mt-md-0 justify-content-center">
                 <div className="nav__item">
                    <a href="/" className="nav__link">
                       <svg className="nav__icon">
                          <use xlinkHref="#home"/>
                       </svg>
                       <span className="nav__name">Домой</span>
                    </a>
                 </div>

                 <div className="nav__item">
                    <a href="/" className="nav__link">
                       <svg className="nav__icon">
                          <use xlinkHref="#table"/>
                       </svg>
                       <span className="nav__name">Календарь</span>
                    </a>
                 </div>
              </nav>
              <div className="user col justify-content-end">
                 <span className="user__name">DangerousMeow_Ijik</span>
                 <div className="user__avatar">
                    <div className="user__img placeholder-glow"/>
                 </div>
              </div>
           </div>
        </div>
     </header>
   )
}
