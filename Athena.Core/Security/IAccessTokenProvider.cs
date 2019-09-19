using System.Threading.Tasks;
using Athena.Data.Entities;

namespace Athena.Core.Security
{
    public interface IAccessTokenProvider
    {
        Task<AccessToken> CreateAccessTokenAsync(AthenaUser user);
        Task<string> CreateJwtTokenAsync(AthenaUser user);
        Task<AccessToken> RefreshTokenAsync(string jwt);
    }
}