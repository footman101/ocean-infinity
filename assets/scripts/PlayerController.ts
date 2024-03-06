import {
  _decorator,
  Component,
  EventMouse,
  Input,
  input,
  Vec2,
  Vec3,
} from "cc";
const { ccclass } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  private moveSpeed: number = 1;
  private mousePosition: Vec2;

  start() {}

  protected onLoad(): void {
    input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }

  protected onDestroy(): void {
    input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }

  update(deltaTime: number) {
    if (!this.mousePosition) {
      return;
    }

    const curPos = this.node.getWorldPosition().clone();

    const deltaX = this.mousePosition.x - curPos.x;
    const deltaY = this.mousePosition.y - curPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const deltaPos = new Vec3(
      (deltaX / distance) * this.moveSpeed,
      (deltaY / distance) * this.moveSpeed,
      0
    );

    this.node.setWorldPosition(
      new Vec3(curPos.x + deltaPos.x, curPos.y + deltaPos.y, 0)
    );
  }

  onMouseMove(event: EventMouse) {
    this.mousePosition = event.getUILocation();

    console.log(this.mousePosition, this.node.getWorldPosition());
  }
}
