using System.Collections.Generic;
using System.Linq;
using ShowsTracker.Entities;
using ShowsTracker.Infrastructure;

namespace ShowsTracker.Repositories
{
    public interface IWatchlistRepository
    {
        List<WatchilstEntry> GetAllHistory(int userId);
        WatchStatus GetStatusForShow(int userId, string showId);
        WatchStatus GetStatusForEpisode(int userId, string episodeId);
        List<WatchilstEntry> GetStatusForSeries(int userId, string seriesId);
        void AddToHistory(int userId, string showId, WatchStatus status);
        void AddToHistory(int userId, string seriesId, string episodeId, int seasonNumber, int episodeNumber, WatchStatus status);
        void SetStatus(int userId, string showId, WatchStatus status);
        void SetStatusForEpisode(int userId, string episodeId, WatchStatus status);
        void DeleteEpisode(int userId, string episodeId);
        void DeleteShow(int userId, string showId);
        void DeleteSeries(int userId, string seriesId);
    }

    public class WatchlistRepository : IWatchlistRepository
    {
        private readonly IDataAccess _dataAccess;

        public WatchlistRepository(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public List<WatchilstEntry> GetAllHistory(int userId)
        {
            return _dataAccess
                .Query<WatchilstEntry>(@"SELECT ShowId, SeriesId, EpisodeId, EpisodeNumber, SeasonNumber, Status 
                                        FROM UserWatchlist 
                                        WHERE User_FK = @userId", new { userId }).ToList();
        }

        public WatchStatus GetStatusForShow(int userId, string showId)
        {
            return _dataAccess
                .Query<WatchStatus>("SELECT Status FROM UserWatchlist WHERE User_FK = @userId AND ShowId = @showId", new { userId, showId }).FirstOrDefault();
        }

        public WatchStatus GetStatusForEpisode(int userId, string episodeId)
        {
            return _dataAccess
                .Query<WatchStatus>("SELECT Status FROM UserWatchlist WHERE User_FK = @userId AND EpisodeId = @episodeId", new { userId, episodeId }).FirstOrDefault();
        }

        public List<WatchilstEntry> GetStatusForSeries(int userId, string seriesId)
        {
            return _dataAccess
                .Query<WatchilstEntry>(@"SELECT SeriesId, EpisodeId, EpisodeNumber, SeasonNumber, Status 
                                        FROM UserWatchlist 
                                        WHERE User_FK = @userId AND SeriesId = @seriesId
                                        ORDER BY SeasonNumber DESC, EpisodeNumber DESC", new { userId, seriesId }).ToList();
        }

        public void AddToHistory(int userId, string showId, WatchStatus status)
        {
            _dataAccess.Execute("INSERT INTO UserWatchlist (User_FK, ShowId, Status) VALUES (@userId, @showId, @status)",
                new { userId, showId, status });
        }

        public void AddToHistory(int userId, string seriesId, string episodeId, int seasonNumber, int episodeNumber, WatchStatus status)
        {
            _dataAccess.Execute("INSERT INTO UserWatchlist (User_FK, SeriesId, EpisodeId, SeasonNumber, EpisodeNumber, Status) VALUES (@userId, @seriesId, @episodeId, @episodeNumber, @seasonNumber, @status)",
                new { userId, seriesId, episodeId, episodeNumber, seasonNumber, status });
        }

        public void SetStatus(int userId, string showId, WatchStatus status)
        {
            _dataAccess.Execute("UPDATE UserWatchlist SET Status = @Status WHERE User_FK = @userId AND ShowId = @showId",
                new { userId, showId, status });
        }

        public void SetStatusForEpisode(int userId, string episodeId, WatchStatus status)
        {
            _dataAccess.Execute("UPDATE UserWatchlist SET Status = @Status WHERE User_FK = @userId AND EpisodeId = @episodeId",
                new { userId, episodeId, status });
        }

        public void DeleteEpisode(int userId, string episodeId)
        {
            _dataAccess.Execute("DELETE FROM UserWatchlist WHERE User_FK = @userId AND EpisodeId = @episodeId", new { userId, episodeId });
        }

        public void DeleteShow(int userId, string showId)
        {
            _dataAccess.Execute("DELETE FROM UserWatchlist WHERE User_FK = @userId AND ShowId = @showId", new { userId, showId });
        }

        public void DeleteSeries(int userId, string seriesId)
        {
            _dataAccess.Execute("DELETE FROM UserWatchlist WHERE User_FK = @userId AND SeriesId = @seriesId", new { userId, seriesId });
        }
    }
}