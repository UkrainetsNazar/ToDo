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

    public async Task<IdentityResult> RegisterAsync(AuthDTO model)
    {
        var existingUser = await _userManager.FindByEmailAsync(model.Email!);
        if (existingUser != null)
        {
            var error = IdentityResult.Failed(new IdentityError
            {
                Code = "DuplicateEmail",
                Description = "Email already exist."
            });

            return error;
        }

        var user = _mapper.Map<AuthDTO, AppUser>(model);
        var result = await _userManager.CreateAsync(user, model.PasswordHash!);

        return result;
    }

    public async Task<ResponseDTO> LoginAsync(AuthDTO model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email!);

        if (user == null)
        {
            return new ResponseDTO
            {
                Succeeded = false,
                Errors = new List<string> { "User with this email not found." }
            };
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.PasswordHash!);

        if (!isPasswordValid)
        {
            return new ResponseDTO
            {
                Succeeded = false,
                Errors = new List<string> { "Wrong password." }
            };
        }

        return new ResponseDTO
        {
            Succeeded = true,
            Token = _jwtService.GenerateToken(user.Id, user.Email!)
        };
    }
}