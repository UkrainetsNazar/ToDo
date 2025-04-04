using Microsoft.EntityFrameworkCore;
using ToDoWebApi.Models;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _dbContext;

    public TaskRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<MyTask>> GetAllTasksAsync(string userId)
    {
        return await _dbContext.Tasks
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }

    public async Task<MyTask> GetTaskByIdAsync(string userId, int id)
    {
        var task = await _dbContext.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (task == null)
            throw new Exception($"Task with id {id} not found");

        return task;
    }

    public async Task AddTaskAsync(MyTask myTask)
    {
        await _dbContext.Tasks.AddAsync(myTask);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateTaskAsync(int id, MyTask updatedTask)
    {
        var existingTask = await _dbContext.Tasks.FindAsync(id);

        if (existingTask == null)
            throw new Exception($"Task with id {id} does not exist");

        existingTask.IsDone = updatedTask.IsDone;
        existingTask.Text = updatedTask.Text;

        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteTaskAsync(int id)
    {
        var task = await _dbContext.Tasks.FindAsync(id);

        if (task == null)
            throw new Exception($"There is nothing to delete");

        _dbContext.Tasks.Remove(task);
        await _dbContext.SaveChangesAsync();
    }
}
