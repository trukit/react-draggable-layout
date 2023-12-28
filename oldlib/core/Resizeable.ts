import { BaseEvent } from './BaseEvent';
import { Manager } from './Manager';
import { mouseDownIgnore } from './constants';

interface ResizeableOptions {
  handle?: string;
  onStart?: () => void;
  onEnable?: () => void;
  onDisable?: () => void;
}

interface ResizeOffset {
  left: number;
  top: number;
  width: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
}

export default class Resizeable extends BaseEvent {
  public el: HTMLElement;
  public options: ResizeableOptions = {};
  public helper: HTMLElement | null = null;

  protected mouseDownEvent: MouseEvent | null = null;
  protected resizeOffset: ResizeOffset | null = null;
  protected resizeEl: HTMLElement | null = null;
  protected resizing: boolean = false;

  protected static originStyleProp = [
    'transition',
    'pointerEvents',
    'position',
    'left',
    'top',
    'minWidth',
    'willChange',
  ];

  constructor(el: HTMLElement, options: ResizeableOptions = {}) {
    super();
    this.el = el;
    this.options = options;

    if (options.handle && el.querySelector(options.handle)) {
      this.resizeEl = el.querySelector(options.handle) as HTMLElement;
    }

    this._mouseDown = this._mouseDown.bind(this);
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);

    this.enable();
  }

  enable(): void {
    if (!this.disable) return;
    super.enable();
    this.resizeEl?.addEventListener('mousedown', this._mouseDown);
    this.options.onEnable?.();
  }

  disable(forDestroy = false): void {
    if (this.disabled) return;
    super.disable();
    this.resizeEl?.removeEventListener('mousedown', this._mouseDown);
    if (!forDestroy) this.options.onDisable?.();
  }

  protected _mouseDown(e: MouseEvent): boolean {
    if (Manager.mouseHandled) return false;
    if (e.button !== 0) return true;
    if ((e.target as HTMLElement).closest(mouseDownIgnore)) return true;

    this.mouseDownEvent = e;
    this.resizing = false;
    Manager.resizeElement = null;
    document.addEventListener('mousemove', this._mouseMove, true);
    document.addEventListener('mouseup', this._mouseUp, true);

    e.preventDefault();
    if (document.activeElement) (document.activeElement as HTMLElement).blur();

    Manager.mouseHandled = true;
    document.body.style.cursor = 'nwse-resize';
    return true;
  }

  protected _mouseMove(e: MouseEvent) {}

  protected _mouseUp(e: MouseEvent) {}
}
