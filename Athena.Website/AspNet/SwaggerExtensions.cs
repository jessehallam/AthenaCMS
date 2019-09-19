using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace Athena.Website.AspNet
{
    public static class SwaggerExtensions
    {
        public static void AddSwagger(this IServiceCollection services)
        {
            var config = services.GetConfiguration().GetSection("swagger");

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info
                {
                    Title = config["title"],
                    Version = config["version"]
                });

                options.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Bearer Authorization",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });

                var security = new Dictionary<string, IEnumerable<string>>();
                security.Add("Bearer", new string[0]);

                options.AddSecurityRequirement(security);

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                options.IncludeXmlComments(xmlPath);
            });
        }

        public static void UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            var config = app.ApplicationServices.GetRequiredService<IConfiguration>().GetSection("swagger");

            if (config.GetValue<bool>("enabled"))
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
        }
    }
}