/**
 * @file        GameRoot
 * @author      onble
 * @brief       控制各个组件的zOrder
 * @date        2024-08-23
 */
import { Assert } from "./util/Assert";

const { regClass, property } = Laya;

@regClass()
export class GameRoot extends Laya.Script {
    declare owner: Laya.Sprite;
    private _bg1: Laya.Sprite;
    private _bg2: Laya.Sprite;
    private _bird: Laya.Sprite;
    private _UI: Laya.Sprite;
    /**
     * 生成柱子的父组件
     */
    private _ColumnParent: Laya.Sprite;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        this._bg1 = (this.owner.getChildByName("bg1") as Laya.Sprite) || Assert.ChildNotNull;
        this._bg2 = (this.owner.getChildByName("bg2") as Laya.Sprite) || Assert.ChildNotNull;
        this._bird = (this.owner.getChildByName("bird") as Laya.Sprite) || Assert.ChildNotNull;
        this._ColumnParent = (this.owner.getChildByName("ColumnParent") as Laya.Sprite) || Assert.ChildNotNull;
        this._UI = (this.owner.getChildByName("UI") as Laya.Sprite) || Assert.ChildNotNull;
        this._bg1.zOrder = -2;
        this._bg2.zOrder = -2;
        this._ColumnParent.zOrder = -1;
        this._bird.zOrder = 1;
        this._UI.zOrder = 2;
    }

    //组件被启用后执行，例如节点被添加到舞台后
    //onEnable(): void {}

    //组件被禁用时执行，例如从节点从舞台移除后
    //onDisable(): void {}

    //第一次执行update之前执行，只会执行一次
    //onStart(): void {}

    //手动调用节点销毁时执行
    //onDestroy(): void {}

    //每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onUpdate(): void {}

    //每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onLateUpdate(): void {}

    //鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
    //onMouseClick(): void {}
}
