using System.Collections.Generic;
using System.Threading.Tasks;
using Athena.Data.Context;
using Athena.Data.Entities;
using Athena.Website.Models.Setup;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace Athena.Website.Controllers
{
    [ApiController]
    [Route("api/setup")]
    public class SetupController : ControllerBase
    {
        private readonly AthenaData data;
        private readonly UserManager<AthenaUser> userManager;

        public SetupController(AthenaData data, UserManager<AthenaUser> userManager)
        {
            this.data = data;
            this.userManager = userManager;
        }

        /// <summary>
        /// Performs initial setup of the CMS.
        /// </summary>
        /// <response code="200">Success</response>
        /// <response code="403">Setup is invalid because setup has already been performed</response>
        /// <response code="409">Setup was unsuccessful due to one or more errors</response>
        [HttpPost]
        [ProducesResponseType(200, Type = null)]
        [ProducesResponseType(403, Type = null)]
        [ProducesResponseType(409, Type = typeof(IEnumerable<IdentityError>))]
        public async Task<IActionResult> SetupAsync(SetupModel model)
        {
            // Rule: If there are any users, disallow setup.
            if (data.Users.Any())
            {
                return Forbid();
            }

            var user = new AthenaUser
            {
                Email = model.AdminEmail,
                EmailConfirmed = true,
                UserName = model.AdminUsername
            };

            var result = await userManager.CreateAsync(user, model.AdminPassword);

            if (!result.Succeeded)
            {
                return Conflict(result.Errors);
            }

            result = await userManager.AddToRoleAsync(user, "Administrators");

            if (!result.Succeeded)
            {
                return Conflict(result.Errors);
            }

            result = await userManager.SetLockoutEnabledAsync(user, false);

            if (!result.Succeeded)
            {
                return Conflict(result.Errors);
            }

            return new EmptyResult();
        }
    }
}