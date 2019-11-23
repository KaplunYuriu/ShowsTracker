import WatchlistService from './WatchlistService';
import filter from 'lodash-es/filter';
import isNil from 'lodash-es/isNil';
import find from 'lodash-es/find';

export const actions = {
  RECEIVE_WATCHLIST_HISTORY: 'RECEIVE_WATCHLIST_HISTORY',
  DELETE_SHOW: 'DELETE_SHOW',
  START_WATCHING_SHOW: 'START_WATCHING_SHOW',
  COMPLETE_SHOW: 'COMPLETE_SHOW'
};

export const WatchStatus = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2
}

const initialState = {
  shows: [],
  series: [],
  episodes: []
};

const watchlistService = new WatchlistService();

export const actionCreators = {
  loadHistory: () => async (dispatch, getState) => {
    var history = await watchlistService.getAll();

    const shows = filter(history, (h) => !isNil(h.showId));
    const series = filter(history, (h) => !isNil(h.seriesId));
    const episodes = filter(history, (h) => !isNil(h.episodeId));

    dispatch({
      type: actions.RECEIVE_WATCHLIST_HISTORY,
      shows,
      series,
      episodes
    });
  },

  deleteShow: (id) => async (dispatch, getState) => {
    await watchlistService.deleteShow(id);

    dispatch({
      type: actions.DELETE_SHOW,
      id
    });
  },

  startWatchingShow: (id, type) => async (dispatch, getState) => {
    const status = await getShowStatus(id);
    if (status === WatchStatus.NotStarted) {
      await watchlistService.addShow(id, WatchStatus.InProgress);
    } else {
      await watchlistService.updateShow(id, WatchStatus.InProgress);
    }

    dispatch({
      type: actions.START_WATCHING_SHOW,
      id
    });
  }, 

  completeShow: (id, type) => async (dispatch, getState) => {
    const status = await getShowStatus(id);
    if (status === WatchStatus.NotStarted) { 
      await watchlistService.addShow(id, WatchStatus.Completed);
    } else {
      await watchlistService.updateShow(id, WatchStatus.Completed);
    }

    dispatch({
      type: actions.COMPLETE_SHOW,
      id
    })
  }

}

async function getShowStatus(id) {
  return parseInt(await watchlistService.getStatus(id));
}

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.RECEIVE_WATCHLIST_HISTORY:
      return {
        ...state,
        shows: action.shows,
          series: action.series,
          episodes: action.episodes
      };

    case actions.DELETE_SHOW:
      return {
        ...state,
        shows: filter(state.shows, (s) => s.showId !== action.id)
      }
    
    case actions.START_WATCHING_SHOW: {
      return {
        ...state,
        shows: updateShowStatus(action.id, WatchStatus.InProgress, state.shows)
      }
    }

    case actions.COMPLETE_SHOW: {
      return {
        ...state,
        shows: updateShowStatus(action.id, WatchStatus.Completed, state.shows)
      }
    }

      default:
        return state;
  }
};


const updateShowStatus = (id, status, shows) => {
  let show = find(shows, (s) => s.showId === id);
  if (show === undefined) {
    show = {
      showId: id,
      status:status
    }
  } else {
    show.status = status;
  }

  return [ ...shows.filter(s => s.showId !== id), show ];
}