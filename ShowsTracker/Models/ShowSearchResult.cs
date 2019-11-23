using System.Collections.Generic;

namespace ShowsTracker.Models
{
    public class ShowSearchResult
    {
        public List<Show> Search { get; set; }

        public int TotalResults { get; set; }
    }

    public class EmptySearchResult : ShowSearchResult
    {
        public new List<Show> Search = new List<Show>();
        public new int TotalResults = 0;
    }
}