// Define audio files as an object for easy access
const audioFiles = {
  background: new Audio('/assets/background-music.mp3'), // Background music
  click: new Audio('/assets/click.mp3'), // Click sound effect
  success: new Audio('/assets/success.mp3'), // Success sound effect
  congratulations: new Audio('/assets/congratulations.mp3') // Congratulations sound
};

// Function to play a specific audio type
export const playAudio = (type: keyof typeof audioFiles) => {
  const audio = audioFiles[type];
  audio.currentTime = 0; // Reset audio to start
  audio.play().catch(err => console.warn('Audio playback failed:', err)); // Play audio and catch any errors
};

// Function to stop a specific audio type
export const stopAudio = (type: keyof typeof audioFiles) => {
  const audio = audioFiles[type];
  audio.pause(); // Pause audio playback
  audio.currentTime = 0; // Reset audio time
};

// Function to set up background music to loop and play on user interaction
export const setupBackgroundMusic = () => {
  const bgMusic = audioFiles.background;
  bgMusic.loop = true; // Enable looping for background music
  bgMusic.volume = 0.3; // Set volume to 30%

  // Play background music on the first click event, only once
  document.addEventListener('click', () => {
    bgMusic.play().catch(err => console.warn('Background music failed:', err));
  }, { once: true });
};

