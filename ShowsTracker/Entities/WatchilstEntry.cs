namespace ShowsTracker.Entities
{
    public class WatchilstEntry
    {
        public string ShowId { get; set; }
        public string SeriesId { get; set; }
        public string EpisodeId { get; set; }
        public int? EpisodeNumber { get; set; }
        public int? SeasonNumber { get; set; }
        public WatchStatus Status { get; set; }
    }

    public enum WatchStatus
    {
        NotStarted,
        InProgress,
        Completed
    }
}