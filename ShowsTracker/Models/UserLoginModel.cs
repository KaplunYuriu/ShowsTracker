using System.ComponentModel.DataAnnotations;

namespace ShowsTracker.Models
{
    public class UserLoginModel
    {
        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string Password { get; set; }
    }
}