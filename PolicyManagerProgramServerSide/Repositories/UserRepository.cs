using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PolicyManagerProgramServerSide.Data;
using PolicyManagerProgramServerSide.Model;
using System;

namespace PolicyManagerProgramServerSide.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PolicyContext _context;

        public UserRepository(PolicyContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> Create(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetUsersPerPage(int pageNumber, int pageSize)
        {
            return await _context.Users.Skip((pageNumber - 1) * pageSize)
                                        .Take(pageSize)
                                        .ToListAsync();

        }
        public async Task<ActionResult<IEnumerable<User>>> FilterUsers(string p_searchLetters)
        {
            var users = await _context.Users
                .Where(s => s.FullName.Contains(p_searchLetters))
                .ToListAsync();

           
            return users;
        }
        public async Task Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
