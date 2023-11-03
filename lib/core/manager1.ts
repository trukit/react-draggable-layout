import Draggable from './Draggable';

export class Manager {
  public static mouseHandled: boolean = false;

  public static dragElement: Draggable | null = null;
}
