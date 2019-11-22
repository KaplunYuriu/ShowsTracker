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
        List<WatchStatus> GetStatusForSeries(int userId, string seriesId);
        void AddToHistory(int userId, string showId, WatchStatus status);
        void AddToHistory(int userId, string seriesId, string episodeId, int seasonNumber, WatchStatus status);
        void SetStatus(int userId, string showId, WatchStatus status);
        void SetStatus(int userId, string seriesId, string episodeId, WatchStatus status);
        void DeleteEpisode(int userId, string episodeId);
        void DeleteShow(int userId, string showId);
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

        public List<WatchStatus> GetStatusForSeries(int userId, string seriesId)
        {
            return _watchlistRepository.GetStatusForSeries(userId, seriesId);
        }

        public void AddToHistory(int userId, string showId, WatchStatus status)
        {
            _watchlistRepository.AddToHistory(userId, showId, status);
        }

        public void AddToHistory(int userId, string seriesId, string episodeId, int seasonNumber, WatchStatus status)
        {
            _watchlistRepository.AddToHistory(userId, seriesId, episodeId, seasonNumber, status);
        }

        public void SetStatus(int userId, string showId, WatchStatus status)
        {
            _watchlistRepository.SetStatus(userId, showId, status);
        }

        public void SetStatus(int userId, string seriesId, string episodeId, WatchStatus status)
        {
            _watchlistRepository.SetStatus(userId, seriesId, episodeId, status);
        }

        public void DeleteEpisode(int userId, string episodeId)
        {
            _watchlistRepository.DeleteEpisode(userId, episodeId);
        }

        public void DeleteShow(int userId, string showId)
        {
            _watchlistRepository.DeleteShow(userId, showId);
        }
    }
}