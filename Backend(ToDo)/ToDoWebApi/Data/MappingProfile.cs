using AutoMapper;
using ToDoWebApi.Models;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateTaskDTO, MyTask>().ReverseMap();
        CreateMap<GetTasksDTO, MyTask>().ReverseMap();
        CreateMap<AuthDTO, AppUser>().ReverseMap();
    }
}