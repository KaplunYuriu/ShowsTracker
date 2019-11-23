import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/SearchShows';
import { actionCreators as watchlistActionCreators} from '../store/Watchlist';

import ShowThumbnail from '../elements/ShowThumbnail/ShowThumbnail';
import isNil from 'lodash-es/isNil';
import './SearchShows.css';

class SearchShows extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      query: ''
    };
  }

  componentWillMount() {
    const { pageNumber, searchQuery } = this.props.match.params;

    const pageNumberToQuery = parseInt(pageNumber, 10) || 1;
    this.props.searchShows(searchQuery, pageNumberToQuery);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNumber, searchQuery } = nextProps.match.params;

    if (!isNil(searchQuery)) {
      this.setState(...this.state, { query: searchQuery });
    }

    const pageNumberToQuery = parseInt(pageNumber, 10) || 1;
    this.props.searchShows(searchQuery, pageNumberToQuery);
  }

  render() {
    const { query } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group search-input">
            <input type="text" className="form-control" placeholder="Search for..." value={query} onChange={(e) => this.setState(...this.state, { query: e.target.value})} />
            <span className="input-group-btn">
              <Link className='btn btn-default' to={`/searchshows/${query}/${1}`}>Go</Link> 
            </span>
            </div>
          </div>
        </div>
        <div className="row">
          {renderShowsTable(this.props)}
        </div>
        {renderPagination(this.props)}
      </div>
    );
  }
}

const renderShowsTable = props => (
    <div className="row">
      {props.shows.map(show => <ShowThumbnail show={show} key={show.imdbID} deleteShow={props.deleteShow} startWatching={props.startWatching} completeShow={props.completeShow} />)}
    </div> 
);

function renderPagination(props) {
  const { totalResults, pageNumber, searchQuery } = props;
  const numberOfItemsPerPage = 10;

  if (totalResults === 0)
    return <span />;

  const displayPrevButton = pageNumber > 1;
  const displayNextButton = totalResults > (pageNumber * numberOfItemsPerPage);

  return <p className='clearfix text-center'>
    {displayPrevButton && <Link className='btn btn-default pull-left' to={`/searchshows/${searchQuery}/${pageNumber - 1}`}>Previous</Link> }
    {displayNextButton && <Link className='btn btn-default pull-right' to={`/searchshows/${searchQuery}/${pageNumber + 1}`}>Next</Link> }
    {props.isLoading ? <span>Loading...</span> : []}
  </p>;
}

const mapDispatchToProps = dispatch => ({
  searchShows: (searchQuery, pageNumber) => dispatch(actionCreators.searchShows(searchQuery, pageNumber)),
  deleteShow: (id, type) => dispatch(watchlistActionCreators.deleteShow(id, type)),
  startWatching: (id, type) => dispatch(watchlistActionCreators.startWatchingShow(id, type)),
  completeShow: (id, type) => dispatch(watchlistActionCreators.completeShow(id, type))
})

export default connect(
  state => state.shows,
  dispatch => mapDispatchToProps
)(SearchShows);
