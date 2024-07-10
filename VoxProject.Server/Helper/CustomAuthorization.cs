using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Net.Http.Headers;
using Service.Service.Auth;

namespace VoxProject.Server.Helper
{
    public class CustomAuthorization : Attribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var _userPropertiesHelper = (UserPropertiesHelper)filterContext.HttpContext.RequestServices.GetService(typeof(UserPropertiesHelper));
            var user = filterContext.HttpContext.User;
            var hasToken = filterContext.HttpContext.Request.Headers.ContainsKey("Authorization");
            var token = filterContext.HttpContext.Request.Headers[HeaderNames.Authorization];
            if (hasToken == false)
            {
                filterContext.Result = new UnauthorizedObjectResult("Token not found, please login first!");
                return;
            }

            _userPropertiesHelper.SetUserToken(token);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

    }
}
