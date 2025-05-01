using System.ComponentModel.DataAnnotations;

public class AuthDTO
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Wrong format of email")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string? PasswordHash { get; set; }
}