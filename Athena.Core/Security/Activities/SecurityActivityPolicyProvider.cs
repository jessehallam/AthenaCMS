using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Athena.Core.Security.Activities
{
    internal class SecurityActivityPolicyProvider : IAuthorizationPolicyProvider
    {
        public Task<AuthorizationPolicy> GetDefaultPolicyAsync()
        {
            return Task.FromResult<AuthorizationPolicy>(null);
        }

        public Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
        {
            if (policyName.StartsWith(SecurityPolicyConstants.PolicyPrefix))
            {
                policyName = policyName.Substring(SecurityPolicyConstants.PolicyPrefix.Length);

                var policyBuilder = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddRequirements(new SecurityActivityRequirement(policyName));

                return Task.FromResult<AuthorizationPolicy>(policyBuilder.Build());
            }

            return Task.FromResult<AuthorizationPolicy>(null);
        }
    }
}