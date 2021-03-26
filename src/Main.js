import React from 'react'
import App from './App'
import Product from './components/Product'
import {BrowserRouter as Router, Route} from "react-router-dom";

const Main = () => {
    return ( 
        <div>
            <Router>
                <Route exact path="/"> 
                    <App></App>                    
                </Route>
                <Route exact path="/Info:id">
                    <Product></Product>                                        
                </Route>
            </Router>
        </div>
     );
}
 
export default Main;