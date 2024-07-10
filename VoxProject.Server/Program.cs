using Data.Helper;
using Microsoft.Extensions.Configuration;
using Repository.IRepository.Auth;
using Repository.IRepository.User;
using Repository.Repository.Auth;
using Repository.Repository.User;
using Service.IService.Auth;
using Service.IService.User;
using Service.Service.Auth;
using Service.Service.User;
using VoxProject.Server.Helper;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//dependency injection registration
builder.Services.AddScoped<IRegisterRepository, RegisterRepository>();
builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<UserPropertiesHelper>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();




//adding client base url
string clientBaseURL = builder.Configuration.GetSection("ClientBaseURL").Value;
StaticHelper.CLIENT_BASE_URL = clientBaseURL;

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder
            .AllowAnyOrigin() // You can also specify specific origins
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors("AllowReactApp");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
