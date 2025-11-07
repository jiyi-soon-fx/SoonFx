
import { MessageList } from "./MessageList";

/**
 * 呼叫中心类，用于管理事件监听器和消息处理
 * 提供事件注册、执行、移除等功能
 */
export class CallCenter {
  /**
   * 事件列表，存储所有注册的事件监听器
   */
  eventsList: any | null = null;

  /**
   * 构造函数
   * 初始化事件列表并将当前实例添加到消息列表中
   */
  constructor() {
    // 初始化事件列表
    this.eventsList = null;

    // 添加事件对象
    MessageList.getInstance().addEventObject(this);
  }

  /**
   * 执行指定类型的事件
   * @param type - 事件类型
   * @param message - 事件消息
   * @returns 事件处理函数的返回值
   */
  execute(type: string, message: any): any {
    return this.eventsList[type].apply([type], [message]);
  }

  /**
   * 检查是否存在指定类型的事件监听器
   * @param type - 事件类型
   * @returns 如果存在该类型的事件监听器则返回true，否则返回false
   */
  getEvents(type: string): boolean {
    if (this.eventsList == null) {
      return false;
    }
    if (this.eventsList[type] != null) {
      return true;
    }
    return false;
  }

  /**
   * 添加事件监听器
   * @param type - 事件类型
   * @param listener - 事件处理函数
   * @param listenerArgs - 可选的事件处理函数参数
   * @param thisArg - 可选的事件处理函数this上下文
   */
  addEventListener(
    type: string,
    listener: Function,
    listenerArgs?: any,
    thisArg?: any
  ): void {
    if (this.eventsList == null) {
      this.eventsList = {};
    }
    this.eventsList[type] = listener.bind(thisArg);
  }

  /**
   * 清理所有事件监听器并释放资源
   */
  dispose(): void {
    for (const i in this.eventsList) {
      delete this.eventsList[i];
    }
    this.eventsList = null;
  }

  /**
   * 移除指定类型的事件监听器
   * @param type - 要移除的事件类型
   */
  removeEventListener(type: string): void {
    if (this.eventsList != null) {
      this.eventsList[type] = null;
    }
  }
}
