using System;

namespace reminizent_backend
{
    public class Admin
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public Admin()
        {

        }

        public Admin(string email, string password, string role)
        {
            this.Email = email;
            this.Password = password;
            this.Role = role;
        }
    }
}
