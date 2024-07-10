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
    public class RegisterService : IRegisterService
    {
        private readonly IRegisterRepository _registerRepository;

        public RegisterService(IRegisterRepository registerRepository)
        {
            _registerRepository = registerRepository;
        }

        public async Task<ResultRegisterModel> Register(RegisterModel registerModel)
        {
            var result = await _registerRepository.Register(registerModel);
            return result;
        }
    }
}
