import React from 'react';
import { Link } from 'react-router-dom';

const CardLink = ({ to, text }) => {
  return (
    <div className="col-12 d-flex justify-content-center mt-3">
      <Link to={to} style={{ textDecoration: 'none', width: '100%' }}>
        <div className="card border-primary" style={{ cursor: 'pointer' }}>
          <div className="card-body d-flex justify-content-center align-items-center p-3">
            <p className="card-text mb-0">{text}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardLink;
