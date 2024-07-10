using Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepository.User
{
    public interface IUserRepository
    {
        public Task<UserModel> GetUserById(int id, string token);
        public Task<UserModel> UpdateUser(int id, UserModel userModel);
        public Task<bool> DeleteUser(int id, string token);
        public Task<bool> ChangePassword(int id, UserModel userModel);

    }
}
