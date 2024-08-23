/**
 * @file        UICtrl
 * @author      onble
 * @brief       控制UI的逻辑
 * @date        2024-08-23
 */
import { Assert } from "./util/Assert";

const { regClass, property } = Laya;

/**
 * 游戏是否开始
 */
let isStart: boolean = false;
@regClass()
export class UICtrl extends Laya.Script {
    declare owner: Laya.Sprite;
    /**
     * 分数文本对象
     */
    private _txt_Score: Laya.Text;
    /**
     * 分数
     */
    private score: number = 0;
    /**
     * 游戏结束面板
     */
    private _gameoverPanel: Laya.Sprite;
    /**
     * 再来一局按钮
     */
    private _btn_Again: Laya.Button;
    // @property({ type: Laya.Dialog, tips: "排行榜" })
    // private rankPanel: Laya.Dialog = null;
    /**
     * 排行榜对话框
     */
    private _rankDialog: Laya.Dialog;
    /**
     * 打开排行榜按钮
     */
    private _btn_Rank: Laya.Button;
    /**
     * 排行榜文本内容
     */
    private _txt_Rank: Laya.Text;
    /**
     * 排行榜对话框面板
     */
    private _rankPanel: Laya.Image;
    /**
     * 开始游戏文本
     */
    private _txt_Start: Laya.Text;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        // this.rankPanel.closeHandler = Laya.Handler.create(this, (name: string) => {
        //     console.log(name);
        // });
        this._txt_Score = (this.owner.getChildByName("txt_Score") as Laya.Text) || Assert.ChildNotNull;
        this._gameoverPanel = (this.owner.getChildByName("gameoverPanel") as Laya.Sprite) || Assert.ChildNotNull;
        this._rankDialog = (this.owner.getChildByName("rankDialog") as Laya.Dialog) || Assert.ChildNotNull;
        this._rankPanel = (this._rankDialog.getChildByName("rankPanel") as Laya.Image) || Assert.ChildNotNull;
        this._txt_Rank = (this._rankPanel.getChildByName("txt_Rank") as Laya.Text) || Assert.ChildNotNull;
        this._txt_Start = (this.owner.getChildByName("txt_Start") as Laya.Text) || Assert.ChildNotNull;
        this._gameoverPanel.visible = false;
        // 将对话框关闭
        this._rankDialog.visible = false;
        this._txt_Score.text = `Score: ${this.score}`;
        // 一开始的时候将分数隐藏起来
        this._txt_Score.visible = false;
        Laya.stage.on("AddScore", this, () => {
            this.score++;
            this._txt_Score.text = `Score: ${this.score}`;
        });
        Laya.stage.on("Gameover", this, this.gameover);
        Laya.stage.on(Laya.Event.CLICK, this, () => {
            if (isStart) return;
            this._txt_Start.visible = false;
            Laya.stage.event("Start");
            this._txt_Score.visible = true;
            isStart = true;
        });
        this._btn_Again = (this._gameoverPanel.getChildByName("btn_Again") as Laya.Button) || Assert.ChildNotNull;
        this._btn_Again.on(Laya.Event.CLICK, this, this.btnAgainClick);
        this._btn_Rank = (this._gameoverPanel.getChildByName("btn_Rank") as Laya.Button) || Assert.ChildNotNull;
        this._btn_Rank.on(Laya.Event.CLICK, this, this.btnRankClick);
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

    /**
     * 点击排行榜按钮
     */
    btnRankClick() {
        this._rankDialog.visible = true;
        this._rankDialog.show(true, true);
        // 排名的逻辑
        // 从本地获得前三名的成绩
        // Laya.LocalStorage.clear();
        const one = Number(Laya.LocalStorage.getItem("One")) || 0;
        const two = Number(Laya.LocalStorage.getItem("Two")) || 0;
        const three = Number(Laya.LocalStorage.getItem("Three")) || 0;
        let scoreArr: Array<number> = [];
        scoreArr.push(one, two, three, this.score);
        console.log("scoreArr", [scoreArr]);
        scoreArr = this.bubbleSort(scoreArr);
        Laya.LocalStorage.setItem("One", `${scoreArr[0]}`);
        Laya.LocalStorage.setItem("Two", `${scoreArr[1]}`);
        Laya.LocalStorage.setItem("Three", `${scoreArr[2]}`);

        this._txt_Rank.text = `1 - ${scoreArr[0]}\n2 - ${scoreArr[1]}\n3 - ${scoreArr[2]}`;
    }
    /**
     * 手写一个冒泡排序
     */
    bubbleSort(arr: Array<number>) {
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (arr[j] < arr[j + 1]) {
                    const temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
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
