using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace Athena.Core.Extensibility
{
    public class PluginInfo
    {
        public AuthorInfo Author { get; }
        public string Description { get; }
        public string DisplayName { get; }
        public string License { get; }
        public string Name { get; }
        public string Version { get; }

        internal PluginInfo(dynamic package)
        {
            Author = new AuthorInfo
            {
                Email = (string) package["author"]["email"],
                Name = (string) package["author"]["name"],
                Url = (string) package["author"]["url"]
            };
            Description = (string) package["description"];
            DisplayName = (string) package["displayName"];
            License = (string) package["license"];
            Name = (string) package["name"];
            Version = (string) package["version"];
        }
    }

    public class AuthorInfo
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    public static class PluginExtensions
    {
        public static void AddPlugins(this IServiceCollection services)
        {
            using (var provider = services.BuildServiceProvider())
            {
                var env = provider.GetRequiredService<IHostingEnvironment>();
                var pluginPath = Path.Combine(env.ContentRootPath, "Plugins");
                var discoverer = new PluginDiscoverer(pluginPath);
                var plugins = discoverer.GetPlugins().ToList();

                foreach (var plugin in plugins)
                {
                    services.AddSingleton(plugin);
                }
            }
        }
    }

    internal class PluginDiscoverer
    {
        private readonly string rootPath;

        public PluginDiscoverer(string rootPath)
        {
            this.rootPath = rootPath;
        }

        public IEnumerable<PluginInfo> GetPlugins()
        {
            if (!Directory.Exists(rootPath)) yield break;

            foreach (var directory in Directory.EnumerateDirectories(rootPath))
            {
                var loader = new PluginLoader(directory);
                yield return loader.LoadPlugin();
            }
        }
    }

    internal class PluginLoader
    {
        private readonly string pluginDirectory;

        public PluginLoader(string pluginDirectory)
        {
            this.pluginDirectory = pluginDirectory;
        }

        public PluginInfo LoadPlugin()
        {
            var packageJsonFile = Path.Combine(pluginDirectory, "package.json");

            if (!File.Exists(packageJsonFile))
                throw new InvalidOperationException("Plugin is missing required file: package.json");

            dynamic packageInfo = JsonConvert.DeserializeObject(File.ReadAllText(packageJsonFile));
            return new PluginInfo(packageInfo);
        }
    }
}