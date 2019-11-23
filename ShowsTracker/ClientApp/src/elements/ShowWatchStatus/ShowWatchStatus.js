import React from 'react';
import { Label, Button, Glyphicon } from 'react-bootstrap';
import { WatchStatus } from '../../store/Watchlist';

import './ShowWatchStatus.css';

const ShowWatchStatus = props => {
  const { watchStatus, showId, type } = props;
  const { deleteShow, startWatching, completeShow } = props;

  return (
    <span>
      {watchStatus === WatchStatus.NotStarted && <div> 
        <div>
          <Button bsSize="xsmall" onClick={() => startWatching(showId, type)} title='Start watching' className='action-button'>
            <Glyphicon glyph="play-circle" />
          </Button>
          <Button bsSize="xsmall" onClick={() => completeShow(showId, type)} title='Complete' className='action-button'>
            <Glyphicon glyph="ok" />
          </Button>
        </div>
      </div>}
      {watchStatus === WatchStatus.InProgress && <div>
        <Label bsStyle="info"> Watching </Label>
        <div>
          <Button bsSize="xsmall" onClick={() => deleteShow(showId, type)} title='Delete' className='action-button'>
            <Glyphicon glyph="remove" />
          </Button>
          <Button bsSize="xsmall" onClick={() => completeShow(showId, type)} title='Complete' className='action-button'>
            <Glyphicon glyph="ok" />
          </Button>
        </div>
      </div>}

      {watchStatus === WatchStatus.Completed && <div>
        <Label bsStyle="success"> Watched </Label>
        <div>
          <Button bsSize="xsmall" onClick={() => deleteShow(showId, type)} title='Delete' className='action-button'>
            <Glyphicon glyph="remove" />
          </Button>  
          <Button bsSize="xsmall" onClick={() => startWatching(showId, type)} title='Repeat' className='action-button'>
            <Glyphicon glyph="repeat" />
          </Button>  
        </div>
      </div>}
    </span>
  )
};

export default ShowWatchStatus;
