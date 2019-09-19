using System;

namespace Athena.Data.Entities
{
    public interface ITrackable
    {
        DateTimeOffset CreatedAt { get; set; }
        DateTimeOffset UpdatedAt { get; set; }
    }
}