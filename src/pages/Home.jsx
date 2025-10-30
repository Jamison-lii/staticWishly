import React, { useEffect, useState, useRef } from "react";
import { FiHeart, FiShare2, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import D1 from '../assets/D1.jpeg';
import D2 from '../assets/D2.jpeg';
import D3 from '../assets/D3.jpeg';
import D4 from '../assets/D4.jpeg';
import D5 from '../assets/D5.jpeg';
import D6 from '../assets/D6.jpeg';
import BackgroundMusic from '../assets/Adun.mp3';

const BirthdayCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false); // New state for content visibility
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(BackgroundMusic);
    audioRef.current.loop = true;

    // Try to autoplay when component mounts
    const playPromise = audioRef.current.play();

    playPromise.then(() => {
      setIsMusicPlaying(true);
      setShowContent(true); // Show content when audio plays successfully
    }).catch(error => {
      console.log("Autoplay prevented:", error);
      // Show a play button overlay instead of content
      setShowContent(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayButtonClick = () => {
    audioRef.current.play()
      .then(() => {
        setIsMusicPlaying(true);
        setShowContent(true); // Show content after user interaction
      })
      .catch(error => console.log("Playback failed:", error));
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Card data with image-specific messages
  const cardData = {
    name: "Joy",
    images: [
      { 
        src: D1, 
        message: "Yoo whatsup? 😂, So its your birthday today, I'm sure your getting alot of wishes and gifts, I dont have gift but i can write code , check out the scripture below",
        caption: "📖 Jeremiah 29:11 : For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
      },
      { 
        src: D2, 
        message: "Sometimes things dont work .......  even the best of us gets confused but all things work for good ",
        caption: "📖 Romans 8:28 : And we know that in all things God works for the good of those who love Him, who have been called according to His purpose."
      },
      { 
        src: D3, 
        message: "When life is showing you shege speak in tongues , say after me 😂 shatarabababa",
        caption: "📖 Isaiah 41:10 : So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."
      },
       { 
        src: D4, 
        message: "Here's a scripture i like in genesis it goes, God bless the soil which drinks in the rain that falls on it. If i were to continue that verse i probably write what you see below",
        caption: "📖 God bless the sky which holds the clouds, God bless the sky which holds the sun , God bless the sky which holds the moon which gives us light in the dark"
      },
       { 
        src: D5, 
        message: "If your data permitted you to see this one then know that",
        caption: "📖Psalms 118:24 This is the day that the Lord has made; Let us rejoice and be glad in it"
      },
       { 
        src: D6, 
        message: "Anyhow sha , happy birthday",
        caption: "📖 Numbers 6:24-25 : The Lord bless you and keep you, the Lord make his face shone on ou and be gracious to you, the lord look kindly on you and give you peace"
      }
    ],
    defaultCaption: "May your day be as special as you are"
  };

  const { name, images, defaultCaption } = cardData;
  const { message, caption } = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const shareCard = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Birthday Wishes for ${name}`,
          text: `Check out these birthday wishes for ${name}!`,
          url: window.location.href,
        });
      } else {
        alert(`Share this link: ${window.location.href}`);
      }
    } catch (err) {
      console.log('Sharing cancelled', err);
    }
  };

  if (!showContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
        <button
          onClick={handlePlayButtonClick}
          className="bg-white text-pink-600 px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-pink-100 transition-all flex items-center gap-2"
        >
          <FiVolume2 className="text-2xl" />
          Click to Start Birthday Celebration
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      {/* Music Control */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-4 left-4 z-40 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all"
        aria-label={isMusicPlaying ? "Mute music" : "Play music"}
      >
        {isMusicPlaying ? <FiVolume2 className="text-pink-600" /> : <FiVolumeX className="text-pink-600" />}
      </button>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white flex justify-between items-center">
          <button 
            onClick={shareCard}
            className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30"
          >
            <FiShare2 /> Share
          </button>
        </div>

        <div className="md:flex">
          {/* Enhanced Image Gallery */}
          <div className="relative w-full md:w-1/2 aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={images[currentImageIndex].src}
                alt={`Birthday memory ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-lg rounded-lg"
                onClick={() => setIsFullscreen(true)}
              />
            </div>
            
            {/* Navigation Controls */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all"
                >
                  <FiChevronLeft className="h-5 w-5 text-pink-600" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all"
                >
                  <FiChevronRight className="h-5 w-5 text-pink-600" />
                </button>
              </>
            )}
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-pink-600 w-6' : 'bg-white/80 w-2'}`}
                />
              ))}
            </div>
          </div>

          {/* Message Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-pink-600 mb-2">Happy Birthday</h1>
              <h2 className="text-3xl font-semibold text-gray-800">{name}!</h2>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-6 transition-all duration-300">
              <p className="text-gray-700 text-lg italic mb-4">"{message}"</p>
              <div className="flex items-center justify-end">
                <FiHeart className="text-pink-500 mr-2" />
                <span className="text-gray-600">With love</span>
              </div>
            </div>
            
            <p className="text-center text-gray-500 mb-6">
              {caption || defaultCaption}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => window.print()}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition-all"
              >
                Print Card
              </button>
            {/*  <button 
                onClick={() => navigate('/')}
                className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg font-medium hover:bg-pink-50 transition-all"
              >
                Create Another
              </button>*/}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsFullscreen(false)}
          >
            &times;
          </button>
          <div className="relative w-full max-w-4xl h-full max-h-screen">
            <img
              src={images[currentImageIndex].src}
              alt={`Fullscreen view`}
              className="w-full h-full object-contain"
            />
            {images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="text-center mt-6 text-gray-500 text-sm">
        <p>PS: I dont have money, but I can code 😅,  So I made this</p>
      </div>
    </div>
  );
};

export default BirthdayCard;