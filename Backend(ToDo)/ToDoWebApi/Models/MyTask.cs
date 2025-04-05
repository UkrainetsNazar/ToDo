namespace ToDoWebApi.Models;

public class MyTask {
    public int Id {get; set;}
    public string? Text {get; set;}
    public bool? IsDone { get; set; }
    public AppUser? User {get; set;}
    public string? UserId {get; set;}
}