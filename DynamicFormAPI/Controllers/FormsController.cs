using Microsoft.AspNetCore.Mvc;
using DynamicFormAPI.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

[Route("api/forms")]
[ApiController]
public class FormsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FormsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateForm([FromBody] Form form)
    {
        if (form == null) return BadRequest("Invalid form data");

        _context.Forms.Add(form);
        await _context.SaveChangesAsync();

        return Ok(new { form.Id, form.Name });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetForm(Guid id)
    {
        var form = await _context.Forms.FindAsync(id);
        if (form == null) return NotFound("Form not found");

        return Ok(form);
    }
}
