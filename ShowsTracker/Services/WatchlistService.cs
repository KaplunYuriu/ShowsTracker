using System.Collections.Generic;
using ShowsTracker.API;
using ShowsTracker.Entities;
using ShowsTracker.Models;
using ShowsTracker.Repositories;

namespace ShowsTracker.Services
{
    public interface IWatchlistService
    {
        Show GetNextForSeries(int userid, string seriesId);
        WatchStatus GetStatusForShow(int userId, string showId);
        WatchStatus GetStatusForEpisode(int userId, string episodeId);
        List<WatchilstEntry> GetStatusForSeries(int userId, string seriesId);
        void AddToHistory(int userId, string showId, WatchStatus status);
        void AddToHistory(int userId, FullEpisodeInfo episode, WatchStatus status);
        void SetStatus(int userId, string showId, WatchStatus status);
        void SetStatus(int userId, FullEpisodeInfo episode, WatchStatus status);
        void DeleteEpisode(int userId, string episodeId);
        void DeleteShow(int userId, string showId);
        void DeleteSeries(int userId, string seriesId);
    }

    public class WatchlistService : IWatchlistService
    {
        private readonly IOmdbApi _omdbApi;
        private readonly IWatchlistRepository _watchlistRepository;

        public WatchlistService(IOmdbApi omdbApi, IWatchlistRepository watchlistRepository)
        {
            _omdbApi = omdbApi;
            _watchlistRepository = watchlistRepository;
        }


        public Show GetNextForSeries(int userid, string seriesId)
        {
            throw new System.NotImplementedException();
        }

        public WatchStatus GetStatusForShow(int userId, string showId)
        {
            return _watchlistRepository.GetStatusForShow(userId, showId);
        }

        public WatchStatus GetStatusForEpisode(int userId, string episodeId)
        {
            return _watchlistRepository.GetStatusForEpisode(userId, episodeId);
        }

        public List<WatchilstEntry> GetStatusForSeries(int userId, string seriesId)
        {
            return _watchlistRepository.GetStatusForSeries(userId, seriesId);
        }

        public void AddToHistory(int userId, string showId, WatchStatus status)
        {
            _watchlistRepository.AddToHistory(userId, showId, status);
        }

        public void AddToHistory(int userId, FullEpisodeInfo episode, WatchStatus status)
        {
            _watchlistRepository.AddToHistory(userId, episode.SeriesId, episode.ImdbID, episode.Season, episode.Episode, status);
        }

        public void SetStatus(int userId, string showId, WatchStatus status)
        {
            _watchlistRepository.SetStatus(userId, showId, status);
        }

        public void SetStatus(int userId, FullEpisodeInfo episode, WatchStatus status)
        {
            _watchlistRepository.SetStatusForEpisode(userId, episode.ImdbID, status);
        }

        public void DeleteEpisode(int userId, string episodeId)
        {
            _watchlistRepository.DeleteEpisode(userId, episodeId);
        }

        public void DeleteShow(int userId, string showId)
        {
            _watchlistRepository.DeleteShow(userId, showId);
        }

        public void DeleteSeries(int userId, string seriesId)
        {
            _watchlistRepository.DeleteSeries(userId, seriesId);
        }
    }
}