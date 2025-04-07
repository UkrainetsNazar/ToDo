public interface IAuthService{
    Task RegisterAsync(AuthDTO model);
    Task<ResponseDTO> LoginAsync(AuthDTO model);
} 