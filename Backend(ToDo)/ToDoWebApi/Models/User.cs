using Microsoft.AspNetCore.Identity;

namespace ToDoWebApi.Models;

public class User : IdentityUser {
    public List<MyTask>? Tasks {get; set;}
}