using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Athena.Abstractions.Media;
using Athena.Core.Utility;
using Athena.Data.Context;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Http;

namespace Athena.Core.Media.File
{
    internal class FileMediaHandler : IMediaHandler
    {
        private readonly FileMediaProviderOptions options;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly AthenaData data;

        public FileMediaHandler(FileMediaProviderOptions options, IHttpContextAccessor httpContextAccessor, AthenaData data)
        {
            this.options = options;
            this.httpContextAccessor = httpContextAccessor;
            this.data = data;
        }

        public async Task<ContentObject> AddMediaAsync(IFormFile formFile)
        {
            var fileName = FileMediaHelpers.MakeSafeFileName(formFile.FileName);
            ResolveNewFilePath(ref fileName, out var fullName, out var relativeName);
            var directoryName = Path.GetDirectoryName(fullName);

            if (!Directory.Exists(directoryName))
            {
                Directory.CreateDirectory(directoryName);
            }

            using (var output = System.IO.File.OpenWrite(fullName))
            {
                await formFile.CopyToAsync(output);
            }

            var content = new ContentObject
            {
                Content = string.Empty,
                CreatedById = httpContextAccessor.HttpContext.User.GetUserId(),
                CustomFields = new List<CustomField>
                {
                    new CustomField(MediaMetadataKeys.ContentTypeKey, formFile.ContentType),
                    new CustomField(MediaMetadataKeys.FileNameKey, fileName),
                    new CustomField(MediaMetadataKeys.LengthKey, formFile.Length.ToString()),
                    new CustomField(MediaMetadataKeys.UrlKey,
                        '/' + relativeName
                            .Replace(Path.DirectorySeparatorChar, '/')
                            .Replace(Path.AltDirectorySeparatorChar, '/')),
                    new CustomField(FileMediaMetadataKeys.StorageLocation, fullName) {IsPrivate = true}
                },
                Excerpt = string.Empty,
                PublishedAt = DateTimeOffset.UtcNow,
                Status = ContentStatus.Published,
                TaxonomyTerms = new List<ContentTaxonomyTerm>(),
                Title = fileName,
                TypeId = 2
            };

            data.Contents.Add(content);
            await data.SaveChangesAsync();

            return content;
        }

        public Task<IMediaDescriptor> GetMediaDescriptorAsync(ContentObject content)
        {
            return Task.FromResult<IMediaDescriptor>(FileMediaDescriptor.FromContentObject(content));
        }

        private void ResolveNewFilePath(ref string fileName, out string fullName, out string relativeName)
        {
            var originalFileName = fileName;
            var originalNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
            var originalExtension = Path.GetExtension(fileName);
            var i = 0;
            var subPath = Path.Combine(DateTime.Today.Year.ToString(), DateTime.Today.Month.ToString("00"));

            while (true)
            {
                fileName = i == 0 ? originalFileName : originalNameWithoutExtension + "-" + i + originalExtension;
                relativeName = Path.Combine(subPath, fileName);
                fullName = Path.Combine(options.StoragePath, relativeName);

                if (!System.IO.File.Exists(fullName))
                {
                    return;
                }

                i++;
            }
        }
    }
}