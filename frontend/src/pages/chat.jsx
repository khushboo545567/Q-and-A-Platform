import SideBar from "../component/SideBar.jsx";
import ChatArea from "../component/ChatArea.jsx";
import AnswerSlidingPannel from "../component/AnswerSlidingPannel.jsx";
import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";

const Chats = function () {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // TEST CASES 🔥🔥🔥🔥

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // CATOGRIE IDS 🔥🔥🔥🔥

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const [selectedCategory, setSelectedCategory] = useState("Programming");
  const handleCategoryName = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleViewAnswerClick = (question) => {
    setSelectedQuestion(question);
    setIsPanelOpen(true);
  };
  const closePanel = () => {
    setIsPanelOpen(false);
  };

  // QUESTION CHAT  AREA 🔥🔥🔥

  const [askquestion, setQuestion] = useState({ prob_description: "" });

  const QuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...askquestion, [name]: value });
  };
  const [questions, setQuestions] = useState([]);

  const fetchQuestion = () => {
    const url = selectedCategoryId
      ? `http://localhost:8000/problem/get?cat_id=${selectedCategoryId}`
      : "http://localhost:8000/problem/get?cat_id=4";

    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setQuestions(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.error("Axios error :", err.response?.data || err.message);
        console.error("status code :", err.response?.status);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, [selectedCategoryId]);

  const Questionsubmit = (e) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      alert("please select a catogory before submitting !");
      return;
    }
    axios
      .post(
        `http://localhost:8000/problem/${selectedCategoryId}`,
        askquestion,
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        fetchQuestion();
        setQuestion({ prob_description: "" });
      })
      .catch((err) => {
        console.error("Axios error :", err.response?.data || err.message);
        console.error("status code :", err.response?.status);
      });
  };

  // ANSWER AREA  🔥🔥🔥🔥

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const handleExploreSolutions = (problemId) => {
    setSelectedQuestionId(problemId);
    handleViewAnswerClick(problemId);
    fetchSolution(problemId);
  };

  const [sendSolution, setSendSoultion] = useState({ sol_description: "" });
  const changeSolution = (e) => {
    const { name, value } = e.target;
    setSendSoultion({ ...sendSolution, [name]: value });
  };

  const [getSolution, setGetSolution] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSolution = (problemId) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/solution/get/${problemId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setGetSolution(res.data.data);
      })
      .catch((err) => {
        console.error("Axios error :", err.response?.data || err.message);
        console.error("Status code :", err.response?.status);
        if (err.response?.status === 404) {
          setGetSolution([]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const submitSolution = (e) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      alert("please select a catogory before submitting !");
      return;
    }
    axios
      .post(
        `http://localhost:8000/solution/send/${selectedCategoryId}/${selectedQuestionId}`,
        sendSolution,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        // update the solutions count for the specific count
        setQuestion((previousQuestion) => {
          if (!Array.isArray(previousQuestion)) return [];
          return previousQuestion.map((question) =>
            question.problemId === selectedQuestionId
              ? { ...question, solutions: (question.solutions || 0) + 1 }
              : question
          );
        });

        fetchSolution(selectedQuestionId);
        fetchQuestion();
        setSendSoultion({ sol_description: "" });
      })
      .catch((err) => {
        console.error("Axios error :", err.response?.data || err.message);
        console.error("status code :", err.response?.status);
      });
  };

  // VOTE 🔥🔥🔥🔥🔥
  const fetchVote = () => {
    axios
      .get(`http://localhost:8000/vote/fetch/${selectedQuestionId}`, {
        withCredentials: true,
      })
      // .then((res) => {
      //   console.log(res);
      // })
      .then((res) => {
        if (res.data?.votes !== undefined) {
          setVoteCount(res.data.votes);
        }
      })
      .catch((err) => {
        console.error("Axios error :", err.response?.data || err.message);
        console.error("status code :", err.response?.status);
      });
  };

  const submitVote = (selectedQuestionId) => {
    // e.preventDefault();
    if (!selectedCategoryId) {
      alert("please select a catogory before submitting !");
      return;
    }
    const updatedQuestions = questions.map((q) => {
      if (q.problem_id === selectedQuestionId) {
        return { ...q, votes: q.votes + 1 };
      }
      return q;
    });
    setQuestions(updatedQuestions);

    axios
      .post(
        `http://localhost:8000/vote/send/${selectedCategoryId}/${selectedQuestionId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        fetchVote();
      })
      .catch((err) => {
        console.error("Axios error :", err.response?.data || err.message);
        console.error("status code :", err.response?.status);
      });
  };

  // const [selectedCategory, setSelectedCategory] = useState("Programming");
  // const handleCategoryName = (categoryName) => {
  //   setSelectedCategory(categoryName); // Update the selected category
  // };

  return (
    <>
      <div className="flex h-[100vh] w-screen overflow-x-hidden">
        {/* Sidebar */}
        <SideBar
          handleCategoryClick={handleCategoryClick}
          handleCategoryName={(categoryId) => {
            const categoryName = categoryId === 4 ? "Programming" : "Academics";
            handleCategoryName(categoryName);
          }}
        />
        {/* Main Chat Area */}
        <ChatArea
          questions={questions}
          askquestion={askquestion}
          QuestionChange={QuestionChange}
          Questionsubmit={Questionsubmit}
          handleExploreSolutions={handleExploreSolutions}
          submitVote={submitVote}
          setSelectedQuestionId={setSelectedQuestionId}
          selectedCategory={selectedCategory}
        />
      </div>
      {/* Sliding Panel */}
      <div className="">
        <AnswerSlidingPannel
          selectedQuestion={selectedQuestion}
          isPanelOpen={isPanelOpen}
          closePanel={closePanel}
          sendSolution={sendSolution}
          changeSolution={changeSolution}
          submitSolution={submitSolution}
          selectedQuestionId={selectedQuestionId}
          getSolution={getSolution}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Chats;
