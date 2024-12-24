import React, { useState, useEffect } from "react";
import banner from "../../public/banner.png";

function Banner() {
  const [quote, setQuote] = useState("Loading quote...");
  const [author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI("AIzaSyDKsXURjjThytbegYTkflPQ7WU6xPpjkv8");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(
          "Give me an inspiring quote about books with its author in this format: 'quote' - Author Name. the quote should be either unique  and less known or popular one. Randomly select one of the two. ALways give the quote and author in the format specifed above."
        );

        const fullText = result.response.text?.() || "";
        console.log("API Response:", fullText);

        if (fullText.includes(" - ")) {
          const [quoteText, authorName] = fullText.split(" - ");
          const cleanQuote = quoteText.replace(/^["'](.*)["']$/, "$1");
          setQuote(cleanQuote);
          setAuthor(authorName);
        } else {
          setQuote(fullText);
          setAuthor("Unknown Author");
        }

      } catch (error) {
        console.error("Error fetching quote:", error);
        setErrorMessage("Sorry, something went wrong. Please try again later.");
        setQuote("The only thing that you absolutely have to know, is the location of the library.");
        setAuthor("Albert Einstein");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-3">
      <div className="w-full mb-7 order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
        <div className="space-y-12">
          <h1 className="text-4xl font-bold">
            Discover, Read, and Share Your{" "}
            <span className="text-pink-500">Next Favorite Book</span>
          </h1>
          <p className="text-xl">
            At BookStop, we connect you to a world of stories waiting to be discovered. 
            Whether you're diving into a thrilling adventure, exploring new genres, or 
            sharing your latest finds, we make it easy and enjoyable. Join a vibrant 
            community of readers and let every page turn into a new experience.
          </p>

          {errorMessage ? (
            <div className="quote-container mt-8 bg-red-900/20 border border-red-500 p-6 rounded-lg shadow-lg">
              <p className="text-xl font-semibold text-red-500">Error</p>
              <blockquote className="mt-4 text-lg italic text-red-300">
                {errorMessage}
              </blockquote>
            </div>
          ) : (
            <div className="quote-container mt-8 bg-black-900/20 border border-blue-500 p-6 rounded-lg shadow-lg">
              <p className="text-xl font-semibold text-pink-400">Quote of the Day</p>
              <blockquote className="mt-4 text-lg italic text-slate-300">
                {isLoading ? (
                  "Loading your daily quote..."
                ) : (
                  <>
                    "{quote}"
                    <br />- {author}
                  </>
                )}
              </blockquote>
            </div>
          )}
        </div>
      </div>
      <div className="order-1 w-full md:w-1/2">
        <img src={banner} alt="book images" className="w-88 h-88" />
      </div>
    </div>
  );
}

export default Banner;