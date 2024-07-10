using Data.Auth;
using Microsoft.AspNetCore.Mvc;
using Service.IService.Auth;

namespace VoxProject.Server.Controllers.Auth
{
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {

        private readonly IRegisterService _registerService;
        private readonly ILoginService _loginService;

        public AuthController(IRegisterService registerService, ILoginService loginService)
        {
            _registerService = registerService;
            _loginService = loginService;
        }

        [HttpPost("register", Name = "RegisterNewUser")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            try
            {
                var result = await _registerService.Register(registerModel);
                return Json(result);
            } catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpPost("login", Name = "Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                var result = await _loginService.Login(loginModel);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }


    }
}
