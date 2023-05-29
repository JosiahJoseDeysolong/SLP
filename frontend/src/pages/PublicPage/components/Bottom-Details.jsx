import React from 'react';
import './Bottom-Details.css';
const BottomDetails = () => {
  return (
    <div className="Column">
      <div className="bottomDetails">
        <div className="Contacts">
          <h3>Contact Us</h3>
          <p>✉ test@gmail.com</p>
          <p>📞 09xxxxxxxxx</p>
        
          <br />

          <h3>Find us Here ⬇</h3>
          <p>Ground Floor, Agriculture Building, 
            Xavier University - Ateneo de Cagayan, 
            Corrales Avenue, Cagayan de Oro City, 
            9000, Philippines</p>
        </div>
        <div className="RequestAccess">
          <h3>Request Access</h3>
          <p>Want access to more information? Request for access here</p>
          <button className="buttons">Request Access</button>
        </div>
      </div>
      <hr />
      <div className="kanangPinakaBottomNaJud">
        <p>Copyright © 2023 Xavier University - Ateneo de Cagayan - All rights reserved.</p>
      </div>
    </div>
  );
};

export default BottomDetails;
