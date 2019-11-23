import React, { Component } from 'react';
import { actionCreators as watchlistActionCreators} from '../store/Watchlist';
import { actionCreators, ShowType } from '../store/Details';
import { connect } from 'react-redux';
import isNil from 'lodash-es/isNil';
import { Row, Col } from 'react-bootstrap';
import DetailsPanel from '../elements/DetailsPanel/DetailsPanel';
import SeasonsList from '../elements/SeasonsList/SeasonsList';
import ShowWatchStatus from '../elements/ShowWatchStatus/ShowWatchStatus';

class Details extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    if (isNil(id))
      return;

    this.props.loadDetails(id);
  }

  render() {
    const { show, seasons, isLoading } = this.props;
    const { loadSeason, loadEpisode, deleteShow, startWatching, completeShow } = this.props;

    const isSeries = show.type === ShowType.Series;
    
    return (<div> 
      <div className="page-header">
        <h1>{show.title}</h1>

        <Row>
          <Col md={3}>
            <img src={show.poster} alt={show.title} />
          </Col>
          <Col md={3}>
            <DetailsPanel show={show} />
            <ShowWatchStatus watchStatus={show.watchStatus} showId={show.imdbID} showType={show.type} deleteShow={deleteShow} startWatching={startWatching} completeShow={completeShow}/>
          </Col>
        </Row>
        {isLoading ? <span>Loading...</span> : []}
        {isSeries && <SeasonsList id={show.imdbID} seasons={seasons} loadSeason={loadSeason} loadEpisode={loadEpisode}
                                  deleteShow={deleteShow} startWatching={startWatching} completeShow={completeShow} />}
      </div>
    </div>);
  }
}

const mapDispatchToProps = dispatch => ({
  loadDetails: (id) => dispatch(actionCreators.loadDetails(id)),
  loadSeason: (seasonNumber) => dispatch(actionCreators.loadSeason(seasonNumber)),
  loadEpisode: (imdbID, seasonNumber) => dispatch(actionCreators.loadEpisode(imdbID, seasonNumber)),
  deleteShow: (id, type) => dispatch(watchlistActionCreators.deleteShow(id, type)),
  startWatching: (id, type) => dispatch(watchlistActionCreators.startWatchingShow(id, type)),
  completeShow: (id, type) => dispatch(watchlistActionCreators.completeShow(id, type))
});

export default connect(
  state => state.details,
  dispatch => mapDispatchToProps
)(Details);
