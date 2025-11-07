/**
 * 工具栏类型枚举
 * 定义了工具栏中所有可用的操作类型，包括数学运算、逻辑操作、函数调用等
 * @enum {string}
 */
export enum ToolbarTypes {
  /** 加法运算 */
  add = "add",
  /** 减法运算 */
  minus = "minus",
  /** 宏定义 */
  macro = "macro",
  /** 除法运算 */
  divide = "divide",
  /** 乘法运算 */
  multiply = "multiply",
  /** 大于比较 */
  gt = "gt",
  /** 大于等于比较 */
  gte = "gte",
  /** 小于比较 */
  lt = "lt",
  /** 小于等于比较 */
  lte = "lte",
  /** 取模运算 */
  mod = "mod",
  /** 等于比较 */
  equal = "equal",
  /** 不等于比较 */
  notEqual = "notEqual",
  /** 函数调用 */
  function = "function",
  /** 运算操作 */
  operation = "operation",
  /** 链接操作 */
  link = "link",
  /** 书签操作 */
  bookmark = "bookmark",
  /** 公式操作 */
  formula = "formula",
  /** 符号函数 */
  symbolFunction = "symbolFunction",
  /** 逻辑基础 */
  logicalBasic = 'logical_basic',
  /** 逻辑滑块 */
  logicalSlider = 'logical_slider',
  /** 逻辑列表 */
  logicalList = 'logical_list',
  /** 逻辑数列 */
  logicalNumberList = 'logical_number_list',
  /** 逻辑布尔 */
  logicalBool = 'logical_bool',
}

/**
 * 工具栏项接口
 * 定义工具栏中每个项目的结构，包含图标、名称、类型和操作符信息
 * @interface ToolbarItem
 */
export interface ToolbarItem {
  /** 图标名称 */
  icon: string;
  /** 显示名称 */
  name: string;
  /** 操作类型 */
  type: ToolbarTypes;
  /** 操作符 */
  operator: string;
}
/**
 * 通用数学函数类型枚举
 * 定义了常用的数学计算函数，包括绝对值、随机数、取整、开方等基础数学运算
 * @enum {number}
 */
export enum CommonFunctionTypes {
  /** 绝对值 */
  abs = 4,
  /** 随机数 */
  random,
  /** 向下取整 */
  floor,
  /** 平方根 */
  sqrt,
  /** 最大值 */
  max,
  /** 最小值 */
  min,
  /** 幂运算 */
  pow = 11,
  /** 对数 */
  log,
  /** 指数 */
  exp,
  /** 立方根 */
  cbrt,
  /** 符号函数 */
  sign = 52,
  /** 整数乘法 */
  imul,
  /** 向上取整 */
  ceil,
  /** 四舍五入 */
  round,
}

/**
 * 算法函数类型枚举
 * 定义了向量和几何计算相关的函数，包括向量长度、距离计算、点积、叉积等
 * @enum {number}
 */
export enum AlgorithmFunctionTypes {
  /** 向量长度 */
  length = 56,
  /** 距离计算 */
  distance,
  /** 点积 */
  dot,
  /** 叉积 */
  cross,
  /** 混合函数 */
  mix,
}

/**
 * 处理函数类型枚举
 * 定义了数值处理相关的函数，包括各种数值变换和运算操作
 * @enum {number}
 */
export enum HandleFunctionTypes {
  /** 1减去n */
  "1-n" = 1,
  /** 1除以n */
  "1/n",
  /** 负n */
  "-n",
  /** n乘以2 */
  "n*2" = 15,
  /** n除以2 */
  "n/2",
  /** n乘以100 */
  "n*100",
  /** n除以100 */
  "n/100",
  /** n乘以n */
  "n*n",
  /** n除以n2 */
  "n/n2",
  /** n除以(n+n2) */
  "n/(n+n2)",
  /** n除以(n2-n) */
  "n/(n2-n)",
  /** 向量运算 */
  "(n,e).(n1,e2).",
  /** 范围随机 */
  "r(n~n2)" = 10,
}

/**
 * 三角函数类型枚举
 * 定义了三角函数相关的计算，包括正弦、余弦、正切及其反函数
 * @enum {number}
 */
export enum TriangleFunctionTypes {
  /** n乘以π */
  "n*pi" = 36,
  /** 余弦 */
  cos,
  /** 正弦 */
  sin,
  /** 正切 */
  tan,
  /** 反余弦 */
  acos,
  /** 反正弦 */
  asin,
  /** 反正切 */
  atan,
  /** 双参数反正切 */
  atan2,
}

/**
 * 逻辑函数类型枚举
 * 定义了条件判断和循环相关的函数，包括各种条件判断和循环控制结构
 * @enum {number}
 */
export enum LogicFunctionTypes {
  /** 条件判断：如果n1>n2返回n3否则n4 */
  "if(n1>n2)return{n3!n4}" = 44,
  /** 条件判断：如果n1>=n2返回n3否则n4 */
  "if(n1>=n2)return{n3!n4}",
  /** 条件判断：如果n1<n2返回n3否则n4 */
  "if(n1<n2)return{n3!n4}",
  /** 条件判断：如果n1<=n2返回n3否则n4 */
  "if(n1<=n2)return{n3!n4}",
  /** 条件判断：如果n1==n2返回n3否则n4 */
  "if(n1==n2)return{n3!n4}",
  /** 条件判断：如果n1!=n2返回n3否则n4 */
  "if(n1!=n2)return{n3!n4}",
  /** 循环：for循环计算 */
  "for(var i=n;i<=n2;i++){if(i%n3==1){a++}c+=a+n4}",
  /** 数组访问 */
  "[n]",
}
/**
 * 通用公式类型枚举
 * 定义了常用的战斗计算公式，包括攻击、防御、伤害等基础战斗计算
 * @enum {number}
 */
export enum CommonFormulaTypes {
  /** 攻击减去防御 */
  "攻击-防御" = 24,
  /** 攻击乘以攻击除以(攻击-防御) */
  "攻击*攻击/(攻击-防御)",
  /** (攻击-防御)乘以(攻击/防御) */
  "(攻击-防御)*(攻击/防御)",
  /** 攻击乘以攻击除以防御 */
  "攻击*攻击/防御",
  /** 攻击除以防御 */
  "攻击/防御",
  /** 攻击乘以(1-系数) */
  "攻击*(1-系数)",
  /** 护甲乘以系数除以(1+护甲*系数) */
  "护甲*系数/(1+护甲*系数)",
  /** 攻击乘以受伤率 */
  "攻击*受伤率",
  /** 攻击除以(1+防御*系数) */
  "攻击/(1+防御*系数)",
  /** 攻击除以防御乘以系数 */
  "攻击/防御*系数",
  /** 攻击乘以系数除以防御 */
  "攻击*系数/防御",
  /** 攻击乘以(系数/防御) */
  "攻击*(系数/防御)",
  /** (攻击-防御)乘以攻击-防御除以(攻击/防御) */
  "(攻击-防御)*攻击-防御/(攻击/防御)"
}

/**
 * 游戏公式类型1枚举
 * 定义了基础战斗公式，包含核心战斗计算逻辑
 * @enum {number}
 */
export enum GameFormula1 {
  /** 战斗公式 */
  "战斗公式" = 61,
}

/**
 * 游戏公式类型2枚举
 * 定义了角色属性相关的公式，包括生命值、攻击力、防御力等角色属性计算
 * @enum {number}
 */
export enum GameFormula2 {
  /** 人物生命值 */
  "人物生命" = 62,
  /** 近战素质物理攻击 */
  "近战素质物攻",
  /** 远程素质物理攻击 */
  "远程素质物攻",
  /** 法师素质物理攻击 */
  "法师素质物攻",
  /** 物理防御 */
  "物防",
  /** 魔法防御 */
  "魔防",
  /** 命中值 */
  "命中",
  /** 闪避值 */
  "闪避",
  /** 暴击值 */
  "暴击",
  /** 抗暴值 */
  "抗暴",
  /** 职业素质点成长 */
  "职业素质点成长",
  /** 最终近战物理攻击 */
  "最终近战物攻",
  /** 最终远程物理攻击 */
  "最终远程物攻",
  /** 最终魔法攻击 */
  "最终魔法攻击",
  /** 物理伤害 */
  "物理伤害",
  /** 魔法伤害 */
  "魔法伤害",
  /** 命中率 */
  "命中率",
  /** 暴击率 */
  "暴击率",
}

/**
 * 游戏公式类型3枚举
 * 定义了成长相关的公式，包括角色成长和属性提升的计算逻辑
 * @enum {number}
 */
export enum GameFormula3 {
  /** 成长公式 */
  "成长公式" = 80,
}

/**
 * 函数名称转换工具类
 * 提供函数ID到名称的转换功能
 */
export class FunctionNameUtils {
  /**
   * 函数ID范围配置
   * 定义了不同函数类型的ID范围
   */
  private static readonly FUNCTION_RANGES = [
    { min: 61, max: 80, key: "g", description: "游戏公式" },
    { min: 24, max: 35, key: "f", description: "通用公式" },
    { min: 44, max: 50, key: "if", description: "逻辑函数" },
  ] as const;

  /**
   * 将函数ID转换为函数名称
   * @param key 函数ID
   * @returns 函数名称，如果未找到则返回undefined
   */
  static functionToName(key: number): string | undefined {
    const range = this.FUNCTION_RANGES.find(
      (item) => key >= item.min && key <= item.max
    );

    if (!range) {
      return undefined;
    }

    return range.key + ((key % range.min) + 1);
  }

  /**
   * 获取函数类型描述
   * @param key 函数ID
   * @returns 函数类型描述
   */
  static getFunctionTypeDescription(key: number): string | undefined {
    const range = this.FUNCTION_RANGES.find(
      (item) => key >= item.min && key <= item.max
    );

    return range?.description;
  }

  /**
   * 检查函数ID是否有效
   * @param key 函数ID
   * @returns 是否为有效的函数ID
   */
  static isValidFunctionId(key: number): boolean {
    return this.FUNCTION_RANGES.some(
      (item) => key >= item.min && key <= item.max
    );
  }
}

/**
 * 函数名称转换函数（向后兼容）
 * @deprecated 请使用 FunctionNameUtils.functionToName
 * @param key 函数ID
 * @returns 函数名称
 */
export function functionToName(key: number): string | undefined {
  return FunctionNameUtils.functionToName(key);
}
