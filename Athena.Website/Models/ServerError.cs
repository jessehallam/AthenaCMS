using Newtonsoft.Json;

namespace Athena.Website.Models
{
    public class ServerError
    {
        public string Code { get; set; }
        public string Description { get; set; }

        [JsonProperty("more_info", NullValueHandling = NullValueHandling.Ignore)]
        public string MoreInfo { get; set; }
    }
}