using ToDoWebApi.Models;

public interface ITaskService{
    Task<List<GetTasksDTO>> GetAllActiveTasksAsync(string userId);
    Task<List<GetTasksDTO>> GetAllDoneTasksAsync(string userId);
    Task<MyTask> GetTaskByIdAsync(string userId, int taskId);
    Task<GetTasksDTO> AddTaskAsync(string userId, CreateTaskDTO createTaskDto);
    Task DeleteTaskAsync(string userId, int taskId);
    Task UpdateTaskAsync(string userId, int taskId, CreateTaskDTO updatedTaskDto);
    Task MarkTaskAsDoneAsync(string userId, int taskId);
}