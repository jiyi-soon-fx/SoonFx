/**
 * 节点类型枚举
 * 定义了系统中所有可能的节点类型，包括变量、宏、运算层、符号体等各种节点类型
 * @enum {number | string}
 */
export enum NodeType {
  /** 变量节点 - 存储变量值 */
  Variable = 1,

  /** 宏节点 - 宏定义 */
  Macro = 4,

  /** 运算层节点 - 计算层 */
  CalculationLayer = 5,

  /** 符号体节点 - 符号对象 */
  SymbolBody = "SymbolBody",

  /** 运算体节点 - 运算对象 */
  OperationBody = "OperationBody",

  /** 书签节点 - 书签对象 */
  Bookmark = "Bookmark",

  /** 图表层节点 - 表格数据 */
  Sheet = 11,

  /** 逻辑基础节点 - 基础逻辑列表 */
  LogicalBasic = 12,

  /** 逻辑滑块节点 - 滑块控件 */
  LogicalSlider = 14,

  /** 逻辑布尔节点 - 布尔块 */
  LogicalBool = 16,
}

/**
 * 节点类型工具类
 * 提供节点类型相关的工具方法，包括类型检查、显示名称获取等功能
 * @class NodeTypeUtils
 */
export class NodeTypeUtils {
  /**
   * 检查是否为数值类型节点
   * @param nodeType 节点类型
   * @returns 是否为数值类型
   */
  static isNumericType(nodeType: NodeType): boolean {
    return typeof nodeType === 'number';
  }

  /**
   * 检查是否为字符串类型节点
   * @param nodeType 节点类型
   * @returns 是否为字符串类型
   */
  static isStringType(nodeType: NodeType): boolean {
    return typeof nodeType === 'string';
  }

  /**
   * 检查是否为逻辑节点
   * @param nodeType 节点类型
   * @returns 是否为逻辑节点
   */
  static isLogicalType(nodeType: NodeType): boolean {
    return nodeType === NodeType.LogicalBasic ||
      nodeType === NodeType.LogicalSlider ||
      nodeType === NodeType.LogicalBool;
  }

  /**
   * 获取节点类型显示名称
   * @param nodeType 节点类型
   * @returns 显示名称
   */
  static getDisplayName(nodeType: NodeType): string {
    const nameMap: Record<NodeType, string> = {
      [NodeType.Variable]: '变量',
      [NodeType.Macro]: '宏',
      [NodeType.CalculationLayer]: '运算层',
      [NodeType.SymbolBody]: '符号体',
      [NodeType.OperationBody]: '运算体',
      [NodeType.Bookmark]: '书签',
      [NodeType.Sheet]: '图表层',
      [NodeType.LogicalBasic]: '逻辑基础',
      [NodeType.LogicalSlider]: '逻辑滑块',
      [NodeType.LogicalBool]: '逻辑布尔',
    };
    return nameMap[nodeType] || '未知类型';
  }
}
