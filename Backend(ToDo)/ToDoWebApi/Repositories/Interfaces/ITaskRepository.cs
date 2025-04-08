using ToDoWebApi.Models;

public interface ITaskRepository
{
    Task<List<MyTask>> GetAllUserTasksAsync(string userId);
    Task<MyTask> GetTaskByIdAsync(string userId, int id);
    Task AddTaskAsync(string userId, MyTask myTask);
    Task UpdateTaskAsync(string userId, int id, MyTask myTask);
    Task DeleteTaskAsync(string userId, int id);
    Task MarkTaskAsDoneAsync(string userId, int taskId);
}