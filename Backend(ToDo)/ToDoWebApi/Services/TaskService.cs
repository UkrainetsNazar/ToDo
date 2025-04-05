using AutoMapper;
using ToDoWebApi.Models;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;
    private readonly IMapper _mapper;

    public TaskService(ITaskRepository taskRepository, IMapper mapper)
    {
        _taskRepository = taskRepository;
        _mapper = mapper;
    }

    public async Task<List<GetTasksDTO>> GetAllUserTasksAsync(string userId)
    {
        var allUserTasks = await _taskRepository.GetAllTasksAsync(userId);
        return _mapper.Map<List<GetTasksDTO>>(allUserTasks);
    }

    public async Task AddNewTaskAsync(string userId, CreateTaskDTO createTaskDto)
    {
        var taskEntity = _mapper.Map<MyTask>(createTaskDto);
        taskEntity.UserId = userId;

        await _taskRepository.AddTaskAsync(userId, taskEntity);
    }

    public async Task DeleteTaskAsync(string userId, int taskId)
    {
        await _taskRepository.DeleteTaskAsync(userId, taskId);
    }

    public async Task EditTaskAsync(string userId, int taskId, CreateTaskDTO updatedTaskDto)
    {
        var updatedEntity = _mapper.Map<MyTask>(updatedTaskDto);
        await _taskRepository.UpdateTaskAsync(userId, taskId, updatedEntity);
    }
}
