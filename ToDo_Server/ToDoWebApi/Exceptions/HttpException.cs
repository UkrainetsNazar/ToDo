using System.Net;

public class HttpException : Exception
{
    public HttpStatusCode Status { get; set; }
    public HttpException(HttpStatusCode status)
    {
        Status = status;
    }

    public HttpException(string? message, HttpStatusCode status) : base(message)
    {
        Status = status;
    }
}