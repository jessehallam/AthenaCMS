using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Athena.Core.Security.Activities
{
    public static class SecurityActivitiyExtensions
    {
        public static void AddSecurityActivities(this IServiceCollection services)
        {
            services.AddScoped<IAuthorizationHandler, SecurityActivityHandler>();
            services.AddSingleton<IAuthorizationPolicyProvider, SecurityActivityPolicyProvider>();
        }
    }
}