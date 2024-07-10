using Data.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository.Auth
{
    public interface IRegisterRepository
    {
        public Task<ResultRegisterModel> Register(RegisterModel registerModel);
    }
}
