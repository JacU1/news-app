using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace News_App_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
        public PingController() {}

        [Route("Startupcall")]
        [HttpPost]
        public IActionResult Startupcall()
        {
            Console.WriteLine("StartUp Call");
            return NoContent();
        }
    }
}
