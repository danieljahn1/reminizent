using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace reminizent_backend
{
    [Route("reminizent/admin")]
    public class AdminController : Controller
    {
        private MasterContext _context;

        public AdminController(MasterContext context)
        {
            _context = context;

            if (_context.Admins.Count() == 0)
            {
            _context.Admins.Add(new Admin("aanderson@email.com", "abc123", "basic"));
            _context.Admins.Add(new Admin("aschatz@email.com", "abc123", "basic"));
            _context.Admins.Add(new Admin("dahn@email.com", "abc123", "admin"));
            _context.Admins.Add(new Admin("emasinas@email.com", "abc123", "admin"));

            _context.SaveChanges();
            }
        }

        [HttpGet]
        public List<Admin> GetAdmins()
        {
            return _context.Admins.ToList();
        }

        [HttpGet("id/{id}")]
        public Admin GetAdminById(int id)
        {
            return _context.Admins.FirstOrDefault(u => u.Id == id);
        }

        [HttpGet("email/{email}")]
        public Admin GetAdminByEmail(string email)
        {
            return _context.Admins.FirstOrDefault(u => u.Email == email);
        }

        [HttpGet("login/{email}+{password}")]
        public Admin GetAdminByLoginPassword(string email, string password)
        {
            return _context.Admins.FirstOrDefault(u => (u.Email.ToLower() == email.ToLower() && u.Password == password));
        }

        [HttpPost]
        public Admin PostAdmin([FromBody]Admin admin)
        {
            _context.Admins.Add(admin);
            _context.SaveChanges();
            return admin;
        }

        [HttpPut("{id}")]
        public Admin PutAdminById(int id, [FromBody]Admin admin)
        {
            _context.Entry(admin).State = EntityState.Modified;
            _context.SaveChanges();
            return admin;
        }

        [HttpDelete("{id}")]
        public Admin DeleteAdminById(int id)
        {
            var found = _context.Admins.FirstOrDefault(u => u.Id == id);
            _context.Admins.Remove(found);
            _context.SaveChanges();
            return found;
        }
    }
}