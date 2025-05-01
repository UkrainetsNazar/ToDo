using System.ComponentModel.DataAnnotations;

public class AuthDTO
{
    [Required(ErrorMessage = "Email є обов'язковим")]
    [EmailAddress(ErrorMessage = "Невірний формат email")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Пароль є обов'язковим")]
    public string? PasswordHash { get; set; }
}