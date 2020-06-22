import React from "react";
import { connect } from 'react-redux';
import { getToken } from "../../../services/auth";

const Clinic = (props) => {
    const { token } = props;
    const token01 = getToken();
    return(
        <div>
            {token01}
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.clinic.token
});

export default connect(mapStateToProps)(Clinic);