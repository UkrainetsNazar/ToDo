using ToDoWebApi.Models;

public interface ITaskRepository
{
    Task<List<MyTask>> GetAllTasksAsync(string userId);
    Task<MyTask> GetTaskByIdAsync(string userId, int id);
    Task AddTaskAsync(MyTask myTask);
    Task UpdateTaskAsync(int id, MyTask myTask);
    Task DeleteTaskAsync(int id);
}