import ShowsService from '../services/ShowsService';
import isNil from 'lodash-es/isNil';
import find from 'lodash-es/find';
import { actions as watchlistActions, WatchStatus } from './Watchlist';

const actions = {
  REQUEST_SHOWS_DATA: 'REQUEST_SHOWS_DATA',
  RECEIVE_SHOWS_DATA: 'RECEIVE_SHOWS_DATA'
};

const initialState = {
  shows: [],
  totalResults: 0,
  isLoading: false
};

const showsService = new ShowsService();

export const actionCreators = {
  searchShows: (searchQuery, pageNumber) => async (dispatch, getState) => {
    const state = getState().shows;
    if ((pageNumber === state.pageNumber && state.searchQuery === searchQuery) || 
        isNil(searchQuery) || searchQuery.length < 3) {
      return;
    }

    dispatch({
      type: actions.REQUEST_SHOWS_DATA,
      pageNumber
    });

    var searchResult = await showsService.searchMovies(searchQuery, pageNumber);
    const {
      search,
      totalResults
    } = searchResult;

    const { shows } = getState().watchlist;
    search.forEach(element => {
      var show = find(shows, (s) => s.showId === element.imdbID);
      if (!isNil(show)) {
        element.watchStatus = show.status;
      } else {
        element.watchStatus = WatchStatus.NotStarted;
      }
    });
    
    dispatch({
      type: actions.RECEIVE_SHOWS_DATA,
      pageNumber,
      shows: search,
      totalResults,
      searchQuery
    });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.REQUEST_SHOWS_DATA: 
      return {
        ...state,
        pageNumber: action.pageNumber,
        searchQuery: action.searchQuery,
        isLoading: true
      };

    case actions.RECEIVE_SHOWS_DATA:
      return {
        ...state,
        pageNumber: action.pageNumber,
        totalResults: action.totalResults,
        shows: action.shows.sort((a, b) => a.title.localeCompare(b.title)),
        searchQuery: action.searchQuery,
        isLoading: false
      };
    
    case watchlistActions.DELETE_SHOW: {
      return {
        ...state,
        shows:  updateShowStatus(action.id, WatchStatus.NotStarted, state.shows)
      }
    }

    case watchlistActions.START_WATCHING_SHOW: {
      return {
        ...state,
        shows: updateShowStatus(action.id, WatchStatus.InProgress, state.shows)
      }
    }

    case watchlistActions.COMPLETE_SHOW: {
      return {
        ...state, 
        shows: updateShowStatus(action.id, WatchStatus.Completed, state.shows)
      }
    }

    default: return state;
  }
};

const updateShowStatus = (id, status, shows) => {
  if (shows.length === 0)
    return shows;
    
  const show = find(shows, (s) => s.imdbID === id);
  if (show === undefined)
    return shows;
    
  show.watchStatus = status;

  return [ ...shows.filter(s => s.imdbID !== id), show ].sort((a, b) => a.title.localeCompare(b.title))
}
