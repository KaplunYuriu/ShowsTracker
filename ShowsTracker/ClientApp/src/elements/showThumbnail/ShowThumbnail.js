import React from 'react';
import { Link } from 'react-router-dom';
import ShowWatchStatus from '../ShowWatchStatus/ShowWatchStatus';
import { Row, Col } from 'react-bootstrap';

import './ShowThumbnail.css';

const ShowThumbnail = props => {
  const { show } = props;
  const { deleteShow, startWatching, completeShow } = props;

  return (
    <div className="col-sm-3 col-md-2">
      <div className="thumbnail show-thumbnail">
        <img src={show.poster} alt={show.title} />
        <div className="caption">
          <h3>{show.title}</h3>
          <Row>
            <Col md={6}>
              <ShowWatchStatus watchStatus={show.watchStatus} showId={show.imdbID} showType={show.type} deleteShow={deleteShow} startWatching={startWatching} completeShow={completeShow} />
            </Col>
            <Col md={6}>
              <Link className='btn btn-primary pull-right' role='button' to={`/details/${show.imdbID}`}>Details</Link> 
            </Col>
          </Row>
        </div>
      </div>
    </div>
)};

export default ShowThumbnail;