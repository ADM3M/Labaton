using api.Data;
using api.Interfaces;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddScoped<IFolderRepository, FolderRepository>();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(policy => policy
                .AllowAnyMethod()
                .AllowCredentials()
                .AllowAnyHeader()
                .WithOrigins("http://localhost:4200"));

app.UseAuthorization();

app.MapControllers();

app.Run();
