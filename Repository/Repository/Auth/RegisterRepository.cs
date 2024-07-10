using Data.Auth;
using Data.Helper;
using Repository.IRepository.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Repository.Repository.Auth
{
    public class RegisterRepository : IRegisterRepository
    {
        private readonly string RegisterURL = "";

        public RegisterRepository()
        {
            RegisterURL = StaticHelper.CLIENT_BASE_URL + "/users";
        }

        public async Task<ResultRegisterModel> Register(RegisterModel registerModel)
        {
            var newRegisterModel = new ResultRegisterModel();

            using(var client = new HttpClient())
            {
                var body = JsonSerializer.Serialize(registerModel);
                var requestContent = new StringContent(body, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(RegisterURL, requestContent);

                var content = await response.Content.ReadAsStringAsync();
                if(response.IsSuccessStatusCode)
                {
                    newRegisterModel.StatusCode = (int)response.StatusCode;
                    newRegisterModel.Message = content;
                    return newRegisterModel;
                } else
                {
                    newRegisterModel.StatusCode = (int)response.StatusCode;
                    newRegisterModel.Message = content;
                    return newRegisterModel;
                }
            }
        }
    }
}
