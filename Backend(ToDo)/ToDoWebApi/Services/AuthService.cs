using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ToDoWebApi.Models;

public class AuthService : IAuthService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;
    private readonly JwtService _jwtService;
    public AuthService(UserManager<AppUser> userManager, IMapper mapper, JwtService jwtService)
    {
        _jwtService = jwtService;
        _mapper = mapper;
        _userManager = userManager;
    }
    public async Task RegisterAsync(AuthDTO model)
    {

        if (await _userManager.FindByEmailAsync(model.Email!) != null)
            throw new HttpException("Email is already exists.", HttpStatusCode.BadRequest);

        var user = _mapper.Map<AppUser>(model);

        var result = await _userManager.CreateAsync(user, model.Password!);

        if (!result.Succeeded)
            throw new HttpException(string.Join(" ", result.Errors.Select(x => x.Description)), HttpStatusCode.BadRequest);
    }

    public async Task<ResponseDTO> LoginAsync(AuthDTO model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email!);

        if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password!))
            throw new HttpException("Invalid login or password.", HttpStatusCode.BadRequest);

        return new ResponseDTO
        {
            Email = user.Email,
            Token = _jwtService.GenerateToken(user.Id, user.Email!)
        };
    }
}