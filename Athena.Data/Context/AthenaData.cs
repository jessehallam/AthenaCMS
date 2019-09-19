using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Athena.Data.Context
{
    public class AthenaData : IdentityDbContext<AthenaUser>
    {
        public DbSet<ContentObject> Contents { get; set; }
        public DbSet<ContentType> ContentTypes { get; set; }
        public DbSet<ContentTaxonomyTerm> ContentTaxonomies { get; set; }
        public DbSet<CustomField> CustomFields { get; set; }
        public DbSet<Customization> Customizations { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<RoleSecurityActivity> RoleSecurityActivities { get; set; }
        public DbSet<SecurityActivity> SecurityActivities { get; set; }
        public DbSet<TaxonomyTerm> TaxonomyTerms { get; set; }
        public DbSet<Taxonomy> Taxonomies { get; set; }

        public IQueryable<ContentObject> DetailedContents => Contents.Include(x => x.CreatedBy)
            .Include(x => x.CustomFields)
            .Include(x => x.TaxonomyTerms)
            .Include(x => x.TaxonomyTerms).ThenInclude(x => x.Term)
            .Include(x => x.Type);

        public AthenaData(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(typeof(AthenaData).Assembly);
        }

        public override int SaveChanges()
        {
            OnBeforeSaveChanges();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaveChanges();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            OnBeforeSaveChanges();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = new CancellationToken())
        {
            OnBeforeSaveChanges();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void OnBeforeSaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is ITrackable trackable)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            trackable.CreatedAt = DateTimeOffset.UtcNow;
                            trackable.UpdatedAt = DateTimeOffset.UtcNow;
                            break;

                        case EntityState.Modified:
                            entry.Property(nameof(trackable.CreatedAt)).IsModified = false;
                            trackable.UpdatedAt = DateTimeOffset.UtcNow;
                            break;
                    }
                }
            }
        }
    }
}