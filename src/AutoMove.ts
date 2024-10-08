/**
 * @file        AutoMove
 * @author      onble
 * @brief       控制背景舞台自动想左边移动的脚本
 * @date        2024-08-18
 */
import { BirdCtrl } from "./BirdCtrl";
import { main } from "./Scenes/main";
import { Assert } from "./util/Assert";

const { regClass, property } = Laya;
let xSpeed: number = -6;
@regClass()
export class AutoMove extends Laya.Script {
    declare owner: Laya.Sprite;
    private _brid: Laya.Sprite;
    private _bridScript: BirdCtrl;
    private _rigidBody: Laya.RigidBody;
    // 速度为-10,则点击20下才能到达第一个程序生成的柱子所在位置
    // private _xSpeed: number = -10;
    private _xSpeed: number = -5;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        // this._xSpeed = this._xSpeed * (Laya.Browser.clientWidth / Laya.stage.designWidth);
        this._rigidBody = this.owner.getComponent(Laya.RigidBody) || Assert.ComponentNotNull;
        this._rigidBody.linearVelocity = { x: this._xSpeed, y: 0 };
        // 使用事件监听容易出现问题
        // Laya.stage.on("Gameover", this, (Xspeed: number = 0) => {
        //     this.owner.getComponent(Laya.RigidBody).linearVelocity = { x: Xspeed, y: 0 };
        // });
        this._brid = main.instance.bird;
        this._bridScript = this._brid.getComponent(BirdCtrl) || Assert.ComponentNotNull;
        Laya.stage.on("Again", this, () => {
            this._rigidBody.linearVelocity = { x: this._xSpeed, y: 0 };
        });
    }

    //组件被启用后执行，例如节点被添加到舞台后
    onEnable(): void {
        // 必须通过将物体添加到舞台后，再给一下速度
        this._rigidBody.linearVelocity = { x: this._xSpeed, y: 0 };
    }

    //组件被禁用时执行，例如从节点从舞台移除后
    //onDisable(): void {}

    //第一次执行update之前执行，只会执行一次
    //onStart(): void {}

    //手动调用节点销毁时执行
    //onDestroy(): void {}

    //每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    onUpdate(): void {
        if (this._bridScript.getIsGameOver()) {
            this._rigidBody.linearVelocity = { x: 0, y: 0 };
        }
    }

    //每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onLateUpdate(): void {}

    //鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
    //onMouseClick(): void {}
}
