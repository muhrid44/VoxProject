using Microsoft.AspNetCore.Mvc;
using Service.IService.User;
using VoxProject.Server.Helper;

namespace VoxProject.Server.Controllers
{
    [CustomAuthorization]
    [Route("api/v1/user")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly UserPropertiesHelper _userPropertiesHelper;

        public UserController(IUserService userService, UserPropertiesHelper userPropertiesHelper)
        {
            _userService = userService;
            _userPropertiesHelper = userPropertiesHelper;
        }

        [HttpGet("get-user-by-id", Name = "GetUserById")]
        public async Task<IActionResult> GetUserById([FromQuery] int id)
        {
            try
            {
                var userToken = _userPropertiesHelper.GetUserToken();
                var result = await _userService.GetUserById(id, userToken);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpDelete("delete-user-by-id", Name = "DeleteUserById")]
        public async Task<IActionResult> DeleteUserById([FromQuery] int id)
        {
            try
            {
                var userToken = _userPropertiesHelper.GetUserToken();
                var result = await _userService.DeleteUser(id, userToken);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}
