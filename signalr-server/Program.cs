using Microsoft.AspNetCore.Builder; using Microsoft.Extensions.Hosting;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
var app = builder.Build();
app.UseCors(b=>b.AllowAnyHeader().AllowAnyMethod().AllowCredentials().SetIsOriginAllowed(_=>true));
app.MapHub<ChatHub>("/chat");
app.Run();
