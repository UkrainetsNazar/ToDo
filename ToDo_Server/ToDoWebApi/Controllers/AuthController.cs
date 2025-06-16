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
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(new { Errors = errors });
        }

        var result = await _authService.RegisterAsync(model);

        if (!result.Succeeded)
        {
            return BadRequest(new { Errors = result.Errors });
        }

        return Ok(new { Message = "Registration succeeded" });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthDTO model)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(new { Errors = errors });
        }

        var response = await _authService.LoginAsync(model);

        if (!response.Succeeded)
        {
            return BadRequest(new { Errors = response.Errors });
        }

        return Ok(new { Token = response.Token });
    }
}