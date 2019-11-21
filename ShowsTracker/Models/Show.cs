namespace ShowsTracker.Models
{
    public class Show
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string Language { get; set; }
        public string Country { get; set; }
        public string Poster { get; set; }
        public string ImdbID { get; set; }
        public ShowType Type { get; set; }
        public int? TotalSeasons { get; set; }
    }

    public enum ShowType
    {
        Movie,
        Series,
        Episode
    }
}