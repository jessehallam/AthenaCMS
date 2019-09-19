using System.Collections.Generic;
using System.Linq;
using Athena.Core.Mapping.Security;
using Athena.Data.Context;
using Athena.Data.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers.Admin.Security
{
    [ApiController]
    [Route("api/admin/security/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AthenaData data;
        private readonly UserManager<AthenaUser> userManager;
        private readonly IMapper mapper;

        private IQueryable<AthenaUser> Users => userManager.Users.OrderBy((x => x.UserName));

        public UserController(AthenaData data, UserManager<AthenaUser> userManager, IMapper mapper)
        {
            this.data = data;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<UserDto> List()
        {
            return mapper.Map<IEnumerable<UserDto>>(Users);
        }
    }
}