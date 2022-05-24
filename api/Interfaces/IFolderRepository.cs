using api.DTO;
using System.Text.Json.Nodes;

namespace api.Interfaces
{
    public interface IFolderRepository
    {
        JsonObject GetFolders(DirectoryInfo dir);

        JsonObject CreateFolder(CreateFolderDTO folderDTO);
    }
}
