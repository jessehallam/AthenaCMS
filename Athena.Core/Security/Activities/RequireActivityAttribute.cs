using Microsoft.AspNetCore.Authorization;

namespace Athena.Core.Security.Activities
{
    public class RequireActivityAttribute : AuthorizeAttribute
    {
        private string activityName;

        public string ActivityName
        {
            get => activityName;
            set
            {
                activityName = value;
                Policy = $"{SecurityPolicyConstants.PolicyPrefix}{value}";
            }
        }

        public RequireActivityAttribute(string activityName)
        {
            ActivityName = activityName;
        }
    }
}