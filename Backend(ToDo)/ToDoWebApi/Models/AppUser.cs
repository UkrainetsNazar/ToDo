using Microsoft.AspNetCore.Identity;

namespace ToDoWebApi.Models;

public class AppUser : IdentityUser {
    public List<MyTask>? Tasks {get; set;}
}