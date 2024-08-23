/**
 * @file        ColumnSpawn
 * @author      onble
 * @brief       控制柱子
 * @date        2024-08-18
 */
import { Column } from "./Column";
import { Assert } from "./util/Assert";
import { AutoMove } from "./AutoMove";

const { regClass, property } = Laya;
let countCloumn = 0;
@regClass()
export class ColumnSpawn extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Laya.Prefab, tips: "柱子" })
    public ColumnPrefab: Laya.Prefab;
    /**
     * 随机生成下一个柱子的时间
     * 因为柱子间隔不一样，因此这个值也会进行随机改变
     * 单位：毫秒
     */
    private _ranTime: number = 1000;
    /**
     * 记录距离上一个柱子生成过去了多久
     * 单位：毫秒
     */
    private _timer: number = 0;
    /**
     * 生成柱子的父组件
     */
    private _ColumnParent: Laya.Sprite;
    /**
     * 游戏是否结束
     */
    private _isGameover: boolean = true;
    /**
     * 调整倍率
     */
    private _adjustRatio: number;
    /**
     * 记录柱子的数组，用于最后消除屏幕内的柱子
     */
    // private _columnArr: Laya.Sprite[] = [];

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        // this._adjustRatio = Laya.Browser.clientWidth / Laya.stage.designWidth;
        this._adjustRatio = 1;
        this._ranTime = this._ranTime * this._adjustRatio;
        // 修改生成柱子的时间
        this._ColumnParent = (this.owner.getChildByName("ColumnParent") as Laya.Sprite) || Assert.ChildNotNull;
        Laya.stage.on("Gameover", this, () => {
            this._isGameover = true;
        });
        Laya.stage.on("Again", this, () => {
            this._isGameover = false;
            // 将柱子清空
            this._ColumnParent.removeChildren(0, this._ColumnParent.numChildren);
        });
        Laya.stage.on("Start", this, () => {
            this._isGameover = false;
        });
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
    onUpdate(): void {
        if (this._isGameover) {
            this._timer = 0;
            return;
        }
        this._timer += Laya.timer.delta;
        if (this._timer >= this._ranTime) {
            this._timer = 0;
            this._ranTime = this.getRandom(1000, 4500) * this._adjustRatio;
            this.spawn();
        }
    }

    /**
     * 生成柱子
     */
    spawn() {
        // bottom
        // 730-400
        // const bottomColumn: Laya.Sprite = this.ColumnPrefab.create() as Laya.Sprite;
        const bottomColumn: Laya.Sprite = Laya.Pool.getItemByCreateFun("Column", () => {
            return this.ColumnPrefab.create();
        });
        bottomColumn.rotation = 0;
        const bottomColumnScript: Column = bottomColumn.getComponent(Column) || Assert.ComponentNotNull;
        bottomColumnScript.canAddScore = true;
        const bottomY = this.getRandom(350, 1010);
        bottomColumn.pos(2000, bottomY);
        // bottomColumn.name = `bottom${countCloumn++}`;

        // 差值
        // 300-348
        const diff = this.getRandom(300, 800);
        const topY = bottomY - diff;

        // top
        // const topColumn: Laya.Sprite = this.ColumnPrefab.create() as Laya.Sprite;
        const topColumn: Laya.Sprite = Laya.Pool.getItemByCreateFun("Column", () => {
            return this.ColumnPrefab.create();
        });
        topColumn.pos(2000 + topColumn.width, topY);
        topColumn.rotation = 180;
        // 将top的增加分数的逻辑删除
        const ColumnScript: Column = topColumn.getComponent(Column) || Assert.ComponentNotNull;
        ColumnScript.canAddScore = false;
        // topColumn.name = `top${countCloumn++}`;

        // topColumn.zOrder = 100;
        // bottomColumn.zOrder = 200;
        // this._ColumnParent.zOrder = 200;
        this._ColumnParent.addChild(topColumn);
        this._ColumnParent.addChild(bottomColumn);
        // this._columnArr.push(bottomColumn);
        // this._columnArr.push(topColumn);
    }

    /**
     * 获得一个随机数
     * 不建议下面这种随机区间值写反也兼容的写法
     * @param min 最小值
     * @param max 最大值
     * @returns 区间内的随机小数
     */
    getRandom(min: number, max: number): number {
        let ranValue: number = 0;
        if (max > min) {
            ranValue = Math.random() * (max - min);
            ranValue += min;
        } else {
            ranValue = Math.random() * (min - max);
            ranValue += max;
        }
        return ranValue;
    }

    //每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onLateUpdate(): void {}

    //鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
    //onMouseClick(): void {}
}
