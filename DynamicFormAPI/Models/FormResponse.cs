using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamicFormAPI.Models
{
    public class FormResponse
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid FormId { get; set; }

        [Required]
        public string ResponseData { get; set; }=null!;// JSON format

        [ForeignKey("FormId")]
        public Form? Form { get; set; }
    }
}
