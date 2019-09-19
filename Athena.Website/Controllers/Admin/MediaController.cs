using System;
using System.Linq;
using System.Threading.Tasks;
using Athena.Abstractions.Media;
using Athena.Core.Mapping.Content;
using Athena.Core.Security.Activities;
using Athena.Data.Context;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/media")]
    public class MediaController : ControllerBase
    {
        private readonly IMediaHandler mediaHandler;
        private readonly AthenaData data;
        private readonly IMapper mapper;

        public MediaController(IMediaHandler mediaHandler, AthenaData data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;
            this.mediaHandler = mediaHandler;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            var content = await mediaHandler.AddMediaAsync(file);
            return Ok(mapper.Map<DetailedContentDto>(content));
        }
    }
}