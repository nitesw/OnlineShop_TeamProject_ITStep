using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace CustomUserModels.Models
{
    public class CustomUserModel
{
    public int Id { get; set; }
    public string? UserName { get; set; }
    public string? ProfilePicture { get; set; }
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public int GamesOwned { get; set; }
    public string? DiscordId { get; set; }
    public string? TwitchUrl { get; set; }
    public bool IsOnline { get; set; }
    public string? StatusMessage { get; set; }
}

}
