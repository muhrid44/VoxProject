using Data.Auth;
using Repository.IRepository.Auth;
using Service.IService.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service.Auth
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;

        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }

        public async Task<ResultLoginModel> Login(LoginModel loginModel)
        {
            var result = await _loginRepository.Login(loginModel);
            return result;
        }
    }
}
