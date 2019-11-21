using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;

namespace ShowsTracker.Infrastructure
{
    public interface IDataAccess
    {
        IEnumerable<T> Query<T>(string sql, dynamic param = null);
        int Execute(string sql, dynamic param = null);
    }

    public class DataAccess : IDataAccess
    {
        private readonly string _connectionString;

        public DataAccess(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<T> Query<T>(string sql, dynamic param = null)
        {
            using (var conn = GetOpenConnection())
                return SqlMapper.Query<T>(conn, sql, param);
        }

        public int Execute(string sql, dynamic param = null)
        {
            using (var conn = GetOpenConnection())
                return SqlMapper.Execute(conn, sql, param);
        }

        private SqlConnection GetOpenConnection()
        {
            var conn = new SqlConnection(_connectionString);
            conn.Open();
            return conn;
        }
    }
}