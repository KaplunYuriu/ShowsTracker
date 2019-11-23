namespace ShowsTracker.Models
{
    public class FullEpisodeInfo : Show
    {
        public int Episode { get; set; }
        public int Season { get; set; }
        public string SeriesId { get; set; }
    }
}