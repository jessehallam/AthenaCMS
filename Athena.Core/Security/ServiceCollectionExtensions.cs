using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Athena.Core.Security
{
    public static class ServiceCollectionExtensions
    {
        public static void AddAccessTokens(this IServiceCollection services, IConfiguration configuration)
        {
            var section = configuration.GetSection("security:jwt");

            var options = new AccessTokenOptions
            {
                Audience = section["audience"],
                Expiration = section.GetValue<TimeSpan>("expiration"),
                Issuer = section["issuer"],
                RefreshExpiration = section.GetValue<TimeSpan>("refreshExpiration"),
                SecurityKey = new SymmetricSecurityKey(Convert.FromBase64String(section["signingKey"]))
            };

            options.SigningCredentials = new SigningCredentials(options.SecurityKey, SecurityAlgorithms.HmacSha256Signature);
            options.TokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = options.SecurityKey,
                ValidAudience = options.Audience,
                ValidIssuer = options.Issuer,
                ValidateAudience = !string.IsNullOrEmpty(options.Audience),
                ValidateIssuer = !string.IsNullOrEmpty(options.Issuer),
                ValidateIssuerSigningKey = true
            };

            services.AddAuthentication(auth =>
                {
                    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    auth.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(jwt =>
                {
                    jwt.RequireHttpsMetadata = false;
                    jwt.SaveToken = true;
                    jwt.TokenValidationParameters = options.TokenValidationParameters;
                });

            services.AddSingleton(options);
            services.AddScoped<IAccessTokenProvider, AccessTokenProvider>();
        }
    }
}