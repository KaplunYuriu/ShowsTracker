import React from 'react';
import './ShowThumbnail.css';

const ShowThumbnail = props => (
  <div className="col-sm-3 col-md-2">
    <div className="thumbnail show-thumbnail">
      <img src={props.show.poster} alt={props.show.title} />
      <div className="caption">
        <h3>{props.show.title}</h3>
        <p><a href="#" className="btn btn-primary" role="button">Details</a></p>
      </div>
    </div>
  </div>
);

export default ShowThumbnail;