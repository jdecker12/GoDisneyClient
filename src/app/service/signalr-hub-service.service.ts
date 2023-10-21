import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalrHubServiceService {

  private hubConnection: signalR.HubConnection;

  constructor() {
      this.hubConnection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7164/chatHub")
          .configureLogging(signalR.LogLevel.Information)
          .build();

      this.startConnection();
  }

  startConnection = () => {
      this.hubConnection.start()
          .then(() => {
              console.log("Connected to chatHub");
          })
          .catch(err => {
              console.error("Error connecting to chatHub: " + err);
          });
  }

  onChatMessageReceived(callback: (user: string, message: string) => void) {
    this.hubConnection.on("RecieveMessage", (user: string, message: string) => {
        // Call the provided callback function when a chat message is received
        callback(user, message);
    });
}

// Send a chat message to the server
sendChatMessage(user: string, message: string) {
    this.hubConnection.invoke("SendMessage", user, message)
        .catch(err => {
            console.error("Error sending chat message: " + err);
        });
}

}
