import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message = 'HIIIIIIII';
  messages = [];
  currentUser = '';

  constructor(private socket: Socket, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.socket.connect();

    let name = `user-${new Date().getTime()}`;
    this.currentUser = name;

    this.socket.emit('user_join', name);


    this.socket.fromEvent('new_message').subscribe(message => {
      console.log(message);
      
    });

    this.sendMessage();
  }

  sendMessage() {
    this.socket.emit('new_message', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg: any) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}