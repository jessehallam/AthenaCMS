using System;

namespace Athena.Core.Security
{
    public class AccessToken
    {
        public DateTimeOffset Expires { get; set; }
        public string RefreshToken { get; set; }
        public string Token { get; set; }
    }
}