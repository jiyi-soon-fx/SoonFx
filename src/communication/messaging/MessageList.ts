
/**
 * 消息列表类，采用单例模式管理所有事件对象
 * 提供事件对象的注册、移除等功能
 */
export class MessageList {
  /**
   * 事件消息列表，存储所有注册的事件对象
   */
  eventMessageList: any[] = [];

  /**
   * 构造函数
   * 初始化消息列表
   */
  constructor() {
    // Additional initialization if needed
  }

  /**
   * 单例实例
   */
  static _instance: MessageList | null = null;

  /**
   * 获取单例实例
   * @returns MessageList的单例实例
   */
  static getInstance(): MessageList {
    if (MessageList._instance == null) {
      MessageList._instance = new MessageList();
    }
    return MessageList._instance;
  }

  /**
   * 从事件消息列表中移除指定的事件对象
   * @param e - 要移除的事件对象
   */
  removeEventObject(e: any): void {
    const index = this.eventMessageList.indexOf(e);
    if (index !== -1) this.eventMessageList.splice(index, 1);
  }

  /**
   * 向事件消息列表中添加事件对象
   * 如果对象已存在则不会重复添加
   * @param e - 要添加的事件对象
   */
  addEventObject(e: any): void {
    const index = this.eventMessageList.indexOf(e);
    if (index === -1) {
      this.eventMessageList.push(e);
    }
  }
}
