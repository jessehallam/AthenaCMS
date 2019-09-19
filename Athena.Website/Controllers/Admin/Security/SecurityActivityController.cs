using System.Collections.Generic;
using System.Linq;
using Athena.Data.Context;
using Athena.Data.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers.Admin.Security
{
    [ApiController]
    [Route("api/admin/security/security-activity")]
    public class SecurityActivityController : ControllerBase
    {
        private readonly AthenaData data;

        public SecurityActivityController(AthenaData data)
        {
            this.data = data;
        }

        [HttpGet]
        public IEnumerable<SecurityActivity> List()
        {
            return data.SecurityActivities.OrderBy(x => x.ActivityName).ToList();
        }
    }
}