import { Howl } from 'howler';

// Define audio files as an object for easy access using Howler.js
const audioFiles = {
  background: new Howl({ src: ['/assets/background-music.mp3'], loop: true, volume: 0.3 }), // Background music, looping, volume adjusted
  click: new Howl({ src: ['/assets/click.mp3'] }), // Click sound effect
  success: new Howl({ src: ['/assets/success.mp3'] }), // Success sound effect
  congratulations: new Howl({ src: ['/assets/congratulations.mp3'] }) // Congratulations sound
};

// Function to play a specific audio type
export const playAudio = (type: keyof typeof audioFiles) => {
  const audio = audioFiles[type];
  if (audio.playing()) {
    audio.stop();
  }
  audio.play(); // Play audio, Howler handles playback management
};

// Function to stop a specific audio type
export const stopAudio = (type: keyof typeof audioFiles) => {
  const audio = audioFiles[type];
  audio.stop(); // Stop audio playback using Howler
};

// Function to set up background music to loop and play on user interaction
export const setupBackgroundMusic = () => {
  const bgMusic = audioFiles.background;

  // Play background music on the first click event, only once
  document.addEventListener('click', () => {
    bgMusic.play();
  }, { once: true });
};
