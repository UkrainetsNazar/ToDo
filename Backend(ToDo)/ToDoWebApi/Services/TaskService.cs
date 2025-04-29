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

    public async Task<List<GetTasksDTO>> GetAllActiveTasksAsync(string userId)
    {
        var allUserTasks = await _taskRepository.GetAllActiveTasksAsync(userId);
        return _mapper.Map<List<GetTasksDTO>>(allUserTasks);
    }

    public async Task<List<GetTasksDTO>> GetAllDoneTasksAsync(string userId)
    {
        var allUserTasks = await _taskRepository.GetAllDoneTasksAsync(userId);
        return _mapper.Map<List<GetTasksDTO>>(allUserTasks);
    }

    public async Task<GetTasksDTO> AddTaskAsync(string userId, CreateTaskDTO createTaskDto)
    {
        var taskEntity = _mapper.Map<MyTask>(createTaskDto);
        taskEntity.UserId = userId;

        var createdTask = await _taskRepository.AddTaskAsync(userId, taskEntity);
        return _mapper.Map<GetTasksDTO>(createdTask);
    }

    public async Task DeleteTaskAsync(string userId, int taskId)
    {
        await _taskRepository.DeleteTaskAsync(userId, taskId);
    }

    public async Task UpdateTaskAsync(string userId, int taskId, CreateTaskDTO updatedTaskDto)
    {
        var updatedEntity = _mapper.Map<MyTask>(updatedTaskDto);
        await _taskRepository.UpdateTaskAsync(userId, taskId, updatedEntity);
    }

    public async Task MarkTaskAsDoneAsync(string userId, int taskId)
    {
        await _taskRepository.MarkTaskAsDoneAsync(userId, taskId);
    }

    public async Task<MyTask> GetTaskByIdAsync(string userId, int taskId)
    {
        var task = await _taskRepository.GetTaskByIdAsync(userId, taskId);
        return task;
    }
}
