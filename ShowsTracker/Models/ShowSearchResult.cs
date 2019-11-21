using System.Collections.Generic;

namespace ShowsTracker.Models
{
    public class ShowSearchResult
    {
        public List<Show> Search { get; set; }

        public int TotalResults { get; set; }
    }
}