namespace ToDoWebApi.Models;

public class Task {
    public string? Text {get; set;}
    public bool? IsDone { get; set; }
    public User? User {get; set;}
}