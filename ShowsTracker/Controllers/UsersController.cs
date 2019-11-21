using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShowsTracker.Infrastructure;
using ShowsTracker.Models;
using ShowsTracker.Repositories;
using ShowsTracker.Services;

namespace ShowsTracker.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly IOptions<AppSettings> _appSettings;

        public UsersController(IUserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings;
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody] UserLoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = _userService.Authenticate(model.EmailAddress, model.Password);
            if (user == null)
                return BadRequest("Username of password is incorrect");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { token = tokenString });
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody]UserRegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = _userService.Create(model);

            return Ok(new UserModel
            {
                Id = user.Id,
                EmailAddress = user.EmailAddress,
                FullName = user.FullName
            });
        }
    }
}