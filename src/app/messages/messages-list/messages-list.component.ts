import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit} from '@angular/core';
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  constructor(
    private messagesService: MessagesService,
    private changeDetectionReference: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}
  messages: string[] = []

  ngOnInit() {
    const subscription = this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.changeDetectionReference.markForCheck();
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
