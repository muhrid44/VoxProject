using Data.Auth;
using Data.Helper;
using Data.Users;
using Repository.IRepository.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Repository.Repository.User
{
    public class UserRepository : IUserRepository
    {
        private readonly string UserBaseURL = "";

        public UserRepository()
        {
            UserBaseURL = StaticHelper.CLIENT_BASE_URL + "/users/";
        }
        public Task<bool> ChangePassword(int id, UserModel userModel)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteUser(int id, string token)
        {
            using (var client = new HttpClient())
            {

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.DeleteAsync(UserBaseURL + (id.ToString()));

                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public async Task<UserModel> GetUserById(int id, string token)
        {
            var newUser = new UserModel();

            using (var client = new HttpClient())
            {

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.GetAsync(UserBaseURL + (id.ToString()));

                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadFromJsonAsync<UserModel>();
                }
                else
                {
                    return await response.Content.ReadFromJsonAsync<UserModel>();
                }
            }
        }

        public Task<UserModel> UpdateUser(int id, UserModel userModel)
        {
            throw new NotImplementedException();
        }
    }
}
