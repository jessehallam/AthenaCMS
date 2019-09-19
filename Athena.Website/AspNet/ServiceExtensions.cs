using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Athena.Website.AspNet
{
    public static class ServiceExtensions
    {
        public static IConfiguration GetConfiguration(this IServiceCollection services)
        {
            using (var provider = services.BuildServiceProvider())
            {
                return provider.GetRequiredService<IConfiguration>();
            }
        }
    }
}