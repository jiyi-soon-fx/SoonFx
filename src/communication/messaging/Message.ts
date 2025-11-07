/**
 * 消息类，用于封装消息数据和类型信息
 * 提供基本的消息结构，包含用户数据和消息类型
 */
export class Message {
  /**
   * 用户数据，存储消息的具体内容
   */
  userData: any | null = null;

  /**
   * 消息类型，标识消息的类别
   */
  type: any | null = null;

  /**
   * 构造函数
   * 初始化消息对象
   */
  constructor() {
    // Additional initialization if needed
  }
}
