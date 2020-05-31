/*
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Dashboard from "./Dashboard";
import MenuManager from "./MenuManager";

export default function RoutesLevel (props){
    return(
        <BrowserRouter>
            {props.children}
            <Switch>
                <Route exact path={`${props.match.path}/`} component={Dashboard} />
                <Route exact path={`${props.match.path}/menu`} component={MenuManager} />
            </Switch>
        </BrowserRouter>
    );
}
*/
import React from "react";

export default function RoutesLevel (){
    return(
        <h1>CLINICA</h1>
    )
}