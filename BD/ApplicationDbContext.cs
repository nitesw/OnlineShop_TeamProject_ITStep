using Microsoft.EntityFrameworkCore;
using CustomUserModels.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) 
    { }

    public DbSet<CustomUserModel> Users { get; set; }
    
}
