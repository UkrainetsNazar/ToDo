using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("task")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TaskController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetAllActiveUserTasks()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
            return Unauthorized();

        var taskList = await _taskService.GetAllActiveTasksAsync(userId);
        return Ok(taskList);
    }

    [HttpGet("done")]
    public async Task<IActionResult> GetAllDoneUserTasks()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
            return Unauthorized();

        var taskList = await _taskService.GetAllDoneTasksAsync(userId);
        return Ok(taskList);
    }

    [HttpGet("{taskId}")]
    public async Task<IActionResult> GetUserTaskById(int taskId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
            return Unauthorized();

        var task = await _taskService.GetTaskByIdAsync(userId, taskId);
        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> AddNewTask([FromBody] CreateTaskDTO newTask)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
            return Unauthorized();

        await _taskService.AddTaskAsync(userId, newTask);
        return Ok("Task was added successfully");
    }

    [HttpPatch("{taskId}")]
    public async Task<IActionResult> EditTask(int taskId, [FromBody] CreateTaskDTO updatedTask)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
            return Unauthorized();

        await _taskService.UpdateTaskAsync(userId, taskId, updatedTask);
        return Ok("Task was edited successfully");
    }

    [HttpDelete("{taskId}")]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
            return Unauthorized();

        await _taskService.DeleteTaskAsync(userId, taskId);
        return Ok("Task was deleted successfully");
    }
}
