using System.Threading.Tasks;
using Athena.Core.Extensibility;
using Athena.Core.Mapping;
using Athena.Core.Media;
using Athena.Core.Media.File;
using Athena.Core.Query;
using Athena.Core.Security;
using Athena.Core.Security.Activities;
using Athena.Data.Context;
using Athena.Data.Entities;
using Athena.Website.AspNet;
using Athena.Website.Models;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Converters;

namespace Athena.Website
{
    public class Startup
    {
        public readonly IConfiguration Configuration;
        private readonly IHostingEnvironment environment;

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            this.environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPlugins();
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddFileMedia(Configuration);

            services.AddDbContext<AthenaData>(options => { options.UseSqlServer(Configuration["database:connectionString"]); });

            services.AddMvc(options =>
                {
                    options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ClientError), 400));
                    options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ClientError), 401));
                    options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ClientError), 403));
                    options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ClientError), 404));
                    options.Filters.Add(new ProducesResponseTypeAttribute(typeof(ServerError), 500));
                })
                .AddJsonOptions(options => { options.SerializerSettings.Converters.Add(new StringEnumConverter() {CamelCaseText = true}); })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddIdentity<AthenaUser, IdentityRole>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 5;
                    options.Password.RequiredUniqueChars = 1;
                }).AddEntityFrameworkStores<AthenaData>()
                .AddDefaultTokenProviders();

            services.AddQueryResolver();
            services.AddAccessTokens(Configuration);
            services.AddSecurityActivities();
            services.AddSwagger();
            services.AddFileMedia(Configuration);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseApiStandardizedStatusCodes();
            app.UseFileMedia();
            app.UseStaticFiles();
            app.UseSwaggerDocumentation();
            app.UseAuthentication();
            app.UseGlobalExceptionHandling();
            app.UseMvc();
            app.UseApi404();
            app.UseAdminPanel();
        }
    }
}