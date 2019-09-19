using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Athena.Website.Models
{
    public class ClientError
    {
        public string Code { get; set; }
        public string Description { get; set; }

        public ClientError()
        {
        }

        public ClientError(string code, string description)
        {
            Code = code;
            Description = description;
        }
    }
}
