import React from 'react';
import { withRouter } from 'react-router-dom';

const NotFound = props => {

  return (
    <div>
      <h1>Not Found 404</h1>
    </div>
  );
}

export default withRouter(NotFound);