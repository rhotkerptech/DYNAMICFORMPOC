using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamicFormAPI.Models
{
    public class Form
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }=null!;

        [Required]
        public string FormSchema { get; set; }=null!;// JSON format
    }
}
