using Newtonsoft.Json;

namespace AngularStuding.Core
{
    public static class ToJsonExtension
    {
        public static string ToJson(this object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}