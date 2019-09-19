using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;

namespace Athena.Website.AspNet
{
    public static class AdminHandlingExtensions
    {
        public static void UseAdminPanel(this IApplicationBuilder app)
        {
            var hostingEnvironment = app.ApplicationServices.GetRequiredService<IHostingEnvironment>();

            app.Map("/admin", admin =>
            {
                if (hostingEnvironment.IsDevelopment())
                {
                    admin.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                    {
                        ConfigFile = Path.Combine(hostingEnvironment.ContentRootPath, "Admin2", "webpack", "webpack.config.js"),
                        EnvironmentVariables = new Dictionary<string, string>
                        {
                            {"NODE_ENV", "development"}
                        }
                    });
                }

                admin.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "Admin";
                    spa.Options.DefaultPage = "/admin/dist/index.html";
                });
            });
        }
    }
}