using System;
using System.Security.Cryptography;
using System.Text;

namespace ShowsTracker.Infrastructure
{
    public class PasswordHasher
    {
        private const string PasswordSalt = "cnXmMzJ11ds2aBw03yrSX8KbOgr5N3YNWuMI3VJ4lsfTb6XDaSkRjX7cUEDF";

        public static string DoubleHash(string password)
        {
            return CreateSHA256Hash(CreateSHA256Hash(password, PasswordSalt), PasswordSalt);
        }

        public static string CreateSHA256Hash(string plainText, string salt)
        {
            return CreateSHA256Hash(plainText + salt);
        }

        public static string CreateSHA256Hash(string plainText)
        {
            using (var sha256Hasher = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(plainText);
                var hashBytes = sha256Hasher.ComputeHash(bytes);
                return Convert.ToBase64String(hashBytes);
            }
        }

        public static byte[] CreateSalt(int size)
        {
            using (var cryptoProvider = new RNGCryptoServiceProvider())
            {
                var salt = new byte[size];
                cryptoProvider.GetBytes(salt);
                return salt;
            }
        }
    }
}