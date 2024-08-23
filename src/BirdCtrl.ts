/**
 * @file        BirdCtrl
 * @author      onble
 * @brief       控制小鸟
 * @date        2024-08-18
 */
import { Assert } from "./util/Assert";

const { regClass, property } = Laya;
const IdleImage = "/resources/images/BirdHero_01.png";
let IdleTexture: Laya.Texture;
const FlyImage = "/resources/images/BirdHero_02.png";
let FlyTexture: Laya.Texture;
const DieImage = "/resources/images/BirdHero_03.png";
let DieTexture: Laya.Texture;
/**
 * 游戏是否结束
 */
let isGameOver: boolean = false;
/**
 * 游戏是否开始
 */
let isStart: boolean = false;
@regClass()
export class BirdCtrl extends Laya.Script {
    declare owner: Laya.Sprite;

    private _isFlying: boolean = false;
    private _isIdleing: boolean = true;
    /**
     * 是否游戏结束
     */
    // private _isGameOver: boolean = false;
    // get isGameOver(): boolean {
    //     return this._isGameOver;
    // }
    public getIsGameOver(): boolean {
        return isGameOver;
    }

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        // 去加载资源用来使用
        Laya.loader.load(
            [IdleImage, FlyImage, DieImage],
            Laya.Handler.create(this, () => {
                IdleTexture = Laya.loader.getRes(IdleImage);
                FlyTexture = Laya.loader.getRes(FlyImage);
                DieTexture = Laya.loader.getRes(DieImage);
            })
        );
        Laya.stage.on("Again", this, this.againGame);
        // 开始的时候，让鸟先是静止的
        const rigidBody = this.owner.getComponent(Laya.RigidBody) || Assert.ComponentNotNull;
        rigidBody.type = "static";
        Laya.stage.on("Start", this, () => {
            this.owner.getComponent(Laya.RigidBody).type = "dynamic";
            isStart = true;
        });
    }
    /**
     * 当再一次游戏按钮点击之后，这边会收到事件的派发
     * @returns
     */
    againGame() {
        isGameOver = false;
        this.owner.pos(130, 372);
        this.owner.rotation = 0;
        this._isFlying = false;
        this._isIdleing = true;
        this.owner.texture = IdleTexture;
        const rigidBody = this.owner.getComponent(Laya.RigidBody) || Assert.ComponentNotNull;
        rigidBody.linearVelocity = { x: 0, y: 0 };
    }

    mouseDown() {
        if (isStart === false) {
            return;
        }
        if (isGameOver) {
            return;
        }
        const rigidBody = this.owner.getComponent(Laya.RigidBody) || Assert.ComponentNotNull;
        // 施加一个向上的力
        rigidBody.linearVelocity = { x: 0, y: -10 };
        if (this._isIdleing) {
            this._isIdleing = false;
            this.owner.texture = FlyTexture;
            this._isFlying = true;
            // 设置一个5帧后的延迟回调
            Laya.timer.once((5 * 1000) / 60, this, () => {
                // 5帧后切换回原始的skin
                this.owner.texture = IdleTexture;
                this._isFlying = false;
                this._isIdleing = true;
            });
        } else if (this._isFlying) {
            this.owner.texture = IdleTexture;
            this._isFlying = false;
            this._isIdleing = true;
            // 设置一个2帧后的延迟回调
            Laya.timer.once((2 * 1000) / 60, this, () => {
                // 2帧后切换回原始的skin
                this.owner.texture = IdleTexture;
                this._isFlying = true;
                this._isIdleing = false;
                // 设置一个5帧后的延迟回调
                Laya.timer.once((5 * 1000) / 60, this, () => {
                    // 5帧后切换回原始的skin
                    this.owner.texture = IdleTexture;
                    this._isFlying = false;
                    this._isIdleing = true;
                });
            });
        }
    }

    /**
     * 碰撞检测，游戏结束的判断
     * @param other
     * @param self
     * @param contact
     * @returns
     */
    onTriggerEnter(
        other: Laya.PhysicsColliderComponent | Laya.ColliderBase,
        self?: Laya.ColliderBase,
        contact?: any
    ): void {
        if (other.owner.name == "TopCollider") {
            // 如果是天空上界，则什么也不做
            return;
        }
        // 播放死亡状态
        this.owner.texture = DieTexture;
        isGameOver = true;
        Laya.stage.event("Gameover", 0);
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
