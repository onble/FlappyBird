import { Assert } from "./util/Assert";

const { regClass, property } = Laya;

@regClass()
export class UICtrl extends Laya.Script {
    declare owner: Laya.Sprite;
    private _txt_Score: Laya.Text;
    private score: number = 0;
    private _gameoverPanel: Laya.Sprite;
    private _btn_Again: Laya.Button;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        this._txt_Score = (this.owner.getChildByName("txt_Score") as Laya.Text) || Assert.ChildNotNull;
        this._gameoverPanel = (this.owner.getChildByName("gameoverPanel") as Laya.Sprite) || Assert.ChildNotNull;
        this._gameoverPanel.visible = false;
        this._txt_Score.text = `Score: ${this.score}`;
        Laya.stage.on("AddScore", this, () => {
            this.score++;
            this._txt_Score.text = `Score: ${this.score}`;
        });
        Laya.stage.on("Gameover", this, this.gameover);
        this._btn_Again = (this._gameoverPanel.getChildByName("btn_Again") as Laya.Button) || Assert.ChildNotNull;
        this._btn_Again.on(Laya.Event.CLICK, this, this.btnAgainClick);
    }

    /**
     * 游戏结束
     */
    gameover() {
        this._txt_Score.visible = false;
        this._gameoverPanel.visible = true;
        Laya.Tween.from(this._gameoverPanel, { alpha: 0 }, 500, Laya.Ease.linearIn);
    }
    /**
     * 点击再来一局按钮
     */
    btnAgainClick() {
        this._txt_Score.visible = true;
        this._gameoverPanel.visible = false;
        this._gameoverPanel.alpha = 1;
        Laya.stage.event("Again");
        this.score = 0;
        this._txt_Score.text = `Score: ${this.score}`;
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
