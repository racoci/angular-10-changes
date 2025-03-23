import {Component, DestroyRef, inject, OnInit} from '@angular/core';

import { CounterComponent } from './counter/counter.component';
import { MessagesComponent } from './messages/messages.component';
import {interval, map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CounterComponent, MessagesComponent],
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef)

  private customInterval = new Observable<number>( (subscriber) => {
    let k = 0;
    setInterval(() => {
      subscriber.next(k)
      k++;
    }, 1000);
  });

  get debugOutput() {
    console.log('[AppComponent] "debugOutput" binding re-evaluated.');
    return 'AppComponent Component Debug Output';
  }
  ngOnInit() {
    console.log('[AppComponent] "ngOnInit" binding re-evaluated.');

    const subscription = this.customInterval.pipe(
      map((it) => it * 2)
    ).subscribe({
      next: data => {
        console.log(data);
      },
      complete: () => {
        console.log('[AppComponent] "ngOnInit" complete.');
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }
}
