import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators, ShowType } from '../store/Details';
import { connect } from 'react-redux';
import isNil from 'lodash-es/isNil';
import DetailsPanel from '../elements/DetailsPanel/DetailsPanel';
import SeasonsList from '../elements/SeasonsList/SeasonsList';

class Details extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    if (isNil(id))
      return;

    this.props.loadDetails(id);
  }

  render() {
    const { show, seasons, isLoading } = this.props;
    const { loadSeason, loadEpisode } = this.props;

    const isSeries = show.type === ShowType.Series;

    return (<div> 
      <div className="page-header">
        <h1>{show.title}</h1>

        <div className="row">
          <div className="col-md-3">
            <img src={show.poster} alt={show.title} />
          </div>
          <div className="col-md-3">
            <DetailsPanel show={show} />
          </div>
        </div>
        {isLoading ? <span>Loading...</span> : []}
        {isSeries && <SeasonsList id={show.imdbID} seasons={seasons} loadSeason={loadSeason} loadEpisode={loadEpisode} />}
      </div>
    </div>);
  }
}

export default connect(
  state => state.details,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Details);
