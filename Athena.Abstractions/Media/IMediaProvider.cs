using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Athena.Abstractions.Media
{

    public interface IMediaProvider
    {
        void AddServices(IServiceCollection serviceCollection, IConfiguration configuration);
        void UseMiddleware(IApplicationBuilder application);
    }
}