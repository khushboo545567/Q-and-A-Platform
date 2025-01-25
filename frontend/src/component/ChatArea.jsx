import "remixicon/fonts/remixicon.css";
import { format } from "date-fns";

const ChatArea = function ({
  questions,
  askquestion,
  Questionsubmit,
  QuestionChange,
  handleExploreSolutions,
  submitVote,
  selectedCategory
}) {
  return (
    <div className="w-[90%] h-[100dvh] flex flex-col bg-[#2B2D31]overflow-x-hidden">
      {/* Top Header */}
      <div className="p-4 bg-[#313338] font-semibold drop-shadow text-[#d4d4d5]">
        <span className="text-bold">{selectedCategory}</span>
      </div>
      {/* Question List */}
      <div className="bg-[#313338] flex-grow overflow-y-auto px-9 pt-12 ">
        <ul className="flex flex-col gap-2">
          {questions.map((question) => (
            <li
              key={question.problem_id}
              className="px-6 py-2 bg-[#2B2D31] rounded-md"
            >
              <div className="text-[#757B83]  ">
                {format(new Date(question.created_at), "dd MMM yyyy")}{" "}
                <span className="pl-4">
                  {format(new Date(question.created_at), "hh:mm a")}
                </span>
              </div>
              <div className="text-[#AEB0B3]">{question.prob_description}</div>
              <div className="flex gap-4 text-sm text-[#757B83] justify-end cursor-pointer">
                <span className="underline hover:text-white cursor-pointer"  onClick={()=>submitVote(question.problem_id)}>
                  {question.votes} votes
                </span>
                <span
                  className="underline hover:text-white cursor-pointer"
                  onClick={() => handleExploreSolutions(question.problem_id)}
                >
                  Explore Solutions
                </span>
                <span className="underline hover:text-white">
                  {question.solutions} Solutions
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center px-6 pb-5 py-2 bg-[#313338] overflow-hidden">
        <div className="relative w-full">
          <form onSubmit={Questionsubmit} className="flex gap-3 items-center">
            <input
              type="text"
              name="prob_description"
              placeholder="Ask a question?"
              onChange={QuestionChange}
              value={askquestion.prob_description}
              className="w-full outline-none py-2 pl-4 pr-16 rounded-sm text-[#d4d4d5] bg-[#383A40] border border-gray-700"
            />
            <div className="px-2">
              <button
                type="submit"
                className="py-2 px-4 hover:bg-[#5865f2a0] bg-[#5865F2] rounded-sm text-white"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;