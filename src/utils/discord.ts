// Discord webhook URL is now sourced from environment variables for security and configurability
const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

// Async function to send a message to Discord via webhook
export const sendWebhookMessage = async (message: string) => {
  try {
    // Send a POST request to the Discord webhook URL
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `${message}\nDevice Info: ${navigator.userAgent}` // Include message and device info
      })
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Webhook request failed'); // Throw error if not successful
    }
  } catch (error) {
    console.error('Error sending webhook:', error); // Log any errors during webhook sending
  }
};

