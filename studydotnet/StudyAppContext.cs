using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace studydotnet;

class SubmitDto
{
    [JsonPropertyName("uuid")]
  public string UUID {get;set;}
    [JsonPropertyName("selected")]
  public string Selected {get;set;}
}

class Answer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid uuid {get;set;}
    [Column("question_uuid")]
    public Guid QuestionUuid {get;set;}
    public char Choice {get;set;}
    [Column("created_at")]
    public DateTime? CreatedAt {get; set;}
}

class Question
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid uuid {get;set;}
    public string QuestionText {get;set;}
    [Column("option_a")]
    public string OptionA {get;set;}
    [Column("option_b")]
    public string OptionB {get;set;}
    [Column("option_c")]
    public string OptionC {get;set;}
    [Column("option_d")]
    public string OptionD {get;set;}
    [Column("correct_option")]
    public char CorrectOption {get;set;}
}
class StudyAppContext : DbContext
{
    public StudyAppContext(DbContextOptions<StudyAppContext> options) : base(options)
    {

    }

    public DbSet<Answer> Answers { get; set;}
    public DbSet<Question> Questions { get; set;}
}