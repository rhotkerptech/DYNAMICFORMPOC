using DynamicFormAPI.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/forms")]
[ApiController]
public class FormResponsesController : ControllerBase
{
    private readonly AppDbContext _context;

    public FormResponsesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitResponse([FromBody] FormResponse response)
    {
        if (response == null) return BadRequest("Invalid response data");

        _context.FormResponses.Add(response);
        await _context.SaveChangesAsync();

        return Ok(new { response.Id });
    }
}
