using System;
using Microsoft.IdentityModel.Tokens;

namespace Athena.Core.Security
{
    internal class AccessTokenOptions
    {
        public string Audience { get; set; }
        public TimeSpan Expiration { get; set; }
        public string Issuer { get; set; }
        public TimeSpan RefreshExpiration { get; set; }
        public SymmetricSecurityKey SecurityKey { get; set; }
        public SigningCredentials SigningCredentials { get; set; }
        public TokenValidationParameters TokenValidationParameters { get; set; }
    }
}