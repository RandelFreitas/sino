import React from "react";
import MainSignIn from '../../layout/mainSignIn'

export default function RouteWithLayout(props) {  
    return (
      <div>
        <MainSignIn/>
        { props.children }
      </div>
    );
}