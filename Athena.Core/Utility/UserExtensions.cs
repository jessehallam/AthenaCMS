using System.Security.Claims;

namespace Athena.Core.Utility
{
    public static class UserExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            var claim = user.FindFirst(ClaimTypes.NameIdentifier);
            return claim?.Value;
        }
    }
}