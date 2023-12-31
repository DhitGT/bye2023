import Particles from "react-particles";
import { loadSnowPreset } from "tsparticles-preset-snow";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { loadFireflyPreset } from "tsparticles-preset-firefly";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import FormModal from "./components/Form";
import { supabase } from "./supabaseClient";
import MsgCard from "./components/MsgCard";
import Galery from "./components/Galery";

function App() {
  const [hide, setHide] = useState("");
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState([
    "Thank You 2023 ✨",
    "So Much Story We Made In 2023",
    "Let's begin new story in 2024",
    "To be better than yesterday",
  ]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase.from("msg").select("*");
      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "msg" },
        (payload) => {
          console.log("Change received!", payload);
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();
  }, []);

  const particleInit = async (engine) => {
    await loadFireflyPreset(engine);
  };
  const particleInitFirework = async (engine) => {
    await loadFireworksPreset(engine);
  };

  function timeLeft() {
    const newYearDate = new Date("January 1, 2024 00:00:00");
    const testDate = new Date("December 31, 2023 23:59:55");
    const nowDate = new Date().getTime();
    const remaining = newYearDate - nowDate;
    return remaining;
  }

  const newArrays = [...msg];
  const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Countdown has completed, set the state for Happy New Year
      setDone(true);
      // Add the new item to the first index
      newArrays.unshift("Happy New Year 🎉");

      // Update the state with the new array

      setHide("hidden");
      setMsg(newArrays);
      return null; // Render nothing after completion
    }

    return (
      <>
        {done ? (
          <div className="z-0">
            <Particles
              init={particleInitFirework}
              options={{ preset: "fireworks" }}
            />
          </div>
        ) : null}
        <div className="z-50 text-white mb-8 font-bold lg:text-2xl text-xl">
          <span>
            {days}d {hours}h {minutes}m {seconds}s Time Left
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <div className="z-0">
        <Particles init={particleInit} options={{ preset: "firefly" }} />;
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="h-screen flex flex-col items-center justify-center">
          <span className="text-white text-center lg-min-h-44 lg:min-h-fit p-lg:8 p-6 lg:text-5xl text-3xl font-bold z-50">
            <Typewriter words={msg} cursor={"|"} loop={false} />
          </span>
          <div
            className={`z-50 ${hide} text-white mb-8 font-bold lg:text-2xl text-xl`}
          >
            <Countdown
              date={Date.now() + timeLeft()}
              renderer={CountdownRenderer}
            />
          </div>
          <div className="absolute bottom-10 animate-bounce flex items-center justify-center text-white flex-col">
            scroll down
            <svg
              class="w-6 mt-2 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 12"
            >
              <path
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 7 4 4 4-4M1 1l4 4 4-4"
              />
            </svg>
          </div>
        </div>
        <div class="p-3 mx-auto mb-24">
          <Galery />
        </div>

        <div className="z-50 container">
          <div className="z-50">
            <p className="text-3xl font-bold text-white text-center mb-3">
              Leave Something
            </p>
            <FormModal />
          </div>
          <div className="flex w-50 flex-wrap gap-4 justify-center  items-center">
            {messages.map((message) => (
              <MsgCard data={message} />
            ))}
          </div>
        </div>
      </div>
      <div className="my-4 w-screen items-center justify-center flex gap-2">
        <p className="text-gray-300">Views</p>
        <a href="https://www.cutercounter.com/" target="_blank">
          <img
            src="https://www.cutercounter.com/hits.php?id=hxoqfoo&nd=6&style=31"
            border="0"
            alt="hit counter"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
