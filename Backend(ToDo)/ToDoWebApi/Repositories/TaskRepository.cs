using Microsoft.EntityFrameworkCore;
using ToDoWebApi.Models;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _dbContext;

    public TaskRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<MyTask>> GetAllUserTasksAsync(string userId)
    {
        return await _dbContext.Tasks
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }

    public async Task<MyTask> GetTaskByIdAsync(string userId, int taskId)
    {
        var task = await _dbContext.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

        if (task == null)
            throw new Exception($"Task with id {taskId} not found");

        return task;
    }

    public async Task AddTaskAsync(string userId, MyTask myTask)
    {
        myTask.UserId = userId;

        await _dbContext.Tasks.AddAsync(myTask);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateTaskAsync(string userId, int taskId, MyTask updatedTask)
    {
        var existingTask = await _dbContext.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

        if (existingTask == null)
            throw new Exception($"Task with id {taskId} not found or access denied");

        existingTask.IsDone = updatedTask.IsDone;
        existingTask.Text = updatedTask.Text;

        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteTaskAsync(string userId, int taskId)
    {
        var task = await _dbContext.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

        if (task == null)
            throw new Exception($"Task with id {taskId} not found or access denied");

        _dbContext.Tasks.Remove(task);
        await _dbContext.SaveChangesAsync();
    }

    public async Task MarkTaskAsDoneAsync(string userId, int taskId)
    {
        var doneTask = await _dbContext.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

        if (doneTask == null)
            throw new Exception($"Task with id {taskId} not found or access denied");

        doneTask.IsDone = true;
        await _dbContext.SaveChangesAsync();
    }
}
