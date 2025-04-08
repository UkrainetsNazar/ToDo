using ToDoWebApi.Models;

public interface ITaskService{
    Task<List<GetTasksDTO>> GetAllUserTasksAsync(string userId);
    Task<MyTask> GetTaskByIdAsync(string userId, int taskId);
    Task AddTaskAsync(string userId, CreateTaskDTO createTaskDto);
    Task DeleteTaskAsync(string userId, int taskId);
    Task UpdateTaskAsync(string userId, int taskId, CreateTaskDTO updatedTaskDto);
    Task MarkTaskAsDoneAsync(string userId, int taskId);
}