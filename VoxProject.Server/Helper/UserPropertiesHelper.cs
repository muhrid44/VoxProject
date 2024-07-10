namespace VoxProject.Server.Helper
{
    public class UserPropertiesHelper
    {
        private string UserId;
        private string UserToken;

        public void SetUserId(string userId)
        {
            UserId = userId;
        }

        public string GetUserId()
        {
            return UserId;
        }

        public void SetUserToken(string token)
        {
            UserToken = token;
        }

        public string GetUserToken()
        {
            return UserToken;
        }
    }
}
