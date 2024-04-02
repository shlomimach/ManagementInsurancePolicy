using Microsoft.AspNetCore.Mvc;
using PolicyManagerProgramServerSide.Model;

namespace PolicyManagerProgramServerSide.Repositories
{
    public interface IInsurancePolicyRepository
    {
        Task<IEnumerable<InsurancePolicy>> GetAll();
        Task<IEnumerable<InsurancePolicy>> GetPoliciesById(int id);
        Task<InsurancePolicy> Create(InsurancePolicy insurancePolicy);
        Task Update(InsurancePolicy insurancePolicy);
        Task Delete(int id);
    }
}

