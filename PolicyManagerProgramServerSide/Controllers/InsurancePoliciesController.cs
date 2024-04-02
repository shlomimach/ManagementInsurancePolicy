using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PolicyManagerProgramServerSide.Model;
using PolicyManagerProgramServerSide.Repositories;

namespace PolicyManagerProgramServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsurancePoliciesController : ControllerBase
    {
        private readonly IInsurancePolicyRepository _insurancePolicyRepository;
        private readonly IUserRepository _userRepository;

        public InsurancePoliciesController(IInsurancePolicyRepository policyRepository, IUserRepository userRepository)
        {
            _insurancePolicyRepository = policyRepository;
            _userRepository = userRepository;   
        }
        // GET: api/InsurancePolicies
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<InsurancePolicy>>> GetInsurancePolicies()
        //{
        //    return Ok(await _insurancePolicyRepository.GetAll());
        //}

        // GET: api/InsurancePolicies/5
        [HttpGet]
        public async Task<ActionResult<InsurancePolicy>> GetInsurancePolicy(int id)
        {
            var insurancePolicy = await _insurancePolicyRepository.GetPoliciesById(id);
            if (insurancePolicy == null)
            {
                return NotFound();
            }
            return Ok(insurancePolicy);
        }


        [HttpPost]
        public async Task<ActionResult<InsurancePolicy>> PostInsurancePolicy(InsurancePolicy insurancePolicy)
        {
            try
            {
                var newInsurancePolicy = await _insurancePolicyRepository.Create(insurancePolicy);
                return CreatedAtAction("GetInsurancePolicy", new { id = newInsurancePolicy.ID }, newInsurancePolicy);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/InsurancePolicies/5
        [HttpPut]
        public async Task<IActionResult> PutInsurancePolicy(InsurancePolicy insurancePolicy)
        {
            
            await _insurancePolicyRepository.Update(insurancePolicy);
            return NoContent();
        }

        // DELETE: api/InsurancePolicies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInsurancePolicy(int id)
        {
            await _insurancePolicyRepository.Delete(id);
            return NoContent();
        }
    }
}
