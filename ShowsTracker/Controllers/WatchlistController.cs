using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShowsTracker.API;
using ShowsTracker.Entities;
using ShowsTracker.Models;
using ShowsTracker.Services;

namespace ShowsTracker.Controllers
{
    public class AddToHistory
    {
        public WatchStatus WatchStatus { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchlistController : ControllerBase
    {
        private int CurrentUserId => Convert.ToInt32(User.Identity.Name);

        private readonly IWatchlistService _watchlistService;
        private readonly IOmdbApi _omdbApi;

        public WatchlistController(IWatchlistService watchlistService, IOmdbApi omdbApi)
        {
            _watchlistService = watchlistService;
            _omdbApi = omdbApi;
        }

        #region Shows

        [HttpGet("show/{id}")]
        public IActionResult GetStatusForShow(string id)
        {
            return Ok(_watchlistService.GetStatusForShow(CurrentUserId, id).ToString());
        }

        [HttpPost("show/{id}")]
        public IActionResult AddToWatching(string id, [FromBody]AddToHistory model)
        {
            var existingStatus = _watchlistService.GetStatusForShow(CurrentUserId, id);
            if (existingStatus == WatchStatus.InProgress || existingStatus == WatchStatus.Completed)
                return BadRequest("The show is already in progress or completed.");

            _watchlistService.AddToHistory(CurrentUserId, id, model.WatchStatus);

            return Ok();
        }

        [HttpPut("show/{id}")]
        public IActionResult UpdateShowStatus(string id, [FromBody] AddToHistory model)
        {
            _watchlistService.SetStatus(CurrentUserId, id, model.WatchStatus);

            return Ok();
        }

        [HttpDelete("show/{id}")]
        public IActionResult DeleteShowFromHistory(string id)
        {
            _watchlistService.DeleteShow(CurrentUserId, id);

            return Ok();
        }

        #endregion


        #region Series

        [HttpGet("series/{id}")]
        public IActionResult GetStatusForSeries(string id)
        {
            return Ok(_watchlistService.GetStatusForSeries(CurrentUserId, id));
        }


        [HttpDelete("series/{id}")]
        public IActionResult DeleteSeries(string id)
        {
            _watchlistService.DeleteSeries(CurrentUserId, id);

            return Ok();
        }

        #endregion

        #region Episodes

        [HttpPost("episode/{id}")]
        public IActionResult AddEpisodeToWatching(string id, [FromBody]AddToHistory model)
        {
            if (!VerifyThatShowIsEpisode(id, out var episodeInfo, out var result))
                return result;

            var existingStatus = _watchlistService.GetStatusForEpisode(CurrentUserId, id);
            if (existingStatus == WatchStatus.InProgress || existingStatus == WatchStatus.Completed)
                return BadRequest("The episode is already in progress or completed.");

            _watchlistService.AddToHistory(CurrentUserId, episodeInfo, model.WatchStatus);

            return Ok();
        }

        [HttpPut("episode/{id}")]
        public IActionResult UpdateEpisodeStatus(string id, [FromBody] AddToHistory model)
        {
            if (!VerifyThatShowIsEpisode(id, out var episodeInfo, out var result))
                return result;

            _watchlistService.SetStatus(CurrentUserId, episodeInfo, model.WatchStatus);

            return Ok();
        }

        [HttpDelete("episode/{id}")]
        public IActionResult DeleteEpisode(string id)
        {
            if (VerifyThatShowIsEpisode(id, out _, out var result) == false)
                return result;

            _watchlistService.DeleteEpisode(CurrentUserId, id);

            return Ok();
        }

        private bool VerifyThatShowIsEpisode(string id, out FullEpisodeInfo episodeInfo, out IActionResult result)
        {
            //that's really not a good practice :(

            episodeInfo = _omdbApi.GetEpisodeById(id).Result;
            if (episodeInfo.Type != ShowType.Episode)
            {
                result = BadRequest("The show is not an episode.");
                return false;
            }

            result = null;
            return true;
        }

        #endregion
    }
}