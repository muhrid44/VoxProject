using Data.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IService.Auth
{
    public interface ILoginService
    {
        public Task<ResultLoginModel> Login(LoginModel loginModel);
    }
}
