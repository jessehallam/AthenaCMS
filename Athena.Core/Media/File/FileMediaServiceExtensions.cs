using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Athena.Core.Media.File
{
    public static class FileMediaServiceExtensions
    {
        private static readonly FileMediaProvider provider = new FileMediaProvider();

        public static void AddFileMedia(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            provider.AddServices(serviceCollection, configuration);
        }

        public static void UseFileMedia(this IApplicationBuilder application)
        {
            provider.UseMiddleware(application);
        }
    }
}