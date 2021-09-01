import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css'

import { Header } from './features/header/Header/Header'
import {TagBar} from "./features/tags/TagBar/TagBar";
import { TodosList } from './features/todos/TodosList/TodosList'

function App() {
  return (
    <Router>
       <Header/>
       <div className="screen">
         <Switch>
            <Route exact path='/' render={() => (
              <>
                 <TagBar/>
                 {/*<TodosList/>*/}
              </>
            )
            }/>
            {/*<Route exact path='/groups/:groupName' component={TodosGroup}/>*/}
         </Switch>
       </div>
    </Router>

  );
}

export default App;
