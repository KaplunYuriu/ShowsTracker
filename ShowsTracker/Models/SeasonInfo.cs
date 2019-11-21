namespace ShowsTracker.Models
{
    public class SeasonInfo
    {
        public string Title { get; set; }
        public int Season { get; set; }
        public int TotalSeasons { get; set; }
        public EpisodeInfo[] Episodes { get; set; }
    }
}