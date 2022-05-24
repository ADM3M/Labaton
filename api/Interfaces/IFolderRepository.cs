using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;

namespace api.Interfaces
{
    public interface IFolderRepository
    {
        JsonObject GetFolders(DirectoryInfo dir);

        JsonObject CreateFolder(string jsonData, string path, bool append);
    }
}
