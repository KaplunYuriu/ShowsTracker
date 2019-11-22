using System;

namespace ShowsTracker.Models
{
    public class EpisodeInfo
    {
        public string Title { get; set; }
        public int Episode { get; set; }
        public string ImdbID { get; set; }
        public DateTime Released { get; set; }
    }
}