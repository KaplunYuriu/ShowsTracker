using System;
using ShowsTracker.Entities;
using ShowsTracker.Infrastructure;
using ShowsTracker.Models;
using ShowsTracker.Repositories;

namespace ShowsTracker.Services
{
    public interface IUserService
    {
        User FindById(int id);
        User Authenticate(string emailAddress, string password);
        User Create(UserRegisterModel user);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User FindById(int id)
        {
            return _userRepository.FindById(id);
        }

        public User Authenticate(string emailAddress, string password)
        {
            var user = _userRepository.FindByEmail(emailAddress);
            if (user == null || string.IsNullOrEmpty(password))
                return null;

            if (!VerifyPassword(user, password))
                return null;

            return user;
        }

        public User Create(UserRegisterModel user)
        {
            var existingUser = _userRepository.FindByEmail(user.EmailAddress);
            if (existingUser != null)
                return existingUser;

            var salt = Convert.ToBase64String(PasswordHasher.CreateSalt(10));

            var createdUserId = _userRepository.Create(new User
            {
                EmailAddress = user.EmailAddress,
                FullName = user.FullName,
                PasswordHash = PasswordHasher.CreateSHA256Hash(user.Password, salt),
                PasswordSalt = salt
            });

            return FindById(createdUserId);
        }

        private bool VerifyPassword(User user, string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException(nameof(password));

            var hash = PasswordHasher.CreateSHA256Hash(password, user.PasswordSalt);

            return string.Equals(user.PasswordHash, hash, StringComparison.Ordinal);
        }
    }
}