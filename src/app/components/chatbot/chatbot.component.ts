import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ChatbotService,
  ChatbotMessage,
  ChatbotDisplayMessage,
} from '../../services/chatbot.service';
import { HotToastService } from '@ngneat/hot-toast';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: ChatbotDisplayMessage[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  isOpen: boolean = false;
  isMenuOpen: boolean = false;
  memoryId: string = '';
  logoImagePath: string = '../assets/images/logo.svg';

  constructor(
    private chatbotService: ChatbotService,
    private toast: HotToastService,
    private sanitizer: DomSanitizer
  ) {
    // Retrieve memoryId from localStorage or generate a new one if not found
    this.memoryId = this.getOrCreateMemoryId();
  }

  ngOnInit() {
    this.loadConversationHistory();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.closeMenu();
    }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const userMessage: ChatbotDisplayMessage = {
      message: this.newMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    // Save user message to local storage
    this.chatbotService.saveMessageToHistory(this.memoryId, userMessage);
    this.messages.push(userMessage);

    const messageToSend = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    this.chatbotService.sendMessage(this.memoryId, messageToSend).subscribe({
      next: async (response) => {
        const botMessage: ChatbotDisplayMessage = {
          message: response.responseMessage,
          isUser: false,
          timestamp: new Date().toISOString(),
        };

        // Parse markdown for bot messages
        if (!botMessage.isUser && response.responseMessage) {
          const parsedHtml = await this.parseMarkdown(response.responseMessage);
          botMessage.parsedContent = parsedHtml;
        }

        // Save bot message to local storage
        this.chatbotService.saveMessageToHistory(this.memoryId, botMessage);
        this.messages.push(botMessage);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.toast.error('Failed to send message. Please try again.');
        this.isLoading = false;
      },
    });
  }

  private async loadConversationHistory() {
    // Load messages from local storage
    const messages = this.chatbotService.getMessages(this.memoryId);

    // Parse markdown for bot messages in history
    for (const message of messages) {
      if (!message.isUser && message.message) {
        const parsedHtml = await this.parseMarkdown(message.message);
        message.parsedContent = parsedHtml;
      }
    }

    this.messages = messages;
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.autoResizeTextarea(textarea);
  }

  private autoResizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  async parseMarkdown(text: string): Promise<SafeHtml> {
    try {
      // Check if text is null, undefined, or empty
      if (!text || text.trim() === '') {
        return this.sanitizer.bypassSecurityTrustHtml('');
      }

      const html = await marked(text);
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return this.sanitizer.bypassSecurityTrustHtml(text || '');
    }
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatTimestamp(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return this.getCurrentTime();
    }
  }

  getMessageContent(message: ChatbotDisplayMessage): string | SafeHtml {
    if (message.isUser) {
      return message.message || '';
    }
    return message.parsedContent || message.message || '';
  }

  // Clear conversation history
  clearConversation() {
    this.chatbotService.clearHistory(this.memoryId);
    this.messages = [];
    this.closeMenu();
    this.toast.success('Conversation history cleared');
  }

  // Get conversation count
  getConversationCount(): number {
    return this.chatbotService.getConversationCount(this.memoryId);
  }

  // Check if conversation exists
  hasConversation(): boolean {
    return this.chatbotService.hasConversation(this.memoryId);
  }

  private getOrCreateMemoryId(): string {
    const storedMemoryId = localStorage.getItem('chatbot_memory_id');

    if (storedMemoryId) {
      return storedMemoryId;
    } else {
      // Generate a new memory ID and store it in localStorage
      const newMemoryId = `user_${Date.now()}@uruti.com`;
      localStorage.setItem('chatbot_memory_id', newMemoryId);
      return newMemoryId;
    }
  }
}
