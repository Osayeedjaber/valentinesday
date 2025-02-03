import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Film, Gamepad2, Pencil, Music, Gift } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { LoadingScreen } from './components/LoadingScreen';
import { playAudio, setupBackgroundMusic } from './utils/audio';
import { sendWebhookMessage } from './utils/discord';
import { createConfetti } from './utils/effects';
import './styles/main.css';
import './styles/animations.css';
import './styles/theme.css';
import FlowerPage from './components/FlowerPage';

function App() {
  // State variables for managing the application's UI and data
  const [currentPage, setCurrentPage] = useState<'home' | 'message' | 'date' | 'customDate' | 'final' | 'flower'>('home');
  const [messageIndex, setMessageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customDateText, setCustomDateText] = useState('');
  const [noClickMessage, setNoClickMessage] = useState('');
  const [loadingText, setLoadingText] = useState("Initializing heartware");

  // Array of loading phrases for the LoadingScreen component
  const loadingPhrases = [
    "Initializing heartware",
    "Loading stupidity",
    "Initializing love",
    "Initializing boldami"
  ];

  // useEffect hook to manage loading phrases and simulate loading time
  useEffect(() => {
    let phraseIndex = 0;
    // Interval to cycle through loading phrases
    const intervalId = setInterval(() => {
      setLoadingText(loadingPhrases[phraseIndex]);
      phraseIndex = (phraseIndex + 1) % loadingPhrases.length;
    }, 1500);

    // Simulate loading time and then clear the loading interval
    setTimeout(() => {
      setIsLoading(false);
      clearInterval(intervalId);
    }, 6000);

    // Cleanup function to clear interval if component unmounts
    return () => clearInterval(intervalId);
  }, []);


  // Array of messages displayed sequentially on the 'message' page
  const messages = [
    "Every day I cannot believe how lucky I am",
    "Amongst trillions and trillions of stars, over billions of years",
    "To be alive, and to get to spend this life with you",
    "Is so incredibly, unfathomably unlikely",
    "And yet here I am to get the impossible chance to get to know you",
    "I love you so much Subaita, more than all the time and space in the universe can contain",
    "And I can't wait to spend all the time in the world to share that love with you!",
    "Happy Valentine's Day ❤️"
  ];

  // Array defining date options for the 'date' page
  const dateOptions = [
    { icon: <Film className="w-6 h-6" />, text: "Movie Date", type: "movie" },
    { icon: <Gamepad2 className="w-6 h-6" />, text: "Minecraft Date", type: "minecraft" },
    { icon: <Gamepad2 className="w-6 h-6" />, text: "Valorant Date", type: "valorant" },
    { icon: <Pencil className="w-6 h-6" />, text: "Custom Date", type: "custom" }
  ];

  // Handles date selection, navigates to custom date input or sends webhook for other options
  const handleDateSelection = async (type: string) => {
    if (type === 'custom') {
      setCurrentPage('customDate');
    } else {
      playAudio('success'); // Play success sound on date selection
      sendDateWebhook(type);
    }
  };

  // Sends date option choice to Discord webhook
  const sendDateWebhook = async (type: string, customText?: string) => {
    const webhookURL = import.meta.env.VITE_DISCORD_WEBHOOK_URL; // Using environment variable for webhook URL
    let content = '';
    if (type === 'custom' && customText) {
      content = `Custom Date Request: ${customText}`;
    } else {
      content = `Date option selected: ${type}`;
    }

    try {
      await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: "Valentine's Date Option",
            description: content,
            fields: [{ name: "Device Info", value: navigator.userAgent }]
          }]
        })
      });
      setShowConfetti(true);
      setTimeout(() => setCurrentPage('final'), 1500);
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  };

  // Handles submission of custom date text
  const handleCustomDateSubmit = () => {
    playAudio('success'); // Play success sound on custom date submit
    sendDateWebhook('custom', customDateText);
  };

  // Handles the "No" button click, displays a message
  const handleNoClick = () => {
    playAudio('congratulations'); // Play congratulations sound on "No" button click
    setNoClickMessage("Beep boop something wrong happened check with ur husband");
    setTimeout(() => setNoClickMessage(''), 3000);
  };

  // Conditional rendering for loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-50 flex items-center justify-center flex-col">
        <div className="animate-pulse">
          <Heart className="w-16 h-16 text-pink-500" />
        </div>
        <p className="text-pink-500 mt-4 text-lg">{loadingText}</p>
      </div>
    );
  }

  // Renders the home page - "Will you be my Valentine?" question
  const renderHome = () => (
    <div className="text-center animate-fade-up">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-8">Will you be my Valentine?</h1>
      <div className="flex md:flex-row gap-4 justify-center items-center relative">
        <button
          onClick={() => {
            playAudio('click'); // Play click sound on "Yes" button
            setShowConfetti(true);
            setTimeout(() => {
              setShowConfetti(false);
              setCurrentPage('message');
            }, 2000);
          }}
          className="px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transform hover:scale-105 transition-all w-40 order-1"
        >
          Yes
        </button>
        <button
          onMouseOver={(e) => {
            const btn = e.target as HTMLButtonElement;
            const container = document.querySelector('.relative');
            if (container) {
              const rect = container.getBoundingClientRect();
              const x = Math.random() * (rect.width - 150) + 50;
              const y = Math.random() * (rect.height - 70) + 20;
              btn.style.position = 'absolute';
              btn.style.left = `${x}px`;
              btn.style.top = `${y}px`;
              btn.style.transition = 'all 0.1s ease-out';
            }
          }}
          onClick={handleNoClick}
          className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 w-40 transition-none order-2"
          style={{ transition: 'none' }}
        >
          No
        </button>
      </div>
      {noClickMessage && <p className="text-red-500 mt-4">{noClickMessage}</p>}
    </div>
  );

  // Renders the message page - displays messages sequentially
  const renderMessage = () => (
    <div className="text-center max-w-2xl mx-auto px-4 animate-fade-up">
      <p className="text-xl md:text-2xl text-pink-600 mb-8 animate-fade-in min-h-[100px]">
        {messages[messageIndex]}
      </p>
      {messageIndex < messages.length - 1 ? (
        <button
          onClick={() => {
            playAudio('click'); // Play click sound on "Next" message
            setMessageIndex(prev => prev + 1)
          }}
          className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all"
        >
          Next <ArrowRight className="inline ml-2" />
        </button>
      ) : (
        <button
          onClick={() => {
            playAudio('click'); // Play click sound on "Choose a Date"
            setCurrentPage('date')
          }}
          className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all"
        >
          Choose a Date <Heart className="inline ml-2" />
        </button>
      )}
    </div>
  );

  // Renders the date selection page - displays date options
  const renderDateSelection = () => (
    <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl animate-fade-up">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6">Choose a Date Option</h2>
      <div className="grid gap-4">
        {dateOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => {
              playAudio('success'); // Play success sound on date option selection
              handleDateSelection(option.type)
            }}
            className="flex items-center gap-3 w-full px-6 py-4 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl transition-all transform hover:scale-102 hover:shadow-md"
          >
            {option.icon}
            <span>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Renders the custom date input page - allows user to propose a custom date
  const renderCustomDateInput = () => (
    <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl animate-fade-up text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6">Propose a Custom Date</h2>
      <input
        type="text"
        placeholder="Enter your custom date idea"
        className="border-2 border-pink-300 rounded-md p-4 mb-4 w-full text-pink-700 focus:border-pink-500 focus:ring-pink-500"
        value={customDateText}
        onChange={(e) => setCustomDateText(e.target.value)}
      />
      <button
        onClick={handleCustomDateSubmit}
        className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all"
        style={{ width: 'auto' }}
      >
        Send Message to Your Husband
      </button>
       <button
          onClick={() => {
            playAudio('click'); // Play click sound on "Next" after custom date
            setCurrentPage('final')
          }}
          className="mt-4 px-6 py-3 bg-pink-300 text-white rounded-full hover:bg-pink-400 transform hover:scale-105 transition-all"
        >
          Next
        </button>
    </div>
  );

  // Renders the final "Thank You" page
  const renderFinal = () => (
    <div className="text-center animate-fade-up px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">Thank you for being my Valentine! ❤️</h2>
      <div className="relative">
        <img
          src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
          alt="Love"
          className="mx-auto rounded-lg shadow-lg mb-8 max-w-sm w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-100/50 to-transparent rounded-lg"></div>
      </div>
      <p className="text-xl text-pink-500 mb-4">You've made my day special!</p>
      <div className="mt-8">
        <button
          onClick={() => {
            playAudio('click'); // Play click sound on "Go to Flower Page"
            setCurrentPage('flower')
          }}
          className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all"
        >
          Go to Flower Page <Heart className="inline ml-2" />
        </button>
      </div>
    </div>
  );

  // Renders the Flower page with the flower animation
  const renderFlowerPage = () => <FlowerPage />;

  // Main App component rendering logic
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-50 flex items-center justify-center p-4">
      <div className="container relative max-w-4xl mx-auto">
        {/* Floating hearts background component */}
        <FloatingHearts />

        {/* Confetti effect, conditionally rendered */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `-5vh`,
                  backgroundColor: ['#ff69b4', '#ff1493', '#ff69b4', '#ff8da1'][Math.floor(Math.random() * 4)],
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Conditional rendering of pages based on currentPage state */}
        {currentPage === 'home' && renderHome()}
        {currentPage === 'message' && renderMessage()}
        {currentPage === 'date' && renderDateSelection()}
        {currentPage === 'customDate' && renderCustomDateInput()}
        {currentPage === 'final' && renderFinal()}
        {currentPage === 'flower' && renderFlowerPage()}
      </div>
    </div>
  );
}

export default App;