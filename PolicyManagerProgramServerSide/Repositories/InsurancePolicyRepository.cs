using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PolicyManagerProgramServerSide.Data;
using PolicyManagerProgramServerSide.Model;

namespace PolicyManagerProgramServerSide.Repositories
{
    public class InsurancePolicyRepository : IInsurancePolicyRepository
    {
        private readonly PolicyContext _context;

        public InsurancePolicyRepository(PolicyContext context)
        {
            _context = context;
        }

        // קבלת כל פוליסות הביטוח
        public async Task<IEnumerable<InsurancePolicy>> GetAll()
        {
            return await _context.InsurancePolicies.ToListAsync();
        }

        // קבלת פוליסת ביטוח על פי מזהה
        public async Task<IEnumerable<InsurancePolicy>> GetPoliciesById(int id)
        {
            return await _context.InsurancePolicies.Where(policy => policy.UserID == id).ToListAsync() ;
        }

        // יצירת פוליסת ביטוח חדשה
        public async Task<InsurancePolicy> Create(InsurancePolicy insurancePolicy)
        {
            var user = await _context.Users.FindAsync(insurancePolicy.UserID);
            if (user == null)
            {
                throw new ArgumentException("User does not exist.");
            }


            _context.InsurancePolicies.Add(insurancePolicy);
            await _context.SaveChangesAsync();
            return insurancePolicy;
        }

        // עדכון פוליסת ביטוח קיימת
        public async Task Update(InsurancePolicy insurancePolicy)
        {
            _context.Entry(insurancePolicy).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // מחיקת פוליסת ביטוח
        public async Task Delete(int id)
        {
            var insurancePolicy = await _context.InsurancePolicies.FindAsync(id);
            if (insurancePolicy == null)
            {
                throw new ArgumentException("ID does not exist.");
            }
            _context.InsurancePolicies.Remove(insurancePolicy);
            await _context.SaveChangesAsync();
            
        }
    }
}