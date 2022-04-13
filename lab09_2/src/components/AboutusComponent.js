//Nếu quên export: export 'default' (imported as 'AboutUs') was not found in './AboutusComponent' (module has no exports)

import React, { Component }  from 'react';
function AboutUs(props) {
    //trang này làm theo Lab03_1 và Exercise 2
    //'React' must be in scope when using JSX  react/react-in-jsx-scope => nghĩa là phải import React, { Component }  from 'react';
    return(
      <div className="container">
        <h4>About us 2/4</h4>
      </div>
    );
}

export default AboutUs;