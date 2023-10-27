import { addStyles, isChildNode } from '../utils/dom';
import { Manager } from './manager';
import { BaseEvent } from './BaseEvent';

interface DraggableOptions {
  /** name of the css class that triggers the drag */
  handle?: string;
  onStart?: () => void;
  onDrag?: (offset: [number, number]) => void;
  onStop?: () => void;
  onDisabled?: () => void;
  onEnable?: () => void;
}

interface DragOffset {
  left: number;
  top: number;
  width: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
}

const skipMouseDown = 'input,textarea,button,select,option,[contenteditable="true"],.rdl-resizable-handle';

export default class Draggable extends BaseEvent {
  public el: HTMLElement;
  public options: DraggableOptions = {};
  public helper: HTMLElement | null = null;

  protected mouseDownEvent: MouseEvent | null = null;
  protected dragOffset: DragOffset | null = null;
  protected dragElementOriginStyle: Array<string> = [];
  protected dragEl: HTMLElement | null = null;
  protected helperContainer: HTMLElement | null = null;
  protected dragging: boolean = false;
  protected containerOriginStylePosition: string = '';
  protected dragTimeout: number = 0;

  protected static originStyleProp = [
    'transition',
    'pointerEvents',
    'position',
    'left',
    'top',
    'minWidth',
    'willChange',
  ];

  constructor(el: HTMLElement, options: DraggableOptions = {}) {
    super();
    this.el = el;
    this.options = options;

    if (options.handle && el.querySelector(options.handle)) {
      this.dragEl = el.querySelector(options.handle) as HTMLElement;
    } else {
      this.dragEl = el;
    }

    this._mouseDown = this._mouseDown.bind(this);
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);

    this.enable();
  }

  enable(): void {
    if (!this.disabled) return;
    super.enable();
    this.dragEl?.addEventListener('mousedown', this._mouseDown);
    this.options.onEnable?.();
  }

  disable(forDestroy = false): void {
    if (this.disabled) return;
    super.disable();
    this.dragEl?.removeEventListener('mousedown', this._mouseDown);
    if (!forDestroy) this.options.onDisabled?.();
  }

  destroy(): void {
    if (this.dragging && this.mouseDownEvent) this._mouseUp(this.mouseDownEvent);
    this.disable(true);
    this.mouseDownEvent = null;
    this.dragEl = null;
    this.options = {};
  }

  protected _mouseDown(e: MouseEvent): boolean {
    // prevent multiple LayoutItem from triggering mouseStart
    if (Manager.mouseHandled) return false;
    // only left click
    if (e.button !== 0) return true;
    // make sure there are no elements that take effect until the trigger mousedown is clicked.
    if ((e.target as HTMLElement).closest(skipMouseDown)) return true;

    this.mouseDownEvent = e;
    this.dragging = false;
    Manager.dragElement = null;
    document.addEventListener('mousemove', this._mouseMove, true);
    document.addEventListener('mouseup', this._mouseUp, true);

    e.preventDefault();
    if (document.activeElement) (document.activeElement as HTMLElement).blur();

    Manager.mouseHandled = true;
    return true;
  }

  protected _mouseMove(e: MouseEvent): boolean {
    const s = this.mouseDownEvent as MouseEvent;

    if (this.dragging) {
      // TODO：通知元素移动
    } else if (Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 3) {
      this.dragging = true;
      Manager.dragElement = this;

      this.helper = this._createHelper(e);
      this._initHelperContainerStyle();
      this.dragOffset = this._getDragOffset(e, this.el, this.helperContainer as HTMLElement);
      this._initHelperStyle(e);

      this.options.onStart?.();
    }

    e.preventDefault();
    return true;
  }

  protected _mouseUp(e: MouseEvent) {
    document.removeEventListener('mousemove', this._mouseMove, true);
    document.removeEventListener('mouseup', this._mouseUp, true);
    if (this.dragging) {
      this.dragging = false;
    }
    e.preventDefault();
  }

  protected _createHelper(e: MouseEvent): HTMLElement {
    this.dragElementOriginStyle = Draggable.originStyleProp.map(
      (props: string) => (this.el as HTMLElement).style[props as any],
    );
    return this.el as HTMLElement;
  }

  protected _initHelperStyle(e: MouseEvent): Draggable {
    if (!this.dragOffset) return this;
    const { style } = this.helper as HTMLElement;
    style.pointerEvents = 'none';
    style.width = `${this.dragOffset.width}px`;
    style.height = `${this.dragOffset.height}px`;
    style.willChange = 'left, top';
    // Make drag and drop not limited to the parent node Container range
    style.position = 'fixed';
    return this;
  }

  protected _initHelperContainerStyle(): Draggable {
    if (!this.helper) return this;
    this.helperContainer = this.helper.parentElement as HTMLElement;
    if (this.helper.style.position !== 'fixed') {
      this.containerOriginStylePosition = this.helperContainer.style.position;
      if (getComputedStyle(this.helperContainer).position.match(/static/)) {
        this.helperContainer.style.position = 'relative';
      }
    }
    return this;
  }

  protected _getDragOffset(e: MouseEvent, el: HTMLElement, parent: HTMLElement): DragOffset {
    let offsetX = 0;
    let offsetY = 0;
    if (parent) {
      const testEl = document.createElement('div');
      addStyles(testEl, {
        opacity: '0',
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '1px',
        height: '1px',
        zIndex: '-999999',
      });
      parent.appendChild(testEl);
      const testElPosition = testEl.getBoundingClientRect();
      parent.removeChild(testEl);
      offsetX = testElPosition.left;
      offsetY = testElPosition.top;
      // TODO: scale?
    }

    const targetOffset = el.getBoundingClientRect();
    return {
      left: targetOffset.left,
      top: targetOffset.top,
      offsetLeft: targetOffset.left - offsetX - e.clientX,
      offsetTop: targetOffset.top - offsetY - e.clientY,
      width: targetOffset.width,
      height: targetOffset.height,
    };
  }
}
