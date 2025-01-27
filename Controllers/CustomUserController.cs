using CustomUserModels.Models;
using CustomUserModels.Services;
using Microsoft.AspNetCore.Mvc;

namespace CustomUserModels.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomUserController : ControllerBase
    {
        private readonly CustomUserService _userService;

        public CustomUserController(CustomUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<CustomUserModel>> CreateUser([FromBody] CustomUserModel user)
        {
            var createdUser = await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }

        [HttpGet]
        public async Task<ActionResult<List<CustomUserModel>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomUserModel>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomUserModel>> UpdateUser(int id, [FromBody] CustomUserModel updatedUser)
        {
            var user = await _userService.UpdateUserAsync(id, updatedUser);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
