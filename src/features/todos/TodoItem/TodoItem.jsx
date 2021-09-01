import React from "react";

export const TodosItem = ({content, date}) => {
   return(
     <label className="list-group-item d-flex gap-3">
        <input className="form-check-input flex-shrink-0" type="checkbox" value=""/>
        <span className="form-checked-content">
           <strong>{content}</strong>
           <small className="d-block text-muted">
              <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#calendar-event"/></svg>
              {date}
           </small>
        </span>
     </label>
   )
}
