using Athena.Abstractions.Media;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

namespace Athena.Core.Media.File
{
    public class FileMediaProvider : IMediaProvider
    {
        public void AddServices(IServiceCollection serviceCollection, IConfiguration configuration)
        {
            var options = new FileMediaProviderOptions();
            configuration.GetSection("media:provider:options").Bind(options);

            serviceCollection.AddSingleton(options);
            serviceCollection.AddScoped<IMediaHandler, FileMediaHandler>();
        }

        public void UseMiddleware(IApplicationBuilder application)
        {
            var options = application.ApplicationServices.GetRequiredService<FileMediaProviderOptions>();
            application.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(options.StoragePath),
                RequestPath = ""
            });
        }
    }
}