using System.Collections.Generic;
using Athena.Core.Extensibility;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/plugin")]
    public class PluginController : ControllerBase
    {
        private readonly IEnumerable<PluginInfo> plugins;

        public PluginController(IEnumerable<PluginInfo> plugins)
        {
            this.plugins = plugins;
        }

        [HttpGet]
        public dynamic GetPlugins()
        {
            return plugins;
        }
    }
}