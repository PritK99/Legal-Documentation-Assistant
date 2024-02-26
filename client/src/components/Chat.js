import React from "react";
import { useState, useRef, useEffect } from "react";

function Chat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  const addChat = (message) => {
    setChats((prevChats) => [...prevChats, message]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const d = {
      user_chat: input,
      ai_chat: ""
    };

    if (input.trim() !== "") {
      addChat(d);
      setInput("");
    }

    const data = {
      user_chat: input,
    };

    setTimeout(() => {
      fetch(`http://127.0.0.1:5000/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch");
          }
          return res.json();
        })
        .then((res) => {
          
          setChats((prevChats) => {
            const updatedChats = [...prevChats];
            updatedChats[updatedChats.length - 1].ai_chat = res.aiMessage; 
            return updatedChats;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  };

  return (
    <>
      <div className="">
        {open === false ? (
          <button
            className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900 mb-6 z-40"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            data-state="closed"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns=" http://www.w3.org/2000/svg"
              width="30"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-white block border-gray-200 align-middle"
            >
              <path
                d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
                className="border-gray-200"
              ></path>
            </svg>
          </button>
        ) : (
          <div className={`fixed bottom-[calc(2rem+1.5rem)] right-0  bg-black  rounded-lg border border-[#e5e7eb] w-[440px] h-[500px] overflow-y-auto z-50 ${open ? 'scroll-smooth' : ''}`} ref={chatContainerRef}>
            <div className="sticky top-0 z-20 bg-black py-3 px-3">
              <div className="flex justify-between items-center space-y-1.5 rounded-md px-2 py-3 bg-[#4169E1]">
                <div className="flex gap-3 items-center ml-2">
                  <div className="rounded-full">
                    <img
                      src={process.env.PUBLIC_URL + "/law.png"}
                      className="h-8 w-8"
                    />
                  </div>
                  <p className="text-xl text-white font-medium leading-3">
                    LegalAdvisor
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full cursor-pointer bg-white"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/cross.png"}
                    className="h-7 w-7"
                  />
                </button>
              </div>
            </div>

            <div className="px-4 h-[474px] min-w-full table">
              <div className="my-4 text-sm bg-[#6F8FAF] max-w-fit px-4 py-3 rounded-bl-none rounded-ss-2xl rounded-r-2xl mr-7">
                <p className="leading-relaxed text-white font-medium">
                  Hello, I am your Legal Advisor!
                </p>
              </div>
              <div className="my-4 text-sm bg-[#6F8FAF] max-w-fit px-4 py-3 rounded-bl-none rounded-ss-2xl rounded-r-2xl mr-7">
                <p className="leading-relaxed text-white font-medium">
                  How may I help you?
                </p>
              </div>

              {chats.length > 0 &&
                chats.map((chat, index) => (
                  <div key={index}>
                    <div key={index} className="flex justify-end my-4 ml-7">
                      <div className="gap-3 text-sm max-w-fit bg-[#4682B4] text-white font-medium px-4 py-3 rounded-l-xl rounded-br-xl">
                        <p className="leading-relaxed">{chat.user_chat}</p>
                      </div>
                    </div>
                    {chat.ai_chat.length > 0 ? (
                      <div key={index} className="my-4 text-sm bg-[#6F8FAF] max-w-fit px-4 py-3 rounded-bl-none rounded-ss-2xl rounded-r-2xl mr-7">
                        <p className="leading-relaxed text-white font-medium">
                          {chat.ai_chat}
                        </p>
                      </div>
                    ) : (
                      <div key={index} className="my-4 text-sm bg-[#6F8FAF] max-w-fit px-4 py-3 rounded-bl-none rounded-ss-2xl rounded-r-2xl mr-7">
                        <span className="loading loading-dots loading-md text-white"></span>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex items-center sticky bottom-0 bg-black py-4 ">
              <form
                className="flex items-center justify-center w-full space-x-2 px-3"
                onSubmit={handleSubmit}
              >
                <input
                  className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2 bg-white"
                  placeholder="Type your message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                {input.length > 0 && (
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-[#4169E1] hover:bg-[#0F52BA] h-10 px-4 py-2"
                  >
                    Send
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
