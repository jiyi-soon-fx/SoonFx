/**
 * OperationBody 数据模型
 * 版本: 2.0
 * 重构日期: 2024年12月
 * 提供运算体数据模型，继承自 BasicBody
 */

import { BasicBody } from "./BasicBody";

/**
 * 运算体数据模型类
 * 继承自 BasicBody，专门用于处理运算操作
 * 提供运算相关的数据结构和功能
 */
export class OperationBody extends BasicBody {
  /** 节点类型标识 */
  type: string = "OperationBody";

  /** 构造函数名称 */
  constructorName: string = "OperationBody";

  /** 是否为函数标识 */
  isFunction: boolean = false;

  /**
   * 构造函数
   * 初始化运算体数据模型实例
   */
  constructor() {
    super();
  }
} 
