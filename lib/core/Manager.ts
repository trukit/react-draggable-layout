import Draggable from './Draggable';
import Resizeable from './Resizeable';

export class Manager {
  public static mouseHandled: boolean = false;

  public static dragElement: Draggable | null = null;

  public static resizeElement: Resizeable | null = null;
}
