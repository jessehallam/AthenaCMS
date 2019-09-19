using Microsoft.AspNetCore.Authorization;
using Remotion.Linq.Clauses;

namespace Athena.Core.Security.Activities
{
    internal class SecurityActivityRequirement : IAuthorizationRequirement
    {
        public string ActivityName { get; set; }

        public SecurityActivityRequirement()
        {
        }

        public SecurityActivityRequirement(string activityName)
        {
            ActivityName = activityName;
        }
    }
}