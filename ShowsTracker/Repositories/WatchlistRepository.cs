using System.Collections.Generic;
using System.Linq;
using ShowsTracker.Entities;
using ShowsTracker.Infrastructure;

namespace ShowsTracker.Repositories
{
    public interface IWatchlistRepository
    {
        WatchStatus GetStatusForShow(int userId, string showId);
        List<WatchStatus> GetStatusForSeries(int userId, string seriesId);
        void AddToHistory(int userId, string showId, WatchStatus status);
        void AddToHistory(int userId, string seriesId, string episodeId, int seasonNumber, WatchStatus status);
        void SetStatus(int userId, string showId, WatchStatus status);
        void SetStatus(int userId, string seriesId, string episodeId, WatchStatus status);
        void DeleteEpisode(int userId, string episodeId);
        void DeleteShow(int userId, string showId);
    }

    public class WatchlistRepository : IWatchlistRepository
    {
        private readonly IDataAccess _dataAccess;

        public WatchlistRepository(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public WatchStatus GetStatusForShow(int userId, string showId)
        {
            return _dataAccess
                .Query<WatchStatus>("SELECT Status FROM UserWatchlist WHERE User_FK = @userId AND ShowId = @showId", new { userId, showId }).FirstOrDefault();
        }

        public List<WatchStatus> GetStatusForSeries(int userId, string seriesId)
        {
            return _dataAccess
                .Query<WatchStatus>("SELECT Status FROM UserWatchlist WHERE User_FK = @userId AND ShowId = @showId", new { userId, seriesId }).ToList();
        }

        public void AddToHistory(int userId, string showId, WatchStatus status)
        {
            _dataAccess.Execute("INSERT INTO UserWatchlist (User_FK, ShowId, Status) VALUES (@userId, @showId, @status)",
                new { userId, showId, status });
        }

        public void AddToHistory(int userId, string seriesId, string episodeId, int seasonNumber, WatchStatus status)
        {
            _dataAccess.Execute("INSERT INTO UserWatchlist (User_FK, SeriesId, EpisodeId, SeasonNumber) VALUES (@userId, @seriesId, @episodeId, @seasonNumber)",
                new { userId, seriesId, episodeId, seasonNumber, status });
        }

        public void SetStatus(int userId, string showId, WatchStatus status)
        {
            _dataAccess.Execute("UPDATE UserWatchlist SET Status = @Status WHERE User_FK = @userId AND ShowId = @showId",
                new { userId, showId, status });
        }

        public void SetStatus(int userId, string seriesId, string episodeId, WatchStatus status)
        {
            _dataAccess.Execute("UPDATE UserWatchlist SET Status = @Status WHERE User_FK = @userId AND SeriesId = @seriesId AND EpisodeId = @episodeId AND seasonNumber = @seasonNumber",
                new { userId, seriesId, episodeId, status });
        }

        public void DeleteEpisode(int userId, string episodeId)
        {
            _dataAccess.Execute("DELETE FROM UserWatchlist WHERE User_FK = @userId AND EpisodeId = @episodeId", new { userId, episodeId });
        }

        public void DeleteShow(int userId, string showId)
        {
            _dataAccess.Execute("DELETE FROM UserWatchlist WHERE User_FK = @userId AND ShowId = @showId", new { userId, showId });
        }
    }
}