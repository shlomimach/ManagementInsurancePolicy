using Microsoft.AspNetCore.Mvc;
using PolicyManagerProgramServerSide.Model;

namespace PolicyManagerProgramServerSide.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(int id);
        Task<User> Create(User user);
        Task Update(User user);
        Task Delete(int id);
        Task<IEnumerable<User>> GetUsersPerPage(int pageNumber, int pageSize);
        Task<ActionResult<IEnumerable<User>>> FilterUsers(string p_searchLetters);
    }
}
