using Microsoft.AspNetCore.Identity;

namespace ToDoWebApi.Models;

public class User : IdentityUser {
    public List<Task>? Tasks {get; set;}
}