using System.Linq;
using ShowsTracker.Entities;
using ShowsTracker.Infrastructure;

namespace ShowsTracker.Repositories
{
    public interface IUserRepository
    {
        int Create(User user);
        User FindById(int id);
        User FindByEmail(string emailAddress);
        void Delete(int id);
    }

    public class UserRepository : IUserRepository
    {
        private readonly IDataAccess _dataAccess;

        public UserRepository(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public int Create(User user)
        {
            return _dataAccess.Query<int>(
                @"INSERT INTO [User] (EmailAddress, FullName, PasswordHash, PasswordSalt) VALUES (@emailAddress, @fullName, @passwordHash, @passwordSalt);
                                     SELECT CAST(SCOPE_IDENTITY() AS INT);",
                new
                {
                    emailAddress = user.EmailAddress,
                    fullName = user.FullName,
                    passwordHash = user.PasswordHash,
                    passwordSalt = user.PasswordSalt
                }).Single();
        }

        public User FindById(int id)
        {
            return _dataAccess.Query<User>("SELECT User_PK as Id, EmailAddress, FullName, PasswordHash, PasswordSalt FROM [User] WHERE User_PK = @id AND IsDeleted = 0", new { id })
                .SingleOrDefault();
        }

        public User FindByEmail(string emailAddress)
        {
            return _dataAccess.Query<User>("SELECT User_PK as Id, EmailAddress, FullName, PasswordHash, PasswordSalt FROM [User] WHERE IsDeleted = 0")
                .FirstOrDefault();
        }

        public void Delete(int id)
        {
            _dataAccess.Execute("UPDATE [User] SET IsDeleted = 0 WHERE User_PK = @id", new { id });
        }
    }
}