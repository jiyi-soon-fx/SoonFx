/**
 * SymbolBody 数据模型
 * 版本: 2.0
 * 重构日期: 2024年12月
 * 提供符号体数据模型，继承自 BasicBody，用于处理运算符和函数调用
 */

import { fx } from "../../core/system/System";
import { BasicBody } from "./BasicBody";
import { getCatchValue } from "../../utils/index";

/**
 * 符号体数据模型类
 * 继承自 BasicBody，专门用于处理运算符和函数调用
 * 提供符号运算相关的数据结构和功能
 */
export class SymbolBody extends BasicBody {
  /** 运算符 */
  operator: string | null = null;

  /** 节点类型标识 */
  type: string = "SymbolBody";

  /** 是否为函数标识 */
  isFunctionId: number = 1;

  /** 函数类型 */
  funcType: number = 0;

  /** 构造函数名称 */
  constructorName = "SymbolBody";

  /**
   * 构造函数
   * 初始化符号体数据模型实例
   */
  constructor() {
    super();
  }

  /**
   * 复制符号体实例
   * 创建当前符号体的深拷贝
   * @returns 复制后的符号体实例
   */
  copy(): SymbolBody {
    var copyobj = new fx.SymbolBody();
    copyobj.operator = this.operator;
    copyobj.isFunctionId = this.isFunctionId;
    copyobj.tree = this.tree;
    copyobj.parent = this.parent;
    copyobj.value = this.value;
    copyobj.isWeight = this.isWeight;

    copyobj.isBindingOperation = this.isBindingOperation;
    copyobj.isBindingFormula = this.isBindingFormula;
    copyobj.formulaTextValue = this.formulaTextValue;
    copyobj.formulaTextCharacter = this.formulaTextCharacter;
    copyobj.operationalLogicText = this.operationalLogicText;
    copyobj.cacheElementValue = this.cacheElementValue;
    return copyobj;
  }

  /**
   * 设置函数ID
   * @param value 函数ID值
   */
  setFunctionId(value: number): void {
    this.isFunctionId = value;
  }

  /**
   * 获取可执行宏编号
   * 自动递增函数ID，超出范围时重置为1
   * @returns 当前可执行的函数ID
   */
  getRunFunctionId(): number {
    var maxid = this.getFunctionLength();
    this.isFunctionId++;
    if (this.isFunctionId > maxid) {
      this.isFunctionId = 1;
    }
    return this.isFunctionId;
  }

  /**
   * 获取可以执行宏总数
   * 统计树中所有函数节点的数量
   * @returns 函数节点总数
   */
  getFunctionLength(): number {
    var queryid = 0;
    for (var i = 0; i < this.tree.length; i++) {
      if (this.tree[i].isFunction) {
        queryid++;
      }
    }
    return queryid;
  }

  /**
   * 获取可执行宏
   * 根据ID获取对应的函数节点
   * @param id 函数ID
   * @returns 对应的函数节点，如果不存在则返回null
   */
  getFunction(id: number): BasicBody | null {
    var queryid = 0;
    for (var i = 0; i < this.tree.length; i++) {
      if (this.tree[i].isFunction) {
        queryid++;
        if (queryid == id) {
          return this.tree[i];
        }
      }
    }
    return null;
  }

  /**
   * 获取符号体的值
   * 根据运算符类型和函数状态计算并返回值
   * @returns 计算后的值
   */
  getValue(): any {
    if (
      (this.operator == "fx" || this.operator == "=") &&
      this.getFunctionLength() > 0
    ) {
      const func = this.getFunction(this.isFunctionId);
      if (func) {
        this.value = this.returnFunc(
          getCatchValue(func)
        );
      } else {
        this.value = null;
      }
      return this.value;
    } else {
      this.value = null;
      this.operationalLogicText = "";
      for (var i = 0; i < this.tree.length; i++) {
        if (i < this.tree.length - 1) {
          this.operationalLogicText +=
            Number(getCatchValue(this.tree[i])) + (this.operator || "");
        } else {
          this.operationalLogicText +=
            "(" + Number(getCatchValue(this.tree[i])) + ")";
        }
      }
      this.value = fx.eval(this.operationalLogicText);
    }

    if (!isNaN(this.value)) {
      this.value = this.returnFunc(Number(this.value));
      return this.value;
    }
    this.value = this.returnFunc(this.value);
    return this.value;
  }

  /**
   * 获取公式文本字符
   * 根据运算符和函数状态生成公式的字符表示
   * @returns 公式的字符表示
   */
  getFormulaTextCharacter(): string {
    if (this.operator == "=" && this.getFunctionLength() > 0) {
      const func = this.getFunction(this.isFunctionId);
      if (func) {
        this.formulaTextCharacter =
          "(" +
          func.getFormulaTextCharacter() +
          ")";
      } else {
        this.formulaTextCharacter = "";
      }
    } else {
      this.formulaTextCharacter = "";
      for (var i = 0; i < this.tree.length; i++) {
        if (i < this.tree.length - 1) {
          this.formulaTextCharacter +=
            "(" + this.tree[i].getFormulaTextCharacter() + ")" + (this.operator || "");
        } else {
          var formulaString = this.tree[i].getFormulaTextCharacter();
          if (
            formulaString.indexOf("+") == -1 &&
            formulaString.indexOf("-") == -1 &&
            formulaString.indexOf("*") == -1 &&
            formulaString.indexOf("/") == -1 &&
            formulaString.indexOf("%") == -1 &&
            formulaString.indexOf(">") == -1 &&
            formulaString.indexOf(">=") == -1 &&
            formulaString.indexOf("<") == -1 &&
            formulaString.indexOf("<=") == -1 &&
            formulaString.indexOf("==") == -1
          ) {
            this.formulaTextCharacter += formulaString;
          } else {
            this.formulaTextCharacter += "(" + formulaString + ")";
          }
        }
      }
    }

    var cformulaTextCharacter = this.formulaTextCharacter;
    if (this.funcType != 0) {
      cformulaTextCharacter = this.getFormulaTextCharacterBody();
    }

    return cformulaTextCharacter;
  }

  /**
   * 获取公式文本值
   * 根据函数类型和运算符状态生成公式的值表示
   * @returns 公式的值表示
   */
  getFormulaTextValue(): string {
    if (this.funcType == 0) {
      if (this.operator == "=" && this.getFunctionLength() > 0) {
        const func = this.getFunction(this.isFunctionId);
        if (func) {
          this.formulaTextValue =
            "(" + func.getFormulaTextValue() + ")";
        } else {
          this.formulaTextValue = "";
        }
      } else {
        this.formulaTextValue = "";
        for (var i = 0; i < this.tree.length; i++) {
          var formulaValue = this.tree[i].getFormulaTextValue();
          if (i < this.tree.length - 1) {
            this.formulaTextValue += "(" + formulaValue + ")" + (this.operator || "");
          } else {
            if (
              formulaValue.indexOf("+") == -1 &&
              formulaValue.indexOf("-") == -1 &&
              formulaValue.indexOf("*") == -1 &&
              formulaValue.indexOf("/") == -1 &&
              formulaValue.indexOf("%") == -1 &&
              formulaValue.indexOf(">") == -1 &&
              formulaValue.indexOf(">=") == -1 &&
              formulaValue.indexOf("<") == -1 &&
              formulaValue.indexOf("<=") == -1 &&
              formulaValue.indexOf("==") == -1
            ) {
              this.formulaTextValue += formulaValue;
            } else {
              this.formulaTextValue += "(" + formulaValue + ")";
            }
          }
        }
      }
      return this.formulaTextValue;
    } else {
      return this.getFormulaTextValueBody();
    }
  }

  /**
   * 浅度销毁
   * 清理所有子节点的引用
   */
  dispose(): void {
    for (var i = 0; i < this.tree.length; i++) {
      this.tree[i].dispose();
    }
  }
}
