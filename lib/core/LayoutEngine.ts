import { Layout } from '../types';

interface LayoutNode {}

interface LayoutEngineOptions {
  colCount?: number;
  float?: boolean;
  layoutList?: Layout[];
  onChange?: (layoutList: Layout[]) => void;
}

export default class LayoutEngine {
  public colCount: number = 12;
  public nodes: LayoutNode[] = [];

  protected _float: boolean;
  protected onChange?: (layoutList: Layout[]) => void;

  constructor(opts: LayoutEngineOptions) {
    this.colCount = opts.colCount ?? 12;
    this._float = opts.float ?? false;
    this.nodes = opts.layoutList ? this.layoutsToNodes(opts.layoutList) : [];
    this.onChange = opts.onChange;
  }

  /** 批量更新 */
  public batchUpdate(flag = true, doPack = true) {}

  /** 将两个相同大小的块，进行置换 */
  public swap() {}

  /** 检查节点是否可以移动 */
  public moveNodeCheck() {}

  public willItFit() {}

  public changedPosConstrain() {}

  public moveNode() {}

  public beginUpdate() {}

  public endUpdate() {}

  public save() {}

  protected layoutsToNodes(layouts: Layout[]): LayoutNode[] {
    return [];
  }

  protected nodesToLayouts(nodes: LayoutNode[]): Layout[] {
    return [];
  }

  protected directionCollideCoverage() {}
}
