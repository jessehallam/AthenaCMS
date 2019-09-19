namespace Athena.Core.Mapping.Content
{
    public class DetailedCustomFieldDto
    {
        public string FieldKey { get; set; }
        public string FieldValue { get; set; }
        public int Id { get; set; }
        public bool Private { get; set; }
        public bool Protected { get; set; }
    }
}