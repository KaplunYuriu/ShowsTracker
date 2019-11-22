import React from 'react';
import './DetailsPanel.css';

const DetailsPanel = props => {
  const { show } = props;
  return (
  <div className="panel panel-info">
    <div className="panel-body">
      <ul className="details-list">
        <li><strong>Year: </strong> {show.year}</li>
        <li><strong>Rated: </strong> {show.rated}</li>
        <li><strong>Released: </strong> {show.released}</li>
        <li><strong>Runtime: </strong> {show.runtime}</li>
        <li><strong>Genre: </strong> {show.genre}</li>
        <li><strong>Director: </strong> {show.director}</li>
        <li><strong>Plot: </strong> {show.plot}</li>
        <li><strong>Language: </strong> {show.language}</li>
        <li><strong>Country: </strong> {show.country}</li>
        <li><strong>Awards: </strong> {show.awards}</li>
      </ul>
    </div>
  </div>
)};

export default DetailsPanel;