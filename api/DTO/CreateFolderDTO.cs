namespace api.DTO
{
    public class CreateFolderDTO
    {
        public string JsonData { get; set; }

        public string Path { get; set; }

        public bool Append { get; set; } = true;
    }
}
