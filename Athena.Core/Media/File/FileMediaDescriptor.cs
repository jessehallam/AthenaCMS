using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Athena.Abstractions.Media;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Http;

namespace Athena.Core.Media.File
{
    internal class FileMediaDescriptor : IMediaDescriptor
    {
        public long ContentLength { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public string StorageLocation { get; set; }
        public PathString Url { get; set; }

        public Task<Stream> OpenReadStreamAsync()
        {
            return Task.FromResult<Stream>(System.IO.File.OpenRead(StorageLocation));
        }

        public static FileMediaDescriptor FromContentObject(ContentObject content)
        {
           var customFields = content.CustomFields.Aggregate(new Dictionary<string, List<string>>(),
                (dictionary, field) =>
                {
                    if (!dictionary.ContainsKey(field.FieldKey))
                    {
                        dictionary.Add(field.FieldKey, new List<string>());
                    }

                    dictionary[field.FieldKey].Add(field.FieldValue);
                    return dictionary;
                });

           return new FileMediaDescriptor
           {
               ContentLength = long.Parse(customFields[MediaMetadataKeys.LengthKey].First()),
               ContentType = customFields[MediaMetadataKeys.ContentTypeKey].First(),
               FileName = customFields[MediaMetadataKeys.FileNameKey].First(),
               StorageLocation = customFields[FileMediaMetadataKeys.StorageLocation].First(),
               Url = customFields[MediaMetadataKeys.UrlKey].First()
           };
        }
    }
}