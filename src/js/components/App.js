import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import React from "react";
import { CssBaseline } from "@material-ui/core";

//import List from "./List";
import Header from "./topNavigation/Header";
import Albums from "./Albums";
import AlbumDetail from "./AlbumDetail";
import UserDetail from "./UserDetail";
import Favourites from "./Favourites";
//:albumData
function App() {
  return (
    <Router>     
      <CssBaseline /> 
      <Header />      

      <Switch>
          <Route exact path="/">
            <Albums />
          </Route>
          <Route path="/album_detail/:albumData"
            component={AlbumDetail}
          />                  
          <Route path="/user_detail/:userId"
            component={UserDetail}
          />                                 
          <Route path="/favourite">
            <Favourites />
          </Route>
        </Switch>      
    </Router>
  )    
}

export default App;