using System;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;

using studydotnet;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

Console.WriteLine("dbstr: {0}", System.Environment.GetEnvironmentVariable("DBCONNECTIONSTRING"));

builder.Services.AddDbContext<StudyAppContext>(opt =>
    opt.UseSqlServer(System.Environment.GetEnvironmentVariable("DBCONNECTIONSTRING")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
var provider = new FileExtensionContentTypeProvider();

provider.Mappings[".html"] = "text/html";
provider.Mappings[".js"] = "application/json";
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// both of these work
// app.UseStaticFiles(new StaticFileOptions() {
//     FileProvider = new PhysicalFileProvider(
//         Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot")
//     ),
//     RequestPath = new PathString("/wwwroot"),
//     ContentTypeProvider = provider
// });

app.MapPut("/submit", async (HttpContext context) => {

 // FIXME
    var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
    Console.WriteLine("req body: {0}", requestBody);
    var sub = JsonSerializer.Deserialize<SubmitDto>(requestBody);
    Console.WriteLine("uuid: {0}", sub.UUID);
    
    using(var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<StudyAppContext>();
        var res = from qs in dbContext.Questions
            where qs.uuid.ToString().ToLower() == sub.UUID
            select qs.CorrectOption;
        dbContext.Answers.Add(new Answer {
            QuestionUuid = new Guid(sub.UUID),
            Choice = sub.Selected.ToCharArray()[0]
        });
        dbContext.SaveChanges();
        var resCorrect = res.FirstOrDefault();
        return Results.Ok(new {
            Correct = resCorrect
        });
    }
    return Results.Ok("{}");
});

app.MapGet("/questions", () =>
{
    using(var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<StudyAppContext>();
        var res = dbContext.Questions.Where(qs => dbContext.Answers.All(ans => ans.QuestionUuid != qs.uuid));
        return new {
            question_index = res.Take(1).ToList()[0].uuid,
            questions = dbContext.Questions.ToList()
        };
    }
    // return new object[] { 
    //     new {
    //         Message = "Helloworld"
    //     }
    // };
    return null;
})
.WithName("StudyApp")
.WithOpenApi();

app.Run();