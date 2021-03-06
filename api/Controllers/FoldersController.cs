using api.DTO;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class FoldersController : ControllerBase
    {
        private readonly IFolderRepository _folderRepository;

        public FoldersController(IFolderRepository folderRepository)
        {
            _folderRepository = folderRepository;
        }

        [HttpGet("")]
        public ActionResult GetFolders()
        {
            var baseDir = new DirectoryInfo(@"d:\test");

            var json = _folderRepository.GetFolders(baseDir);

            return Ok(json);
        }

        [HttpPost("Create")]
        public ActionResult CreateFolders([FromBody] CreateFolderDTO folderDTO)
        {
            if (folderDTO is null)
            {
                return BadRequest("You need body for this request");
            }

            if (string.IsNullOrEmpty(folderDTO.Path) || string.IsNullOrEmpty(folderDTO.JsonData))
            {
                return BadRequest("path or data not specified");
            }

            var createdFolder = _folderRepository.CreateFolder(folderDTO);

            return Ok(createdFolder);
        }

    }
}
