using api.Interfaces;
using System.Text.Json.Nodes;

namespace api.Data
{
    public class FolderRepository : IFolderRepository
    {
        public JsonObject CreateFolder(string jsonData, string path)
        {
            throw new NotImplementedException();
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
