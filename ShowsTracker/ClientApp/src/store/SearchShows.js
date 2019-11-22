import ShowsService from './ShowsService';
import isNil from 'lodash-es/isNil';

const requestShowsData = 'REQUEST_SHOWS_DATA';
const receiveWeatherForecastsType = 'RECEIVE_SHOWS_DATA';
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
        isNil(searchQuery)) {
      return;
    }

    dispatch({
      type: requestShowsData,
      pageNumber
    });

    var searchResult = await showsService.searchMovies(searchQuery, pageNumber);
    const {
      search,
      totalResults
    } = searchResult;

    dispatch({
      type: receiveWeatherForecastsType,
      pageNumber,
      shows: search,
      totalResults,
      searchQuery
    });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestShowsData) {
    return {
      ...state,
      pageNumber: action.pageNumber,
      searchQuery: action.searchQuery,
      isLoading: true
    };
  }

  if (action.type === receiveWeatherForecastsType) {
    return {
      ...state,
      pageNumber: action.pageNumber,
      totalResults: action.totalResults,
      shows: action.shows,
      searchQuery: action.searchQuery,
      isLoading: false
    };
  }

  return state;
};
