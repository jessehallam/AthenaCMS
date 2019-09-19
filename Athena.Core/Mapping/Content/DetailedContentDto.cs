using System;
using System.Collections.Generic;
using System.Linq;
using Athena.Data.Entities;

namespace Athena.Core.Mapping.Content
{
    /// <seealso cref="ContentObject"/>
    public class DetailedContentDto
    {
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public DetailedCreatedByDto CreatedBy { get; set; }
        public string Excerpt { get; set; }
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTimeOffset? PublishedAt { get; set; }
        public string Title { get; set; }
        public ContentStatus Status { get; set; }
        public DetailedContentTypeDto Type { get; set; }
        public ICollection<DetailedCustomFieldDto> CustomFields { get; set; }
        public ICollection<DetailedTermDto> TaxonomyTerms { get; set; }

        public static void Map(MappingProfile profile)
        {
            profile.CreateMap<ContentObject, DetailedContentDto>()
                .ForMember(des => des.TaxonomyTerms, map => map.MapFrom(src => src.TaxonomyTerms.Select(x => x.Term)))
                .ForMember(des => des.CustomFields, map => map.MapFrom(src => src.CustomFields.Where(x => !x.IsPrivate)));
            profile.CreateMap<AthenaUser, DetailedCreatedByDto>();
            profile.CreateMap<CustomField, DetailedCustomFieldDto>()
                .ForMember(des => des.Private, map => map.MapFrom(src => src.IsPrivate))
                .ForMember(des => des.Protected, map => map.MapFrom(src => src.IsProtected));
            profile.CreateMap<TaxonomyTerm, DetailedTermDto>();
            profile.CreateMap<ContentType, DetailedContentTypeDto>();
        }
    }
}