using Data.Auth;
using Data.Helper;
using Repository.IRepository.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Repository.Repository.Auth
{
    public class LoginRepository : ILoginRepository
    {
        private readonly string LoginURL = "";

        public LoginRepository()
        {
            LoginURL = StaticHelper.CLIENT_BASE_URL + "/users/login";
        }

        public async Task<ResultLoginModel> Login(LoginModel loginModel)
        {
            var newLoginModel = new ResultLoginModel();

            using (var client = new HttpClient())
            {
                var body = JsonSerializer.Serialize(loginModel);
                var requestContent = new StringContent(body, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(LoginURL, requestContent);

                var content = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadFromJsonAsync<ResultLoginModel>();
                }   
                else
                {
                    return await response.Content.ReadFromJsonAsync<ResultLoginModel>();
                }
            }
        }
    }
}
