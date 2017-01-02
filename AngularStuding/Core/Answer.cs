namespace AngularStuding.Core
{
    public class Answer
    {
        public AnswerCode Code { get; }
        public string Description { get; }

        public Answer(AnswerCode code, string description)
        {
            this.Code = code;
            this.Description = description;
        }

        public Answer(AnswerCode code)
        {
            this.Code = code;
            this.Description = "";
        }
    }
}