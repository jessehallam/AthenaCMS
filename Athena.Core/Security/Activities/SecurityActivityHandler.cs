using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Athena.Data.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Athena.Core.Security.Activities
{
    internal class SecurityActivityHandler : AuthorizationHandler<SecurityActivityRequirement>
    {
        private readonly AthenaData data;

        public SecurityActivityHandler(AthenaData data)
        {
            this.data = data;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, SecurityActivityRequirement requirement)
        {
            var roles = context.User
                .FindAll(ClaimTypes.Role)
                .Select(claim => claim.Value)
                .ToList();

            var activities =
                from roleActivity in data.RoleSecurityActivities
                where roleActivity.Activity.ActivityName == requirement.ActivityName
                      && roles.Contains(roleActivity.Role.Name)
                select 1;

            if (!await activities.AnyAsync())
            {
                context.Fail();
            }
            else
            {
                context.Succeed(requirement);
            }
        }
    }
}