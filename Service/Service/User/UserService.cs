using Data.Users;
using Repository.IRepository.Auth;
using Repository.IRepository.User;
using Service.IService.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Service.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<bool> ChangePassword(int id, UserModel userModel)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteUser(int id, string token)
        {
            var result = await _userRepository.DeleteUser(id, token);
            return result;
        }

        public async Task<UserModel> GetUserById(int id, string token)
        {
            var result = await _userRepository.GetUserById(id, token);
            return result;
        }

        public Task<UserModel> UpdateUser(int id, UserModel userModel)
        {
            throw new NotImplementedException();
        }
    }
}
