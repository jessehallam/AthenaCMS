using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Athena.Abstractions.Query
{
    public interface IQueryResolver
    {
        Task<QueryResult> QueryAsync(HttpRequest request);
    }
}