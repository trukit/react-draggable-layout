import type { ILayoutData, IWidget, IWidgetPosition } from './types';
import * as Utils from './utils';

export class LayoutEngine {
  widgets: IWidget[];
  layoutData: ILayoutData;
  batchMode: boolean = false; // true = batch update, false = single update

  protected _float?: boolean;
  protected _prevFloat?: boolean;
  /** 如果我们锁定了某些项目，则为 true */
  protected _hasLocked?: boolean;

  constructor(widgets: IWidget[], layoutData: ILayoutData, float: boolean = false) {
    this.widgets = widgets;
    this.layoutData = layoutData;
    this._float = float;
  }

  /** enable/disable floating widgets (default: `false`) See [example](http://gridstackjs.com/demo/float.html) */
  public set float(val: boolean) {
    if (this._float === val) {
      return;
    }
    this._float = val || false;
    if (!val) {
      this._packNodes();
      this._notify();
    }
  }

  /** float getter method */
  public get float(): boolean {
    return this._float || false;
  }

  public moveWidget(widget: IWidget, x: number, y: number, w?: number, h?: number, noPack?: boolean): IWidget {
    if (widget.static) return widget;
    if (typeof w !== 'undefined') {
      w = widget.w;
    }
    if (typeof h !== 'undefined') {
      h = widget.h;
    }

    let resizing = widget.w !== w || widget.h !== h;
    let ww: IWidget = {
      x,
      y,
      w: w as number,
      h: h as number,
      id: '',
      maxW: widget.maxW,
      minW: widget.minW,
      maxH: widget.maxH,
      minH: widget.minH,
    };
    ww = this.prepareWidget(ww, resizing);
    if (widget.x === ww.x && widget.y === ww.y && widget.w === ww.w && widget.h === ww.h) {
      return widget;
    }

    widget._dirty = true;
    widget.x = w;
  }

  /**
   * given a random node, makes sure it's coordinates/values are valid in the current grid
   * @param node to adjust
   * @param resizing if out of bound, resize down or move into the grid to fit ?
   */
  public prepareWidget(widget: IWidget, resizing?: boolean): IWidget {
    node = node || {};
    // if we're missing position, have the grid position us automatically (before we set them to 0,0)
    if (node.x === undefined || node.y === undefined || node.x === null || node.y === null) {
      node.autoPosition = true;
    }

    // assign defaults for missing required fields
    let defaults = { width: 1, height: 1, x: 0, y: 0 };
    node = Utils.defaults(node, defaults);

    node.autoPosition = node.autoPosition || false;
    node.noResize = node.noResize || false;
    node.noMove = node.noMove || false;

    // check for NaN (in case messed up strings were passed. can't do parseInt() || defaults.x above as 0 is valid #)
    if (Number.isNaN(node.x)) {
      node.x = defaults.x;
      node.autoPosition = true;
    }
    if (Number.isNaN(node.y)) {
      node.y = defaults.y;
      node.autoPosition = true;
    }
    if (Number.isNaN(node.width)) {
      node.width = defaults.width;
    }
    if (Number.isNaN(node.height)) {
      node.height = defaults.height;
    }

    if (node.maxWidth) {
      node.width = Math.min(node.width, node.maxWidth);
    }
    if (node.maxHeight) {
      node.height = Math.min(node.height, node.maxHeight);
    }
    if (node.minWidth) {
      node.width = Math.max(node.width, node.minWidth);
    }
    if (node.minHeight) {
      node.height = Math.max(node.height, node.minHeight);
    }

    if (node.width > this.column) {
      node.width = this.column;
    } else if (node.width < 1) {
      node.width = 1;
    }

    if (this.maxRow && node.height > this.maxRow) {
      node.height = this.maxRow;
    } else if (node.height < 1) {
      node.height = 1;
    }

    if (node.x < 0) {
      node.x = 0;
    }
    if (node.y < 0) {
      node.y = 0;
    }

    if (node.x + node.width > this.column) {
      if (resizing) {
        node.width = this.column - node.x;
      } else {
        node.x = this.column - node.width;
      }
    }
    if (this.maxRow && node.y + node.height > this.maxRow) {
      if (resizing) {
        node.height = this.maxRow - node.y;
      } else {
        node.y = this.maxRow - node.height;
      }
    }

    return node;
  }

  public batchUpdate(): LayoutEngine {
    if (this.batchMode) return this;
    this.batchMode = true;
    this._prevFloat = this._float;
    this._float = true; // let things go anywhere for now... commit() will restore and possibly reposition
    return this;
  }

  public commit(): LayoutEngine {
    if (!this.batchMode) return this;
    this.batchMode = false;
    this._float = this._prevFloat;
    delete this._prevFloat;
    this._packNodes();
    this._notify();
    return this;
  }

  public isAreaEmpty(x: number, y: number, w: number, h: number): boolean {
    let ww: IWidget = { x: x || 0, y: y || 0, w: w || 1, h: h || 1, id: '' };
    let collisionNode = this.widgets.find((w) => {
      return this._isCollisions(w, ww);
    });
    return !collisionNode;
  }

  /** re-layout grid items to reclaim any empty space */
  public compact(): LayoutEngine {
    if (this.widgets.length === 0) {
      return this;
    }
    this.batchUpdate();
    this._sortWidgets();
    let copyNodes = this.widgets;
    this.widgets = []; // pretend we have no nodes to conflict layout to start with...
    copyNodes.forEach((node) => {
      if (!node.noMove && !node.locked) {
        node.autoPosition = true;
      }
      this.addNode(node, false); // 'false' for add event trigger
      node._dirty = true; // force attr update
    });
    this.commit();
    return this;
  }

  cleanNodes() {}

  saveInitial() {}

  /** @internal fix collision on given 'node', going to given new location 'nn', with optional 'collide' node already found.
   * return true if we moved. */
  protected _fixCollisions(widget: IWidget): LayoutEngine {
    this._sortWidgets(-1); // from last to first, so recursive collision move items in the right order

    let ww = widget;
    let hasLocked = Boolean(this.widgets.find((w) => w.static));
    if (!this.float && !hasLocked) {
      ww = {
        x: 0,
        y: widget.y,
        w: this.layoutData.cols,
        h: widget.h,
        id: 'rdl-action-widget',
      };
    }
    while (true) {
      let collisionWidget = this.widgets.find((w) => this._isCollisions(w, ww));
      if (!collisionWidget) {
        return this;
      }
      let moved;
      if (collisionWidget.static) {
        moved = this.moveWidget(widget, widget.x, collisionWidget.y + collisionWidget.h, widget.w, widget.h, true);
      } else {
        moved = this.moveWidget(
          collisionWidget,
          collisionWidget.x,
          widget.y + widget.h,
          collisionWidget.w,
          collisionWidget.h,
          true,
        );
      }
      if (!moved) return this;
    }
  }

  /** @internal */
  private _packNodes(): LayoutEngine {
    this._sortWidgets();

    if (this.float) {
      this.widgets.forEach((n, i) => {
        if (n._updating || n._packY === undefined || n.y === n._packY) {
          return this;
        }
        let newY = n.y;
        while (newY >= n._packY) {
          let box = { x: n.x, y: newY, width: n.width, height: n.height };
          let collisionNode = this.widgets.slice(0, i).find((bn) => Utils.isIntercepted(box, bn), { n: n, newY: newY });
          if (!collisionNode) {
            n._dirty = true;
            n.y = newY;
          }
          --newY;
        }
      });
    } else {
      this.widgets.forEach((n, i) => {
        if (n.locked) {
          return this;
        }
        while (n.y > 0) {
          let newY = n.y - 1;
          let canBeMoved = i === 0;
          let box = { x: n.x, y: newY, width: n.width, height: n.height };
          if (i > 0) {
            let collisionNode = this.widgets
              .slice(0, i)
              .find((bn) => Utils.isIntercepted(box, bn), { n: n, newY: newY });
            canBeMoved = collisionNode === undefined;
          }

          if (!canBeMoved) {
            break;
          }
          // Note: must be dirty (from last position) for GridStack::OnChange CB to update positions
          // and move items back. The user 'change' CB should detect changes from the original
          // starting position instead.
          n._dirty = n.y !== newY;
          n.y = newY;
        }
      });
    }
    return this;
  }

  protected _notify() {}

  protected _sortWidgets(dir?: -1 | 1): LayoutEngine {
    this.widgets = Utils.sort(this.widgets, dir);
    return this;
  }

  /**
   * 获取容器的最大行数
   * @param widgets 布局组件数组
   * @returns
   */
  protected _getMaxRow(widgets: IWidget[]): number {
    let max = 0;
    widgets.forEach((w) => {
      max = Math.max(max, w.y + w.h);
    });
    return max;
  }

  protected _getStaticWidgets(widgets: IWidget[]): IWidget[] {
    return widgets.filter((w) => w.static);
  }

  protected _getFirstCollision(widgets: IWidget[], widget: IWidget): IWidget | null {
    for (const w of widgets) {
      if (this._isCollisions(w, widget)) {
        return w;
      }
    }
    return null;
  }

  protected _isCollisions(a: IWidget, b: IWidget): boolean {
    if (a.id === b.id) return false;
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
  }
}
