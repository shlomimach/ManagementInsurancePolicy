using System.ComponentModel.DataAnnotations;

namespace PolicyManagerProgramServerSide.Model
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
