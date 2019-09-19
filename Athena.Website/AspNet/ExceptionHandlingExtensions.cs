using System;
using System.Dynamic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Athena.Website.AspNet
{
    public static class ExceptionHandlingExtensions
    {
        public static void UseGlobalExceptionHandling(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var exceptionHandler = context.Features.Get<IExceptionHandlerPathFeature>();
                    var hostingEnvironment = context.RequestServices.GetRequiredService<IHostingEnvironment>();

                    context.Response.StatusCode = 500;

                    if (hostingEnvironment.IsDevelopment())
                    {
                        context.Response.ContentType = "application/json";
                        var exceptionDto = CreateExceptionDto(exceptionHandler.Error, true);
                        var json = (string)JsonConvert.SerializeObject(exceptionDto);
                        await context.Response.WriteAsync(json);
                    }
                });
            });
        }

        private static dynamic CreateExceptionDto(Exception exception, bool includeStackTrace = false)
        {
            dynamic o = new ExpandoObject();

            o.message = exception.Message;
            o.type = exception.GetType().Name;

            if (includeStackTrace)
            {
                o.stackTrace = exception.StackTrace;
            }

            if (exception.InnerException != null)
            {
                o.innerException = CreateExceptionDto(exception.InnerException);
            }

            return o;
        }
    }
}
