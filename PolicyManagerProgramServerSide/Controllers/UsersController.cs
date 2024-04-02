using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PolicyManagerProgramServerSide.Model;
using PolicyManagerProgramServerSide.Repositories;

namespace PolicyManagerProgramServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userRepository.GetAll();
            
           

            return Ok(users);
        }
  
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            await _userRepository.Create(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.ID }, user);
        }

        ///// <summary>
        ///// ביצועים
        ///// Pageintaionבהנתן העובדה שאנו משתמשים ב LazyLoadingבוצע שימוש ב 
        ///// </summary>
        ///// <param name="pageNumber"></param>
        ///// <param name="pageSize"></param>
        ///// <returns></returns>
        [HttpGet("UsersPerPage")]
        public async Task<ActionResult<User>> GetUsersPerPage(int pageNumber = 1, int pageSize = 10)
        {
            var users =  await _userRepository.GetUsersPerPage(pageNumber, pageSize);
            return Ok(users);


        }
        /// <summary>
        /// Note: Full-Text Search can be utilized here for improved search capabilities,
        /// but it's not compatible with my current database configuration.
        /// </summary>
        /// <param name="p_searchLetters"></param>
        /// <returns></returns>
        [HttpGet("SearchUsers")]
        public async Task<ActionResult<IEnumerable<User>>> FilterUsers(string p_searchLetters)
        {
            var users = await _userRepository.FilterUsers(p_searchLetters);

            if (users == null)
            {
                return NotFound("No matching students found.");
            }

            return users;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.ID)
            {
                return BadRequest();
            }
            await _userRepository.Update(user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userRepository.Delete(id);
            return NoContent();
        }
    }
}

