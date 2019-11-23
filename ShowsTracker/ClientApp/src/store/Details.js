import ShowsService from './ShowsService';
import clone from 'lodash-es/clone';
import isNil from 'lodash-es/isNil';
import findIndex from 'lodash-es/findIndex';

const actions = {
  REQUEST_SHOW_DATA: 'REQUEST_SHOW_DATA',
  RECEIVE_SHOW_DATA: 'RECEIVE_SHOW_DATA',
  RECEIVE_SEASON_DATA: 'RECEIVE_SEASON_DATA',
  RECEIVE_EPISODE_DATA: 'RECEIVE_EPISODE_DATA'
};

const initialState = {
  isLoading: false,
  show: {
    title: ''
  },
  seasons: [],
  episodes: []
};

export const ShowType = {
  Movie: 0,
  Series: 1,
  Episode: 2,
  Game: 3
}

const showsService = new ShowsService();

const emptySeason = {
  title: '',
  season: 0,
  episodes: []
};

export const actionCreators = {
  loadDetails: (id) => async (dispatch, getState) => {
    dispatch({ type: actions.REQUEST_SHOW_DATA });

    var show = await showsService.getShow(id);

    let showSeasons = [];
    if (show.type === ShowType.Series) {
      for (var i = 1; i <= show.totalSeasons; i++) {
        var season = clone(emptySeason);
        season.season = i;
        
        showSeasons[i] = season;
      }
    }

    dispatch({ type: actions.RECEIVE_SHOW_DATA, show, seasons: showSeasons })
  },

  loadSeason: (seasonNumber) => async (dispatch, getState) => {
    dispatch({ type: actions.REQUEST_SHOW_DATA });

    var show = getState().details.show;
    var season = await showsService.getSeason(show.imdbID, seasonNumber);
    season.episodes = isNil(season.episodes) ? [] : season.episodes;

    dispatch({ type: actions.RECEIVE_SEASON_DATA, seasonNumber, season });
  },

  loadEpisode: (imdbID, seasonNumber) => async (dispatch, getState) => {
    dispatch({ type: actions.REQUEST_SHOW_DATA });

    var episode = await showsService.getShow(imdbID);

    dispatch({ type: actions.RECEIVE_EPISODE_DATA, episode, seasonNumber });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.REQUEST_SHOW_DATA: 
      return {
        ...state,
        isLoading: true
      };

    case actions.RECEIVE_SHOW_DATA: 
      return {
        ...state,
        show: action.show,
        seasons: action.seasons,
        isLoading: false
      };

    case actions.RECEIVE_SEASON_DATA: {   
        if (action.season.season === 0) //0 means that there is no such season in imdb
          return state;

        return { 
          ...state, 
          isLoading: false,
          seasons: [ ...state.seasons.filter(s => s.season !== action.season.season), action.season ].sort((a, b) => a.season - b.season)
        };
    }

    case actions.RECEIVE_EPISODE_DATA: {
      const seasonNumber = action.seasonNumber;
      const episode = action.episode;

      const season = state.seasons[findIndex(state.seasons, (s) => s.season === seasonNumber)];
      season.episodes = [ ...season.episodes.filter(e => e.imdbID !== episode.imdbID), episode].sort((a, b) => a.episode - b.episode);

      return { 
        ...state, 
        isLoading: false,
        seasons: [ ...state.seasons.filter(s => s.season !== seasonNumber), season ].sort((a, b) => a.season - b.season)
      };
    }

    default: return state;
  }
}