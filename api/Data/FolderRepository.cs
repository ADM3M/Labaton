using api.DTO;
using api.Interfaces;
using System.Text.Json.Nodes;

namespace api.Data
{
    public class FolderRepository : IFolderRepository
    {
        public JsonObject CreateFolder(CreateFolderDTO folderDTO)
        {
            var jsonObj = JsonNode.Parse(folderDTO.JsonData)?.AsObject();

            DirectoryInfo dir = null;

            if (!folderDTO.Append)
            {
                Directory.Delete(folderDTO.Path, recursive: true);
                Directory.CreateDirectory(folderDTO.Path);
            }

            dir ??= new(folderDTO.Path);

            GenerateFoldersRecursive(jsonObj, dir);

            return GetFolders(dir);
        }

        private void GenerateFoldersRecursive(JsonObject jsonObj, DirectoryInfo currentDir)
        {
            if (!jsonObj.Any())
            {
                return;
            }

            foreach (var node in jsonObj)
            {
                string path = currentDir.FullName + "\\" + node.Key;

                var newDir = !Directory.Exists(path) ? Directory.CreateDirectory(path)
                    : Directory.CreateDirectory(path + "-1");

                GenerateFoldersRecursive(node.Value.AsObject(), newDir);
            }
        }

        public JsonObject GetFolders(DirectoryInfo dir)
        {
            var subfolderNames = dir.EnumerateDirectories();

            if (!subfolderNames.Any())
            {
                return new JsonObject(new List<KeyValuePair<string, JsonNode>> {
                KeyValuePair.Create<string, JsonNode>("name", JsonValue.Create(dir.Name)),
                KeyValuePair.Create<string, JsonNode>("path", JsonValue.Create(dir.FullName)),
                KeyValuePair.Create<string, JsonNode>("children", new JsonArray()),
            });
            }

            var json = new JsonObject();
            json.Add("name", JsonValue.Create(dir.Name));
            json.Add("path", JsonValue.Create(dir.FullName));

            json.Add("children", new JsonArray(
                subfolderNames.Select(x =>
                {
                    return GetFolders(x);
                }).ToArray()
            ));

            return json;
        }
    }
}
