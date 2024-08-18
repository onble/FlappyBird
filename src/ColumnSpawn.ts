/**
 * @file        ColumnSpawn
 * @author      onble
 * @brief       控制柱子
 * @date        2024-08-18
 */
const { regClass, property } = Laya;

@regClass()
export class ColumnSpawn extends Laya.Script {
    declare owner: Laya.Sprite;

    @property({ type: Laya.Prefab, tips: "柱子" })
    private _Column: Laya.Prefab;
    /**
     * 随机生成下一个柱子的时间
     * 因为柱子间隔不一样，因此这个值也会进行随机改变
     * 单位：毫秒
     */
    private _ranTime: number = 2000;
    /**
     * 记录距离上一个柱子生成过去了多久
     * 单位：毫秒
     */
    private _timer: number = 0;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    //onAwake(): void {}

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
        this._timer += Laya.timer.delta;
        if (this._timer >= this._ranTime) {
            this._timer = 0;
            this._ranTime = this.getRandom(3000, 4500);
        }
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
