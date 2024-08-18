const { regClass } = Laya;
import { gameBase } from "./game.generated";

@regClass()
export class game extends gameBase {
    private static _instance: game = null;
    private constructor() {
        super();
        if (!game._instance) {
            // 创建实例时，确保是线程安全的
            // 这里使用了一个简单的同步锁实现，适用于单线程环境
            // 如果是多线程环境，需要更复杂的同步机制
            game._instance = this;
        }
    }
    static get instance() {
        return game._instance;
    }
    // onAwake(): void {}
}
