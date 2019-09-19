using System.Collections.Generic;
using System.Linq;
using Athena.Data.Entities;

namespace Athena.Abstractions.Query
{
    public class QueryResult
    {
        public ICollection<string> Errors { get; set; }
        public ICollection<ContentObject> Items { get; set; }
        public bool Succeeded => !Errors.Any();
    }
}
