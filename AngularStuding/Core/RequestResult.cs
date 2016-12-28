namespace AngularStuding.Core
{
    public class RequestResult
    {
        public ResultCode Code { get; }
        public string Description { get; }

        public RequestResult(ResultCode code, string description)
        {
            this.Code = code;
            this.Description = description;
        }

        public RequestResult(ResultCode code)
        {
            this.Code = code;
            this.Description = "";
        }
    }
}