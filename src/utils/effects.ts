// Function to create and animate confetti effect
export const createConfetti = () => {
  const confettiColors = ['#ff69b4', '#ff1493', '#ff69b4', '#ff8da1']; // Array of confetti colors
  const container = document.createElement('div'); // Create a div container for confetti
  container.className = 'fixed inset-0 pointer-events-none'; // Position container full screen and disable pointer events

  // Loop to create multiple confetti pieces
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div'); // Create a div for each confetti piece
    confetti.className = 'absolute animate-confetti'; // Apply animation class
    // Assign styles for confetti appearance and animation
    Object.assign(confetti.style, {
      left: `${Math.random() * 100}vw`, // Random horizontal position
      top: '-5vh', // Start position above viewport
      backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)], // Random color from array
      width: '10px',
      height: '10px',
      borderRadius: '50%', // Make it round
      animationDelay: `${Math.random() * 2}s`, // Random animation delay
      animationDuration: `${Math.random() * 2 + 1}s` // Random animation duration
    });
    container.appendChild(confetti); // Add confetti to container
  }

  document.body.appendChild(container); // Add container to body
  setTimeout(() => container.remove(), 3000); // Remove container after 3 seconds
};

