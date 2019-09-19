using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Athena.Core.Security.Activities;
using Athena.Core.Utility;
using Athena.Data.Context;
using Athena.Data.Entities;
using Athena.Website.Models.Taxonomy;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers
{
    [ApiController]
    [Route("api/term")]
    public class TermController : ControllerBase
    {
        private readonly AthenaData data;

        public TermController(AthenaData data)
        {
            this.data = data;
        }

        [HttpPost]
       //  [RequireActivity("Content.AdminWrite")]
        public IActionResult Create(CreateTermModel model)
        {
            // Rule: (Name, TypeId) must be a unique tuple.
            if (data.TaxonomyTerms.Any(x => x.TaxonomyId == model.TaxonomyId && x.Name == model.Name))
            {
                return Conflict("Name and TypeId must be unique");
            }

            // Rule: Type must exist.
            var taxonomy = data.Taxonomies.Find(model.TaxonomyId);

            if (taxonomy == null)
            {
                return Conflict("Type must exist");
            }

            // Rule: If ParentId is specified, it must exist.
            if (model.ParentId.HasValue)
            {
                var parent = data.TaxonomyTerms.Find(model.ParentId);

                if (parent == null)
                {
                    return Conflict("Invalid ParentId");
                }

                // Rule: Parent must belong to the same type.
                if (parent.TaxonomyId != model.TaxonomyId)
                {
                    return Conflict("Parent term is not a member of the same type");
                }
            }

            var term = new TaxonomyTerm
            {
                Name = model.Name,
                ParentId = model.ParentId,
                TaxonomyId = model.TaxonomyId
            };

            data.Add(term);
            data.SaveChanges();
            return Ok(term);
        }

        [HttpGet("counts")]
        public IActionResult GetCounts()
        {
            var query =
                from taxonomy in data.ContentTaxonomies
                group taxonomy by new {taxonomy.TermId, taxonomy.Term.Name}
                into g
                select new
                {
                    Id = g.Key.TermId,
                    g.Key.Name,
                    Count = g.Count()
                };

            return Ok(query.ToList());
        }

        [HttpGet]
        public IEnumerable<TaxonomyTerm> List(int? typeId = null, string type = null)
        {
            Expression<Func<TaxonomyTerm, bool>> predicate = term => true;

            if (typeId.HasValue)
            {
                predicate = predicate.And(term => term.TaxonomyId == typeId);
            }

            if (!string.IsNullOrEmpty(type))
            {
                predicate = predicate.And(term => term.Taxonomy.Name == type);
            }

            return data.TaxonomyTerms.Where(predicate).OrderBy(x => x.Name).ToList();
        }
    }
}