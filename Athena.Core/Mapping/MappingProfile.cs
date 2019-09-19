using Athena.Core.Mapping.Content;
using Athena.Core.Mapping.Security;
using Athena.Data.Entities;
using AutoMapper;

namespace Athena.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            DetailedContentDto.Map(this);
            UserGroup.Map(this);
            UserDto.Map(this);
        }
    }
}