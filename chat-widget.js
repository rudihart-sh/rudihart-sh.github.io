/**
 * Project Management Chat Widget
 * Floating chat interface untuk Project Management Assistant
 */

class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    this.apiBaseUrl = "https://your-vercel-api.vercel.app"; // Will be updated during setup
    this.init();
  }

  init() {
    this.createWidgetHTML();
    this.attachEventListeners();
    this.loadConversationHistory();
  }

  createWidgetHTML() {
    // Create widget container
    const widgetHTML = `
      <div id="chat-widget-container" class="chat-widget-container">
        <!-- Chat Button -->
        <button id="chat-widget-btn" class="chat-widget-btn" title="Project Management Assistant">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="unread-badge" id="unread-badge" style="display: none;">1</span>
        </button>

        <!-- Chat Window -->
        <div id="chat-widget-window" class="chat-widget-window hidden">
          <!-- Header -->
          <div class="chat-header">
            <h3>Project Management Assistant</h3>
            <button id="chat-close-btn" class="chat-close-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Messages Container -->
          <div id="chat-messages" class="chat-messages">
            <div class="chat-message bot-message">
              <p>Halo! 👋 Saya adalah Project Management Assistant. Tanyakan tentang proyek, timeline, atau assessment task Anda.</p>
              <small>Contoh: "Berapa timeline Website Redesign?" atau "Apa saja tasks di Mobile App?"</small>
            </div>
          </div>

          <!-- Input Area -->
          <div class="chat-input-area">
            <input
              type="text"
              id="chat-input"
              class="chat-input"
              placeholder="Tanya tentang proyek..."
              autocomplete="off"
            />
            <button id="chat-send-btn" class="chat-send-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    // Inject HTML
    document.body.insertAdjacentHTML("beforeend", widgetHTML);
  }

  attachEventListeners() {
    const btnOpen = document.getElementById("chat-widget-btn");
    const btnClose = document.getElementById("chat-close-btn");
    const btnSend = document.getElementById("chat-send-btn");
    const inputField = document.getElementById("chat-input");

    btnOpen.addEventListener("click", () => this.toggleWidget());
    btnClose.addEventListener("click", () => this.closeWidget());
    btnSend.addEventListener("click", () => this.sendMessage());

    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });
  }

  toggleWidget() {
    this.isOpen ? this.closeWidget() : this.openWidget();
  }

  openWidget() {
    const window = document.getElementById("chat-widget-window");
    window.classList.remove("hidden");
    this.isOpen = true;
    document.getElementById("chat-input").focus();
    document.getElementById("unread-badge").style.display = "none";
  }

  closeWidget() {
    const window = document.getElementById("chat-widget-window");
    window.classList.add("hidden");
    this.isOpen = false;
  }

  async sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();

    if (!message) return;

    // Add user message to UI
    this.addMessageToUI(message, "user");
    input.value = "";

    // Add to conversation history
    this.conversationHistory.push({
      role: "user",
      content: message,
    });

    // Show loading indicator
    this.showLoadingIndicator();

    try {
      // Send to API
      const response = await fetch(`${this.apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          conversation_history: this.conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const botResponse = data.response;

      // Remove loading indicator
      this.removeLoadingIndicator();

      // Add bot response
      this.addMessageToUI(botResponse, "bot");

      // Add to conversation history
      this.conversationHistory.push({
        role: "assistant",
        content: botResponse,
      });

      // Save conversation
      this.saveConversationHistory();

      // Auto scroll to bottom
      this.scrollToBottom();
    } catch (error) {
      this.removeLoadingIndicator();
      this.addMessageToUI(
        `Maaf, ada error: ${error.message}. Pastikan API sudah dikonfigurasi dengan benar.`,
        "bot"
      );
      console.error("Chat error:", error);
    }
  }

  addMessageToUI(message, sender) {
    const messagesContainer = document.getElementById("chat-messages");
    const messageClass = sender === "user" ? "user-message" : "bot-message";

    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${messageClass}`;

    // Handle markdown-like formatting for bot messages
    if (sender === "bot") {
      messageElement.innerHTML = `<p>${this.formatMessage(message)}</p>`;
    } else {
      messageElement.textContent = message;
    }

    messagesContainer.appendChild(messageElement);
    this.scrollToBottom();
  }

  formatMessage(message) {
    // Basic formatting untuk bold dan links
    return message
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  showLoadingIndicator() {
    const messagesContainer = document.getElementById("chat-messages");
    const loadingElement = document.createElement("div");
    loadingElement.className = "chat-message bot-message loading";
    loadingElement.id = "loading-indicator";
    loadingElement.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    messagesContainer.appendChild(loadingElement);
    this.scrollToBottom();
  }

  removeLoadingIndicator() {
    const loading = document.getElementById("loading-indicator");
    if (loading) loading.remove();
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById("chat-messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  saveConversationHistory() {
    localStorage.setItem(
      "chatHistory",
      JSON.stringify(this.conversationHistory)
    );
  }

  loadConversationHistory() {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
      try {
        this.conversationHistory = JSON.parse(saved);
      } catch (e) {
        console.error("Error loading conversation history:", e);
      }
    }
  }

  setApiUrl(url) {
    this.apiBaseUrl = url;
  }
}

// Initialize widget when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.chatWidget = new ChatWidget();

  // Configure API URL - UPDATE THIS WITH YOUR VERCEL API URL
  // Example: window.chatWidget.setApiUrl("https://your-project.vercel.app");
});
