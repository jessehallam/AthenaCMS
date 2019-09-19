using Microsoft.AspNetCore.Identity;

namespace Athena.Core.Mapping.Security
{
    public class UserGroup
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public static void Map(MappingProfile profile)
        {
            profile.CreateMap<IdentityRole, UserGroup>();
        }
    }
}