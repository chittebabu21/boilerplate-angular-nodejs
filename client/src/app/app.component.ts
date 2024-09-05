import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from './services/socket.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  private messageSubscription!: Subscription;
  messages: string[] = [];
  newMessage: string = '';
  ipDataApiKey = environment.ipDataApiKey;

  constructor(private socketService: SocketService) {
    this.messageSubscription = this.socketService.on('message').subscribe((data) => {
      this.messages.push(data.text);
    });
  }

  ngOnInit(): void {
    this.json(`https://api.ipdata.co?api-key=${this.ipDataApiKey}`).then((data) => {
      console.log(data);
    });
  }

  sendMessage() {
    this.socketService.emit('message', { text: this.newMessage });
    
    if (this.newMessage) {
      this.socketService.insert(this.newMessage).subscribe({
        next: (response: any) => {
          console.log(response);
          this.messages.push(response.message);
        },
        error: (err) => {
          console.log(err);
          throw new Error(err);
        }
      });
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  async json(url: string) {
    const res = await fetch(url);
    return await res.json();
  }
}
