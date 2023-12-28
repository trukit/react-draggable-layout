export type EventCallback = (event: Event) => boolean | void;

export abstract class BaseEvent {
  public get disabled(): boolean {
    return this._disabled;
  }

  public on(event: string, callback: EventCallback): void {
    this._eventMap[event] = callback;
  }

  public trigger(eventName: string, event: Event): boolean | void {
    if (!this.disabled && this._eventMap && this._eventMap[eventName]) {
      return this._eventMap[eventName](event);
    }
  }

  public off(event: string): void {
    delete this._eventMap[event];
  }

  public enable(): void {
    this._disabled = false;
  }

  public disable(): void {
    this._disabled = true;
  }

  /** Whether the operation type is disabled. */
  protected _disabled: boolean = true;
  protected _eventMap: {
    [eventName: string]: EventCallback;
  } = {};
}
