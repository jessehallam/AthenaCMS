using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Models
{
    public static class ControllerErrorExtensions
    {
        public static IActionResult Error(this ControllerBase controller, string code, string description)
        {
            return controller.BadRequest(new ClientError(code, description));
        }
    }
}