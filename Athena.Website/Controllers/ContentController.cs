using System.Collections.Generic;
using System.Linq;
using Athena.Abstractions.Query;
using Athena.Data.Context;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers
{
    [ApiController]
    [Route("api/content")]
    public class ContentController : ControllerBase
    {
        private readonly AthenaData data;
        private readonly IQueryResolver queryResolver;

        public ContentController(AthenaData data, IQueryResolver queryResolver)
        {
            this.data = data;
            this.queryResolver = queryResolver;
        }

        [HttpGet("counts")]
        public IActionResult GetContentCounts()
        {
            var query =
                from contentType in data.ContentTypes
                join content in data.Contents on contentType.Id equals content.TypeId into ContentJoined
                from content in ContentJoined.DefaultIfEmpty()
                group content by new
                {
                    TypeId = contentType.Id,
                    Status = (ContentStatus?)content.Status,
                    TypeName = contentType.Name
                }
                into g
                select new ContentCountTemp
                {
                    Count = data.Contents.Count(x => x.TypeId == g.Key.TypeId && x.Status == g.Key.Status),
                    Status = g.Key.Status,
                    TypeId = g.Key.TypeId,
                    TypeName = g.Key.TypeName
                };

            var rows = query.ToList();
            var rowsByTypeId = rows.Aggregate(
                new Dictionary<int, ICollection<ContentCountTemp>>(),
                (dictionary, row) =>
                {
                    if (!dictionary.ContainsKey(row.TypeId))
                    {
                        dictionary.Add(row.TypeId, new List<ContentCountTemp>());
                    }

                    dictionary[row.TypeId].Add(row);
                    return dictionary;
                });

            return Ok(rowsByTypeId.Aggregate(new List<dynamic>(), (list, pair) =>
            {
                list.Add(new
                {
                    total = pair.Value.Sum(x => x.Count),
                    typeId = pair.Key,
                    typeName = pair.Value.First().TypeName
                });
                return list;
            }));
        }

        private class ContentCountTemp
        {
            public int Count { get; set; }
            public ContentStatus? Status { get; set; }
            public int TypeId { get; set; }
            public string TypeName { get; set; }
        }
    }
}