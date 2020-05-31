import { Component, Input, AfterViewInit } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements AfterViewInit {
  @Input() selected: string;
  targetNumber: number;
  message: string;
  innerHeight: number;

  private ipc: IpcRenderer | undefined;

  constructor() {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.innerHeight = window.innerHeight;
      window.addEventListener('resize', () => { this.innerHeight = window.innerHeight; });
    });
  }

  public sendSms(): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send('sendSms', [this.targetNumber, this.message]);
  }
  public makeCall(): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send('makeCall', [this.targetNumber]);
  }
}
