using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShowsTracker.Entities;
using ShowsTracker.Services;

namespace ShowsTracker.Controllers
{
    public class AddToHistory
    {
        public string ShowId { get; set; }
        public WatchStatus WatchStatus { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchlistController : ControllerBase
    {
        private int CurrentUserId => Convert.ToInt32(User.Identity.Name);


        private readonly IWatchlistService _watchlistService;

        public WatchlistController(IWatchlistService watchlistService)
        {
            _watchlistService = watchlistService;
        }

        [HttpGet("show/{id}")]
        public IActionResult GetStatusForShow(string id)
        {
            return Ok(_watchlistService.GetStatusForShow(CurrentUserId, id).ToString());
        }

        [HttpPost("show")]
        public IActionResult AddToWatching([FromBody]AddToHistory model)
        {
            var existingStatus = _watchlistService.GetStatusForShow(CurrentUserId, model.ShowId);
            if (existingStatus == WatchStatus.InProgress || existingStatus == WatchStatus.Completed)
                return BadRequest("The show is already in progress");

            _watchlistService.AddToHistory(CurrentUserId, model.ShowId, WatchStatus.InProgress);

            return Ok();
        }

        [HttpPut("show")]
        public IActionResult UpdateShowStatus([FromBody] AddToHistory model)
        {
            _watchlistService.SetStatus(CurrentUserId, model.ShowId, model.WatchStatus);

            return Ok();
        }

        [HttpDelete("show/{id}")]
        public IActionResult DeleteShowFromHistory(string id)
        {
            _watchlistService.DeleteShow(CurrentUserId, id);

            return Ok();
        }
    }
}