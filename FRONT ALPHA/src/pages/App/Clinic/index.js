import React from "react";
import { connect } from 'react-redux';

const Clinic = (props) => {
    const { token } = props;
    return(
        <div>
            ok
            {token}
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.clinic.token
});

export default connect(mapStateToProps)(Clinic);