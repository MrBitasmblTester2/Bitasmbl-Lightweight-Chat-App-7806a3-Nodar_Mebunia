using Microsoft.AspNetCore.SignalR;
public class ChatHub : Hub {
  public async Task JoinRoom(string room){ await Groups.AddToGroupAsync(Context.ConnectionId, room); }
  public async Task LeaveRoom(string room){ await Groups.RemoveFromGroupAsync(Context.ConnectionId, room); }
  public async Task SendMessage(string room, string user, string text, string timestamp){ await Clients.Group(room).SendAsync("ReceiveMessage", room, user, text, timestamp); }
}
