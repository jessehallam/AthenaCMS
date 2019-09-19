using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Athena.Data.Context;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Athena.Core.Security
{
    internal class AccessTokenProvider : IAccessTokenProvider
    {
        private readonly AccessTokenOptions options;
        private readonly UserManager<AthenaUser> userManager;
        private readonly AthenaData data;

        public AccessTokenProvider(AccessTokenOptions options, UserManager<AthenaUser> userManager, AthenaData data)
        {
            this.options = options;
            this.userManager = userManager;
            this.data = data;
        }

        public async Task<AccessToken> CreateAccessTokenAsync(AthenaUser user)
        {
            return new AccessToken
            {
                Expires = DateTime.UtcNow.Add(options.Expiration),
                RefreshToken = await CreateRefreshTokenAsync(user),
                Token = await CreateJwtTokenAsync(user)
            };
        }

        public async Task<string> CreateJwtTokenAsync(AthenaUser user)
        {
            var securityTokenHandler = new JwtSecurityTokenHandler();
            var descriptor = new SecurityTokenDescriptor
            {
                Audience = options.Audience,
                Expires = DateTime.UtcNow.Add(options.Expiration),
                IssuedAt = DateTime.UtcNow,
                Issuer = options.Issuer,
                SigningCredentials = options.SigningCredentials,
                Subject = await CreateClaimsIdentityAsync(user)
            };
            var securityToken = securityTokenHandler.CreateJwtSecurityToken(descriptor);
            return securityTokenHandler.WriteToken(securityToken);
        }

        public async Task<string> CreateRefreshTokenAsync(AthenaUser user)
        {
            var refreshToken = new RefreshToken
            {
                Expiration = DateTimeOffset.UtcNow.Add(options.RefreshExpiration),
                Token = Guid.NewGuid().ToString(),
                UserId = user.Id
            };

            data.RefreshTokens.Add(refreshToken);
            await data.SaveChangesAsync();

            var securityTokenHandler = new JwtSecurityTokenHandler();
            var descriptor = new SecurityTokenDescriptor
            {
                Audience = options.Audience,
                Expires = refreshToken.Expiration.DateTime,
                IssuedAt = DateTime.UtcNow,
                NotBefore = DateTime.UtcNow,
                SigningCredentials = options.SigningCredentials,
                Subject = await CreateRefreshClaimsIdentityAsync(user, refreshToken.Token)
            };

            var securityToken = securityTokenHandler.CreateJwtSecurityToken(descriptor);
            return securityTokenHandler.WriteToken(securityToken);
        }

        public async Task<AccessToken> RefreshTokenAsync(string jwt)
        {
            var refreshToken = ParseRefreshToken(jwt);
            var userId = refreshToken.FindFirst(ClaimTypes.NameIdentifier).Value;
            var refreshCode = refreshToken.FindFirst(ClaimConstants.RefreshClaimType).Value;

            var record = await data.RefreshTokens
                .Include(x => x.User)
                .SingleAsync(x => x.UserId == userId && x.Token == refreshCode);
            
            var accessToken = await CreateAccessTokenAsync(record.User);

            data.RefreshTokens.Remove(record);
            data.SaveChanges();

            return accessToken;
        }

        protected async Task<ClaimsIdentity> CreateClaimsIdentityAsync(AthenaUser user)
        {
            var roles = await userManager.GetRolesAsync(user);
            return new ClaimsIdentity(EnumerateClaims());

            IEnumerable<Claim> EnumerateClaims()
            {
                yield return new Claim(ClaimTypes.NameIdentifier, user.Id);
                yield return new Claim(ClaimTypes.Name, user.UserName);
                foreach (var role in roles)
                {
                    yield return new Claim(ClaimTypes.Role, role);
                }
            }
        }

        protected async Task<ClaimsIdentity> CreateRefreshClaimsIdentityAsync(AthenaUser user, string token)
        {
            var identity = await CreateClaimsIdentityAsync(user);
            identity.AddClaim(new Claim(ClaimConstants.RefreshClaimType, token));
            return identity;
        }

        protected ClaimsPrincipal ParseRefreshToken(string jwt)
        {
            var securityTokenHandler = new JwtSecurityTokenHandler();
            return securityTokenHandler.ValidateToken(jwt, options.TokenValidationParameters, out var token);
        }
    }

    internal static class ClaimConstants
    {
        public const string RefreshClaimType = "refresh_token";
    }
}