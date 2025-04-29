using System.ComponentModel.DataAnnotations;
using System.Net;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AuthDTO model)
    {
        if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.PasswordHash))
            throw new HttpException("Email and password are required.", HttpStatusCode.BadRequest);

        if (!new EmailAddressAttribute().IsValid(model.Email))
            throw new HttpException("Invalid email format.", HttpStatusCode.BadRequest);

        await _authService.RegisterAsync(model);
        return Ok("Registration succeed");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthDTO model)
    {
        var response = await _authService.LoginAsync(model);
        return Ok(response);
    }
}