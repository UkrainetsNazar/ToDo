using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ToDoWebApi.Models;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<MyTask> Tasks {get; set;}
}