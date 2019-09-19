using System.Threading.Tasks;
using Athena.Core.Security;
using Athena.Data.Entities;
using Athena.Website.Models;
using Athena.Website.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers
{
    [ApiController]
    [Route("api/auth")]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly IAccessTokenProvider accessTokenProvider;
        private readonly UserManager<AthenaUser> userManager;
        private readonly SignInManager<AthenaUser> signInManager;

        public AuthController(IAccessTokenProvider accessTokenProvider, UserManager<AthenaUser> userManager,
            SignInManager<AthenaUser> signInManager)
        {
            this.accessTokenProvider = accessTokenProvider;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        /// <summary>
        /// Exchange a refresh token for a new access token.
        /// </summary>
        /// <response code="200">Success</response>
        /// <response code="409">The refresh token was invalid</response>
        [HttpPost("refresh")]
        [ProducesResponseType(200, Type = typeof(AccessToken))]
        // [ProducesResponseType(409, Type = typeof(ClientErrorResponse))]
        public async Task<IActionResult> Refresh(RefreshModel model)
        {
            try
            {
                return Ok(await accessTokenProvider.RefreshTokenAsync(model.Token));
            }
            catch
            {
                return this.Error("E_INVALID_REFRESH_TOKEN", "Refresh token was invalid");
            }
        }

        /// <summary>
        /// Creates a bearer access token.
        /// </summary>
        /// <response code="403">The credentials were invalid</response>
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(AccessToken))]
        // [ProducesResponseType(409, Type = typeof(ClientErrorResponse))]
        public async Task<IActionResult> SignIn(SignInModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username) ?? await userManager.FindByEmailAsync(model.Username);

            if (user != null)
            {
                var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    return Ok(await accessTokenProvider.CreateAccessTokenAsync(user));
                }
            }

            return this.Error("E_INVALID_CREDENTIALS", "Invalid username or password");
        }
    }
}