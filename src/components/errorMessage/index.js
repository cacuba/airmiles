import React from 'react';
import './ErrorMessage.scss';

function ErrorMessage() {
  return (
    <div className="error-message">
      <div className="error-message-content">
        <p>Error! Please <button className="refresh" onClick={() => window.location.reload()}>click here</button> to refresh the page.</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
