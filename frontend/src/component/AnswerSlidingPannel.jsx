import "remixicon/fonts/remixicon.css";
import { format } from "date-fns";

const AnswerSlidingPannel = function ({
  selectedQuestion,
  isPanelOpen,
  closePanel,
  submitSolution,
  changeSolution,
  sendSolution,
  selectedQuestionId,
  getSolution,
  isLoading,
}) {
  return (
    <div
      className={`absolute top-0 right-0 w-[87%] h-full bg-[#2B2D31] transform ${
        isPanelOpen
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none"
  } transition-all duration-600`}
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center text-[#d4d4d5]">
        <h2 className="text-xl">Solutions</h2>
        <button onClick={closePanel} className="text-lg hover:text-white">
          Close
        </button>
      </div>
      {selectedQuestion && (
        <div className="px-9 flex-grow overflow-y-auto h-[80%]">
          <div className="sticky top-0 bg-[#2B2D31] px-9 py-3 z-10">
            {isLoading ? (
              <div className="text-center text-[#AEB0B3]">Loading...</div>
            ) : getSolution.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold text-[#d4d4d5] mb-6">
                  {getSolution[0]?.prob_description || "Problem Description"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {getSolution.map((ans) => (
                    <li
                      key={ans.solution_id}
                      className="bg-[#313338] px-8 py-4 rounded-md text-[#AEB0B3]"
                    >
                      <div className="text-[#757B83] ">
                        {format(
                          new Date(ans.solution_created_at),
                          "dd MMM yyyy"
                        )}{" "}
                        <span className="pl-4">
                          {format(new Date(ans.solution_created_at), "hh:mm a")}
                        </span>
                      </div>
                      <div>
                        <span>{ans.sol_description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="text-center text-[#AEB0B3] flex flex-col gap-3 items-center">
                <span>No solutions available yet.</span>
                <span>Be the first to answer!</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full bg-[#313338] flex items-center px-6 pb-5 py-2">
        <div className="relative w-full">
          <form
            onSubmit={(e) => {
              if (selectedQuestionId) {
                submitSolution(e, selectedQuestionId);
              } else {
                alert("Please select a question before submitting a solution.");
              }
            }}
            className="flex gap-3 items-center"
          >
            <input
              type="text"
              placeholder="Post a Solution"
              name="sol_description"
              onChange={changeSolution}
              value={sendSolution.sol_description}
              className="w-full outline-none py-2 pl-4 pr-16 rounded-sm text-[#d4d4d5] bg-[#383A40] border border-gray-700"
            />
            <div className="px-2">
              <button
                className="py-2 px-4 hover:bg-[#5865f2a0] bg-[#5865F2] rounded-sm text-white"
                type="submit"
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
export default AnswerSlidingPannel;
