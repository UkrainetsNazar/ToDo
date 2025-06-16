using Microsoft.AspNetCore.Identity;

public interface IAuthService{
    Task<ResponseDTO> RegisterAsync(AuthDTO model);
    Task<ResponseDTO> LoginAsync(AuthDTO model);
} 