import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';


@Directive({
  selector: '[appDebounce]',
  standalone: false
})

export class DebounceclickDirective {
  @Input() debounceTime = 500; //default
  @Output() debounceClick = new EventEmitter();

  private timeout: any;

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.debounceClick.emit(event);
    }, this.debounceTime)
  }

}