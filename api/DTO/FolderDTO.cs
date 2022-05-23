namespace api.DTO
{
    public class FolderDTO
    {
        public string Name { get; set; }

        public string Path { get; set; }

        public int MyProperty { get; set; }
        name: string;
    path: string;
    children: INode[];
    isActive: boolean;
    }
}
