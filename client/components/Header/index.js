import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Header() {
  return (
    <div className="green-toped">
      <div className="row">
        <div className="col-lg-4 col-xs-12 col-lg-offset-4">
          <h3 className="title">
            <Link to="/">Tokopedia</Link>
          </h3>
          <Link className="new-post" to="/p/create">
            New
          </Link>
        </div>
      </div>
    </div>
  );
}
