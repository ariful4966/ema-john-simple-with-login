import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
    BrowserRouter as Router,
    Switch,
    Route,
 
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/Shipment/Shipment';


function App() {
    return (
        <div>
            <AuthContextProvider>
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
                        
                        <Route path="/product/:productKey">
                            <ProductDetail></ProductDetail>
                        </Route>
                        <Route path="/login">
                            <Login></Login>
                        </Route>
                        <PrivateRoute path="/Shipment">
                            <Shipment></Shipment>
                        </PrivateRoute>
                        <Route exact path="/">
                            <Shop></Shop>
                        </Route>
                        <Route path="*">
                            <NotFound></NotFound>
                        </Route>
                    </Switch>
                </Router>
            </AuthContextProvider>
        </div>
    );
}

export default App;
