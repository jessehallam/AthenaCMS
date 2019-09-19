using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Athena.Website.AspNet
{
    public static class ApiHandlingExtensions
    {
        public static void UseApi404(this IApplicationBuilder app)
        {
            app.Use((context, next) =>
            {
                if (context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.StatusCode = 404;
                    return Task.CompletedTask;
                }

                return next();
            });
        }

        public static void UseApiStandardizedStatusCodes(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                await next();
                var response = context.Response;

                if (!context.Request.Path.StartsWithSegments("/api") ||
                    response.HasStarted ||
                    response.ContentLength.HasValue ||
                    !string.IsNullOrEmpty(response.ContentType))
                    return;

                switch (response.StatusCode)
                {
                    case 401:
                        response.ContentType = "application/json";
                        await response.WriteAsync("{\"code\":\"E_UNAUTHORIZED\",\"description\":\"The request did not provide a valid JWT bearer token.\"}");
                        break;

                    case 403:
                        response.ContentType = "application/json";
                        await response.WriteAsync("{\"code\":\"E_FORBIDDEN\",\"description\":\"The request provided a JWT bearer token that lacks the necessary access.\"}");
                        break;

                    case 404:
                        response.ContentType = "application/json";
                        await response.WriteAsync("{\"code\":\"E_NOTFOUND\",\"description\":\"The specified URL was invalid.\"}");
                        break;
                }
            });
        }
    }
}