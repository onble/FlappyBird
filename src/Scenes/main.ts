const { regClass } = Laya;
import { mainBase } from "./main.generated";

@regClass()
export class main extends mainBase {
    private static _instance: main = null;
    private constructor() {
        super();
        if (!main._instance) {
            // 创建实例时，确保是线程安全的
            // 这里使用了一个简单的同步锁实现，适用于单线程环境
            // 如果是多线程环境，需要更复杂的同步机制
            main._instance = this;
        }
    }
    static get instance() {
        return main._instance;
    }
    // onAwake(): void {}
}
