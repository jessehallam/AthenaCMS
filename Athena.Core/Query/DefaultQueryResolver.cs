using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Athena.Abstractions.Query;
using Athena.Core.Utility;
using Athena.Data.Context;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.DependencyInjection;

namespace Athena.Core.Query
{
    public static class QueryServiceExtensions
    {
        public static void AddQueryResolver(this IServiceCollection services)
        {
            services.AddScoped<IQueryResolver, DefaultQueryResolver>();
        }
    }

    public class DefaultQueryResolver : IQueryResolver
    {
        private static readonly Regex MetaKeyRegex = new Regex(@"^meta_(.*?)(?:_(.*?))?$");
        private static readonly Regex TaxonomyRegex = new Regex(@"^taxonomy\((.*?)\)$");

        private readonly AthenaData data;

        public DefaultQueryResolver(AthenaData data)
        {
            this.data = data;
        }

        public async Task<QueryResult> QueryAsync(HttpRequest request)
        {
            int? limit = null;
            int? skip = null;
            var where = PredicateBuilder.True<ContentObject>();
            var query = request.Query;
            var typeFound = false;
            var result = new QueryResult {Errors = new List<string>(), Items = new List<ContentObject>()};

            foreach (var key in query.Keys)
            {
                switch (key)
                {
                    case "after":
                        if (!int.TryParse(query["after"], out var after))
                        {
                            result.Errors.Add("'after' must be of type 'integer'");
                        }
                        else
                        {
                            where = where.And(item => item.Id > after);
                        }

                        break;

                    case "before":
                        int beforeId = int.Parse(query["before"]);
                        where = where.And(item => item.Id < beforeId);
                        if (!int.TryParse(query["before"], out var before))
                        {
                            result.Errors.Add("'before' must be of type 'integer'");
                        }
                        else
                        {
                            where = where.And(item => item.Id < before);
                        }

                        break;

                    case "limit":
                        if (!int.TryParse(query["limit"], out var _limit))
                        {
                            result.Errors.Add("'limit' must be of type 'integer'");
                        }
                        else
                        {
                            limit = _limit;
                        }

                        break;

                    case "skip":
                        if (!int.TryParse(query["skip"], out var _skip))
                        {
                            result.Errors.Add("'skip' must be of type 'integer'");
                        }
                        else
                        {
                            skip = _skip;
                        }

                        break;

                    case "type":
                        if (int.TryParse(query["type"], out int typeId))
                        {
                            where = where.And(item => item.TypeId == typeId);
                        }
                        else
                        {
                            where = where.And(item => item.Type.Name == query["type"]);
                        }

                        typeFound = true;
                        break;

                    default:
                        var metaMatch = MetaKeyRegex.Match(key);
                        if (metaMatch.Success)
                        {
                            if (!HandleMetaField(metaMatch, query[key], ref where, out var error))
                            {
                                result.Errors.Add(error);
                            }
                        }

                        var taxonomyMatch = TaxonomyRegex.Match(key);
                        if (taxonomyMatch.Success)
                        {
                            if (!HandleTaxonomyField(taxonomyMatch, query[key], ref where, out var error))
                            {
                                result.Errors.Add(error);
                            }
                        }

                        break;
                }
            }

            if (!typeFound)
            {
                result.Errors.Add("'type' is required");
                return result;
            }

            if (EnumerableExtensions.Any(result.Errors))
            {
                return result;
            }

            IQueryable<ContentObject> queryable = data.Contents;
            queryable = queryable.Where(where);

            if (skip.HasValue)
            {
                queryable = queryable.Skip(skip.Value);
            }

            queryable = queryable.Take(limit ?? 20);
            result.Items = await queryable.ToListAsync();

            return result;
        }

        private bool HandleMetaField(Match match, string value, ref Expression<Func<ContentObject, bool>> where, out string error)
        {
            var customFieldKey = match.Groups[1].Value;
            var modifier = match.Groups[2].Value ?? "";

            switch (modifier)
            {
                case "contains":
                    where = where.And(item => item.CustomFields.Single(x => x.FieldKey == customFieldKey).FieldValue.Contains(value));
                    break;

                case "endswith":
                    where = where.And(item => item.CustomFields.Single(x => x.FieldKey == customFieldKey).FieldValue.EndsWith(value));
                    break;

                case "ne":
                    where = where.And(item => item.CustomFields.Single(x => x.FieldKey == customFieldKey).FieldValue != value);
                    break;

                case "startswith":
                    where = where.And(item => item.CustomFields.Single(x => x.FieldKey == customFieldKey).FieldValue.StartsWith(value));
                    break;

                case "":
                    where = where.And(item => item.CustomFields.Single(x => x.FieldKey == customFieldKey).FieldValue == value);
                    break;

                default:
                    error = $"'{match.Value}' has invalid modifier '{modifier}'";
                    return false;
            }

            error = null;
            return true;
        }

        private bool HandleTaxonomyField(Match match, string value, ref Expression<Func<ContentObject, bool>> where, out string error)
        {
            var taxononyNameOrId = match.Groups[1].Value;

            if (int.TryParse(taxononyNameOrId, out var taxonomyId))
            {
                where = where.And(item => item.TaxonomyTerms.Any(term => term.Term.TaxonomyId == taxonomyId && term.Term.Name == value));
            }
            else
            {
                where = where.And(item =>
                    item.TaxonomyTerms.Any(term => term.Term.Taxonomy.Name == taxononyNameOrId && term.Term.Name == value));
            }

            error = null;
            return true;
        }
    }
}