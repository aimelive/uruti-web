import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

export interface ChatbotRequest {
  memoryId: string;
  message: string;
}

export interface ChatbotResponse {
  memoryId: string;
  responseMessage: string;
}

export interface ChatbotMessage {
  question: string;
  answer: string;
  questionTimestamp: string;
  answerTimestamp: string;
}

export interface ChatbotDisplayMessage {
  message: string;
  isUser: boolean;
  timestamp: string;
  parsedContent?: SafeHtml;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = environment.chatbotUrl;

  constructor(private http: HttpClient) {}

  // Send a message and get response
  sendMessage(memoryId: string, message: string): Observable<ChatbotResponse> {
    const request: ChatbotRequest = { memoryId, message };
    return this.http.post<ChatbotResponse>(this.apiUrl, request);
  }

  // Save message to local storage
  saveMessageToHistory(memoryId: string, message: ChatbotDisplayMessage): void {
    const storageKey = `chatbot_history_${memoryId}`;
    const existingHistory = this.getMessagesFromStorage(memoryId);
    existingHistory.push(message);
    localStorage.setItem(storageKey, JSON.stringify(existingHistory));
  }

  // Get conversation history from local storage
  getMessages(memoryId: string): ChatbotDisplayMessage[] {
    return this.getMessagesFromStorage(memoryId);
  }

  // Get messages from localStorage
  private getMessagesFromStorage(memoryId: string): ChatbotDisplayMessage[] {
    const storageKey = `chatbot_history_${memoryId}`;
    const history = localStorage.getItem(storageKey);
    if (!history) return [];

    try {
      const parsedHistory = JSON.parse(history);
      // Validate that the parsed data is an array
      return Array.isArray(parsedHistory) ? parsedHistory : [];
    } catch (error) {
      console.error(
        'Error parsing conversation history from localStorage:',
        error
      );
      return [];
    }
  }

  // Clear conversation history
  clearHistory(memoryId: string): void {
    const storageKey = `chatbot_history_${memoryId}`;
    localStorage.removeItem(storageKey);
  }

  // Get conversation count
  getConversationCount(memoryId: string): number {
    return this.getMessagesFromStorage(memoryId).length;
  }

  // Check if conversation exists
  hasConversation(memoryId: string): boolean {
    const storageKey = `chatbot_history_${memoryId}`;
    return localStorage.getItem(storageKey) !== null;
  }
}
