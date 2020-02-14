import React from 'react';
import { Link } from 'react-router-dom';
import imgSidebar from '../Asset/img/bgSidebar.png';

export default ({ collapsed }) => {
  return (
    <div style={{height:'70px', padding:'0 10px', textAlign:'center', background:'rgba(0, 0, 0, 0.3)'}}>
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard" style={{fontSize:'21px', color:'red', lineHeight:'70px', textTransform:'uppercase'}}>
              S
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard" style={{fontSize:'21px', lineHeight:'70px'}}>
            <img  height={40} src={imgSidebar} />
          </Link>
        </h3>
      )}
    </div>
  );
};
