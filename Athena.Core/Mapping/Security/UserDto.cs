using Athena.Data.Entities;

namespace Athena.Core.Mapping.Security
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="AthenaUser"/>
    public class UserDto
    {
        public string Email { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }

        public static void Map(MappingProfile profile)
        {
            profile.CreateMap<AthenaUser, UserDto>();
        }
    }
}