using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShowsTracker.API;

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
        public async Task<IActionResult> Search(string title, int? year)
        {
            var movie = await _omdbApi.Search(title, year);

            return Ok(movie);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ById(string id)
        {
            var movie = await _omdbApi.GetById(id);

            return Ok(movie);
        }
    }
}
