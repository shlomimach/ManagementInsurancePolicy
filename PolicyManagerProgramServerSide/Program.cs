using Microsoft.EntityFrameworkCore;
using PolicyManagerProgramServerSide.Data;
using PolicyManagerProgramServerSide.Repositories;
using System;


var builder = WebApplication.CreateBuilder(args);


Console.WriteLine("Here 1");


// Get configuration from appsettings.json
var configuration = builder.Configuration;
Console.WriteLine("Here 2");


// ConfigureServices equivalent
builder.Services.AddControllers();
Console.WriteLine("Here 3");

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.DateFormatString = "yyyy-MM-dd";
    });

builder.Services.AddEndpointsApiExplorer();
Console.WriteLine("Here 4");

builder.Services.AddSwaggerGen();
Console.WriteLine("Here 5");

// רישום הריפוזיטוריות כשירותים
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IInsurancePolicyRepository, InsurancePolicyRepository>();
Console.WriteLine("**AddScoped");

builder.Services.AddDbContext<PolicyContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("MyDbConnection")));
Console.WriteLine("Here 6");




builder.Services.AddMemoryCache();
Console.WriteLine("Here **MemoryCache");

var app = builder.Build();
Console.WriteLine("Here 7");



// Configure equivalent
if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Here 8");

    app.UseDeveloperExceptionPage();
    Console.WriteLine("Here 9");

    app.UseSwagger();
    app.UseSwaggerUI();
    Console.WriteLine("Here 10");

}

app.UseCors(builder =>
{
    Console.WriteLine("Here 11");

    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
    Console.WriteLine("Here 12");

});


app.UseRouting();
Console.WriteLine("Here 14");

app.UseAuthorization();
Console.WriteLine("Here 15");

app.MapControllers();
Console.WriteLine("Here 16");


app.Run();
Console.WriteLine("Here 17");