using System.Threading.Tasks;
using Refit;
using ShowsTracker.Models;

namespace ShowsTracker.API
{
    public interface IOmdbApi
    {
        [Get("/")]
        Task<Show> Search([AliasAs("t")]string title, [AliasAs("y")]int? year);

        [Get("/")]
        Task<Show> GetById([AliasAs("i")]string imdbId);

        [Get("/")]
        Task<SeasonInfo> GetSeason([AliasAs("i")] string imdbId, [AliasAs("season")]int seasonNumber);
    }
}