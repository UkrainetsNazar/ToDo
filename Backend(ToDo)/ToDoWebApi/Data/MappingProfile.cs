using AutoMapper;
using ToDoWebApi.Models;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateTaskDTO, MyTask>().ReverseMap();
        CreateMap<GetTasksDTO, MyTask>().ReverseMap();
        CreateMap<AuthDTO, AppUser>()
        .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
        .ForMember(dest => dest.PasswordHash, opt => opt.Ignore());
    }
}