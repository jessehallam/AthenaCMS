using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Athena.Abstractions.Media
{
    public interface IMediaDescriptor
    {
        /// <summary>
        /// The length, in bytes, of the media file.
        /// </summary>
        long ContentLength { get; }
        
        /// <summary>
        /// The content type of the file.
        /// </summary>
        string ContentType { get; }

        /// <summary>
        /// The file name.
        /// </summary>
        string FileName { get; }

        /// <summary>
        /// The URL to resolve the file.
        /// </summary>
        PathString Url { get; }

        /// <summary>
        /// Opens a readable stream to the file.
        /// </summary>
        /// <returns></returns>
        Task<Stream> OpenReadStreamAsync();
    }
}