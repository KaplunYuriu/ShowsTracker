using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShowsTracker.API;
using ShowsTracker.Models;

namespace ShowsTracker.Controllers
{
    [Route("api/[controller]")]
    public class ShowsController : Controller
    {
        private readonly IOmdbApi _omdbApi;

        public ShowsController(IOmdbApi omdbApi)
        {
            _omdbApi = omdbApi;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Search(string query, int page = 1)
        {
            var searchResult = await _omdbApi.Search(query, page);

            return Ok(searchResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ById(string id)
        {
            var movie = await _omdbApi.GetById(id);

            return Ok(movie);
        }

        [HttpGet("{id}/seasons/{seasonNumber}")]
        public async Task<IActionResult> GetSeason(string id, int seasonNumber)
        {
            var show = await _omdbApi.GetById(id);
            if (show.Type != ShowType.Series || seasonNumber > show.TotalSeasons)
                return BadRequest("The show is not a series or there is no such season");

            var season = await _omdbApi.GetSeason(id, seasonNumber);

            return Ok(season);
        }
    }
}
