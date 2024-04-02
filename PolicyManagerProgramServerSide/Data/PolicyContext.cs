using Microsoft.EntityFrameworkCore;
using PolicyManagerProgramServerSide.Model;
using System;

namespace PolicyManagerProgramServerSide.Data
{
    public class PolicyContext : DbContext
    {
        public PolicyContext(DbContextOptions<PolicyContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<InsurancePolicy> InsurancePolicies { get; set; }


      

    }

}
