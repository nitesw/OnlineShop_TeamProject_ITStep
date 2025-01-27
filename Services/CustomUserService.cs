using CustomUserModels.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomUserModels.Services
{
    public class CustomUserService
    {
        private readonly ApplicationDbContext _context;

        public CustomUserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CustomUserModel> CreateUserAsync(CustomUserModel user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<CustomUserModel>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<CustomUserModel> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<CustomUserModel> UpdateUserAsync(int id, CustomUserModel updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            user.UserName = updatedUser.UserName;
            user.ProfilePicture = updatedUser.ProfilePicture;
            user.Bio = updatedUser.Bio;
            user.Location = updatedUser.Location;
            user.GamesOwned = updatedUser.GamesOwned;
            user.DiscordId = updatedUser.DiscordId;
            user.TwitchUrl = updatedUser.TwitchUrl;
            user.IsOnline = updatedUser.IsOnline;
            user.StatusMessage = updatedUser.StatusMessage;

            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
