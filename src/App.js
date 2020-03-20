import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';


function App() {
    return ( 
    <div>
        <Header> </Header> 
        
        <Router>
            <Switch>
                <Route path="/shop">
                    <Shop></Shop>
                </Route>
                <Route path="/review">
                    <Review></Review>
                </Route>
                <Route path="/inventory">
                    <Inventory></Inventory>
                </Route>
                <Route exact path="/">
                    <Shop></Shop>
                </Route>
                <Route path="/product/:productKey">
                    <ProductDetail></ProductDetail>
                </Route>
                <Router path="/login">
                    <Login></Login>
                </Router>
                <Route path="*">
                    <NotFound></NotFound>
                </Route>
            </Switch>
        </Router>

    </div>
    );
}

export default App;
