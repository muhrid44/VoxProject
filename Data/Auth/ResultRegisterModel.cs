using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Auth
{
    public class ResultRegisterModel
    {
        public string Message { get; set; }
        public ErrorDescription Errors { get; set; }
        public int StatusCode { get; set; }
    }

    public class ErrorDescription
    {
        public List<string> Email { get; set; }
        public List<string> Password { get; set; }

    }
}
