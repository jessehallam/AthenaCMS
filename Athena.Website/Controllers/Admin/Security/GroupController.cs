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
    [Route("api/admin/security/group")]
    public class GroupController : ControllerBase
    {
        private readonly UserManager<AthenaUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly AthenaData data;
        private readonly IMapper mapper;

        public IQueryable<IdentityRole> Roles => roleManager.Roles.OrderBy(x => x.Name);

        public GroupController(UserManager<AthenaUser> userManager, RoleManager<IdentityRole> roleManager, AthenaData data, IMapper mapper)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.data = data;
            this.mapper = mapper;
        }

        [HttpGet("counts")]
        public IEnumerable<dynamic> Counts()
        {
            var query =
                from role in Roles
                select new
                {
                    role.Id,
                    role.Name,
                    Count = data.UserRoles.Count(x => x.RoleId == role.Id)
                };

            return query.ToList();
        }

        [HttpGet]
        public IEnumerable<UserGroup> List()
        {
            return mapper.Map<IEnumerable<UserGroup>>(Roles.ToList());
        }
    }
}