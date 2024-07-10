using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Auth
{
    public class ResultLoginModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Error { get; set; }
    }
}
