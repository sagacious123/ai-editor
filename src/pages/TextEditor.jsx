import React, { useEffect, useState } from "react";
import { format as prettyFormat } from "pretty-format";
import axios from "axios";

const TextEditor = () => {
  const [input, setInput] = useState("");
  const [completions, setCompletions] = useState([]);
  const [error, setError] = useState(null);
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [remainingCalls, setRemainingCalls] = useState(100);
  const [suggestion, setSuggestion] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
console.log(error);
  const Edit = () => {
    if (input === previousPrompt || remainingCalls <= 0) return;
    setPreviousPrompt(input);
    setRemainingCalls(remainingCalls - 1);

    if (instruction.length === 0) {
      handleError({
        message: "Please select an instruction"
      });
      setTimeout(() => {
        handleError(null);
      }, 5000);
      return;
    }

    // handleKeyDown()

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://api.openai.com/v1/edits",
        {
          model: "text-davinci-edit-001",
          // model: "davinci-codex",
          // model: "text-davinci-003",
          // prompt: val,
          // max_tokens: 150,
          // temperature: 0.3,
          // top_p: 1.0,
          // frequency_penalty: 0.0,
          // presence_penalty: 0.0,
          // stop: ['"""'],
          input: input,
          // instruction: "Fix the input errors"
          instruction: instruction,
        },
        { headers }
      )
      .then((response) => {
        handleResponse(response);
        console.log(response);
      })
      .catch((error) => {
        handleError(error);
        console.log(error);
      });
  };

  console.log(prettyFormat(suggestion));

  // useEffect(() => {
  //   let newCode = input + suggestion.text;
  //   setInput(newCode);
  // }, [input, suggestion.text])

  const handleResponse = (response) => {
    setCompletions(response.data.choices);
  };

  const handleError = (error) => {
    setError(error);
  };

  const [answer, setAnswer] = useState("");

  const onSelectSuggestion = (suggestion) => {
    // insert the suggestion into the code editor
    setSuggestion(suggestion);
    setAnswer(answer + suggestion.text);
    console.log(suggestion.text);
  };
  // useEffect((e) => {
  //   if (input.length > 0) {
  //     handleKeyDown(e);
  //   }
  // }, [input])

  // useEffect(() => {
  //   if(input && completions[0]?.text) {
  //     completions[0]?.text.split(" ").forEach((text, i) => {
  //       if (text !== input.split(" ")[i]) {
  //         console.log(text);
  //       }
  //     })
  //   }
  // }, [completions, input])

  return (
    <>
      <h1
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        className="capitalize font-medium mb-8 text-2xl "
      >
        Paste in anything to edit
      </h1>
      <section className="bg-gray-100 p-4 rounded-md shadow ">
        <div className="flex flex-col items-center max-w-3xl m-auto gap-3 ">
          {error && <p className="text-red-500">{error.message}</p>}
          <textarea
            className=" bg-zinc-900 p-4 rounded-md w-full text-gray-50"
            value={input}
            onInput={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text here to edit"
          // contentEditable
          />
          <select name="" onChange={(e) => setInstruction(e.target.value)} id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200 outline-none">
            <option value="">Select instruction</option>
            <option value="Fix the typographical errors">Fix the typographical errors</option>
            <option value="Summarize this input">Summarize</option>
          </select>
          <button
            className=" bg-rose-500 text-white p-2 rounded-md hover:bg-rose-600 w-36"
            onClick={Edit}
          >
            Edit
          </button>
        </div>

        <div className="flex flex-col max-w-3xl m-auto mt-12">
          {/* <p className="text-gray-600 max-w-3xl m-auto mt-9 ">
            Remaining calls: {remainingCalls}
          </p> */}
          {/* <ul className="list-none">
            {completions.map((completion, index) => (
              <li key={index} className="my-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  onClick={() => onSelectSuggestion(completion)}
                >
                  {completion.text}
                </button>
              </li>
            ))}
          </ul> */}

          {completions[0]?.text && (
            <>
              <h5 className="text-lg">Result:</h5>
              <ul className="list-none w-full">
                {completions.map((completion, index) => (
                  <li key={index} className="my-2 relative result">
                    <button className=" bg-slate-500 text-gray-200 absolute top-2 right-4 p-1 rounded-md text-sm ">
                      Copy
                    </button>
                    <div className="bg-zinc-900 p-4 rounded-md w-full pt-5 text-gray-50 outline-none">
                      {completion.text}
                    </div>
                    {/* <textarea
                      className=" bg-zinc-900 p-4 rounded-md w-full pt-5 text-gray-50 outline-none"
                      value={completion.text}
                      onInput={handleKeyDown}
                      onChange={handleKeyDown}
                      placeholder=""
                      // contentEditable
                    /> */}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div>{suggestion.text}</div>
        </div>
      </section>
    </>
  );
};

export default TextEditor;
