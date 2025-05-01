using Microsoft.AspNetCore.Identity;

public interface IAuthService{
    Task<IdentityResult> RegisterAsync(AuthDTO model);
    Task<ResponseDTO> LoginAsync(AuthDTO model);
} 