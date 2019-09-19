using System.Threading.Tasks;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Http;

namespace Athena.Abstractions.Media
{
    public interface IMediaHandler
    {
        /// <summary>
        /// Adds a media file to the content collection.
        /// </summary>
        /// <param name="formFile">A file sent from an HttpRequest.</param>
        /// <returns>The new content object.</returns>
        Task<ContentObject> AddMediaAsync(IFormFile formFile);

        /// <summary>
        /// Gets the media descriptor for a media content.
        /// </summary>
        /// <param name="content">The content object.</param>
        /// <returns>A media descriptor.</returns>
        Task<IMediaDescriptor> GetMediaDescriptorAsync(ContentObject content);
    }
}