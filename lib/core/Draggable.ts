import { addStyles } from '../utils/dom';
import { Manager } from './manager';
import { BaseEvent } from './BaseEvent';
import { DragUI } from '../types';

interface DraggableOptions {
  /** name of the css class that triggers the drag */
  handle?: string;
  onStart?: () => void;
  onDrag?: (ui: DragUI) => void;
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

type DragEvent = 'drag' | 'dragstart' | 'dragstop';

const mouseDownIgnore = 'input,textarea,button,select,option,[contenteditable="true"],.rdl-resizable-handle';

export default class Draggable extends BaseEvent {
  public el: HTMLElement;
  public options: DraggableOptions = {};
  public helper: HTMLElement | null = null;

  protected mouseDownEvent: MouseEvent | null = null;
  protected dragOffset: DragOffset | null = null;
  protected dragItemOriginStyle: Partial<CSSStyleDeclaration> = {};
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

  updateOptions(options: DraggableOptions) {
    console.log('更新方法');
    this.options = {
      ...this.options,
      ...options,
    };
  }

  enable(): void {
    if (!this.disabled) return;
    super.enable();
    // console.log('--- enable', this.dragEl);
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

  ui(): DragUI {
    const containerEl = this.el.parentElement;
    const containerRect = (containerEl as HTMLElement).getBoundingClientRect();
    const offset = (this.helper as HTMLElement).getBoundingClientRect();
    return {
      position: {
        top: offset.top - containerRect.top,
        left: offset.left - containerRect.left,
      },
    };
  }

  protected _mouseDown(e: MouseEvent): boolean {
    // prevent multiple LayoutItem from triggering mouseStart
    if (Manager.mouseHandled) return false;
    // only left click
    if (e.button !== 0) return true;
    // make sure there are no elements that take effect until the trigger mousedown is clicked.
    if ((e.target as HTMLElement).closest(mouseDownIgnore)) return true;

    this.mouseDownEvent = e;
    this.dragging = false;
    Manager.dragElement = null;
    document.addEventListener('mousemove', this._mouseMove, true);
    document.addEventListener('mouseup', this._mouseUp, true);

    e.preventDefault();
    if (document.activeElement) (document.activeElement as HTMLElement).blur();

    Manager.mouseHandled = true;
    document.body.style.cursor = 'grabbing';
    return true;
  }

  protected _callDrag(e: MouseEvent) {
    if (!this.dragging) return;
    this.options.onDrag?.(this.ui());
    this.trigger('drag', e);
  }

  protected _mouseMove(e: MouseEvent): boolean {
    const s = this.mouseDownEvent as MouseEvent;

    if (this.dragging) {
      this._dragFollow(e);
      this._callDrag(e);
      // TODO: 可以做延时优化
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

      (this.helperContainer as HTMLElement).style.position = this.containerOriginStylePosition || '';
      this._removeHelperStyle();
      document.body.style.cursor = 'auto';
      this.options.onStop?.();
    }
    this.helper = null;
    this.mouseDownEvent = null;
    Manager.dragElement = null;
    Manager.mouseHandled = false;
    e.preventDefault();
  }

  protected _createHelper(e: MouseEvent): HTMLElement {
    for (const props of Draggable.originStyleProp) {
      this.dragItemOriginStyle[props as any] = (this.el as HTMLElement).style[props as any];
    }
    // console.log('---- dragItemOriginStyle', this.dragItemOriginStyle);
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
    style.transition = 'none';
    this._dragFollow(e);
    return this;
  }

  protected _removeHelperStyle(): Draggable {
    if (this.dragItemOriginStyle) {
      const helper = this.helper as HTMLElement;
      const transition = this.dragItemOriginStyle['transition'] || '';
      this.dragItemOriginStyle['transition'] = 'none';
      helper.style.transition = 'none';
      for (const props of Draggable.originStyleProp) {
        helper.style[props as any] = this.dragItemOriginStyle[props as any] || '';
      }
      setTimeout(() => (helper.style.transition = transition), 50);
    }
    return this;
  }

  protected _dragFollow(e: MouseEvent) {
    const { style } = this.helper as HTMLElement;
    const offset = this.dragOffset as DragOffset;
    style.left = `${e.clientX + offset.offsetLeft}px`;
    style.top = `${e.clientY + offset.offsetTop}px`;
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
