using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Athena.Core.Mapping.Content;
using Athena.Data.Context;
using Athena.Data.Entities;
using Athena.Website.AspNet;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Remotion.Linq.Clauses;

namespace Athena.Website.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/content")]
    public class ContentController : ControllerBase
    {
        private readonly AthenaData data;
        private readonly IMapper mapper;

        public ContentController(AthenaData data, IMapper mapper)
        {
            this.data = data;
            this.mapper = mapper;
        }

        [HttpGet("by-type/{typeId}")]
        public IActionResult GetByType(int typeId)
        {
            var content = data.DetailedContents.Where(item => item.TypeId == typeId);
            return Ok(mapper.Map<IEnumerable<DetailedContentDto>>(content));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var content = data.DetailedContents.Single(x => x.Id == id);

            if (content == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<DetailedContentDto>(content));
        }

        [HttpPost]
        public IActionResult Create(DetailedContentDto model)
        {
            var content = new ContentObject
            {
                Content = model.Content,
                CreatedById = User.GetUserId(),
                CustomFields = model.CustomFields
                    .Select(field => new CustomField {FieldKey = field.FieldKey, FieldValue = field.FieldValue})
                    .ToList(),
                Excerpt = model.Excerpt,
                PublishedAt = model.Status == ContentStatus.Published ? (DateTimeOffset?) DateTimeOffset.UtcNow : null,
                Status = model.Status,
                Title = model.Title,
                TypeId = model.Type.Id
            };

            content.TaxonomyTerms = model.TaxonomyTerms
                .Select(term => new ContentTaxonomyTerm
                {
                    Content = content,
                    Term = data.TaxonomyTerms.Find(term.Id)
                }).ToList();

            data.Contents.Add(content);
            data.SaveChanges();
            content = data.DetailedContents.Single(x => x.Id == content.Id);
            return Ok(mapper.Map<DetailedContentDto>(content));
        }

        [HttpPut]
        public async Task<IActionResult> Update(DetailedContentDto model)
        {
            var entity = data.DetailedContents.SingleOrDefault(x => x.Id == model.Id);

            if (entity == null)
                return NotFound();

            entity.Content = model.Content;
            entity.Excerpt = model.Excerpt;
            entity.Status = model.Status;
            entity.Title = model.Title;

            if (!entity.PublishedAt.HasValue && model.Status == ContentStatus.Published)
                entity.PublishedAt = DateTimeOffset.Now;

            UpdateCustomFields(entity.CustomFields, model.CustomFields, entity);
            UpdateTaxonomyTerms(entity.TaxonomyTerms, model.TaxonomyTerms, entity);

            await data.SaveChangesAsync();
            return Ok(mapper.Map<DetailedContentDto>(data.DetailedContents.Single(x => x.Id == entity.Id)));
        }

        private void UpdateCustomFields(ICollection<CustomField> customFields, ICollection<DetailedCustomFieldDto> model,
            ContentObject content)
        {
            var destinationById = customFields.ToDictionary(x => x.Id);
            var sourceById = model.ToDictionary(x => x.Id);

            var itemsToRemove = customFields.Where(field => !sourceById.ContainsKey(field.Id)).ToList();
            var itemsToAdd = model.Where(field => !destinationById.ContainsKey(field.Id)).ToList();
            var itemsToUpdate = customFields.Where(field => sourceById.ContainsKey(field.Id)).ToList();

            data.CustomFields.RemoveRange(itemsToRemove);

            data.CustomFields.AddRange(itemsToAdd.Select(field => new CustomField
            {
                ContentId = content.Id,
                FieldKey = field.FieldKey,
                FieldValue = field.FieldValue
            }));

            foreach (var item in itemsToUpdate)
            {
                var source = sourceById[item.Id];
                item.FieldKey = source.FieldKey;
                item.FieldValue = source.FieldValue;
            }
        }

        private void UpdateTaxonomyTerms(
            ICollection<ContentTaxonomyTerm> taxonomyTerms,
            ICollection<DetailedTermDto> model,
            ContentObject content)
        {
            var destinationById = taxonomyTerms.ToDictionary(x => (x.TermId, x.Term.TaxonomyId));
            var sourceById = model.ToDictionary<DetailedTermDto, (int TermId, int TaxonomyId)>(x => (x.Id, x.TaxonomyId));

            var itemsToRemove = taxonomyTerms.Where(term => !sourceById.ContainsKey((term.TermId, term.Term.TaxonomyId)));
            var itemsToAdd = model.Where(term => !destinationById.ContainsKey((term.Id, term.TaxonomyId)));

            data.ContentTaxonomies.RemoveRange(itemsToRemove);
            data.ContentTaxonomies.AddRange(
                from term in itemsToAdd
                select new ContentTaxonomyTerm
                {
                    ContentId = content.Id,
                    TermId = term.Id
                });
        }
    }
}