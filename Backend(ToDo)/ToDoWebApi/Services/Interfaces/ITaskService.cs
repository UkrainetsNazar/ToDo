using ToDoWebApi.Models;

public interface ITaskService{
    Task<List<GetTasksDTO>> GetAllUserTasksAsync(string userId);
    Task AddNewTaskAsync(string userId, CreateTaskDTO createTaskDto);
    Task DeleteTaskAsync(string userId, int taskId);
    Task EditTaskAsync(string userId, int taskId, CreateTaskDTO updatedTaskDto);
}