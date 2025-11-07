import { Call } from "../../communication/messaging/Call";
import { CallCenter } from "../../communication/messaging/CallCenter";
import { fx } from "../../core/system/System";
import { Folder } from "../../data/storage/Folder";

/**
 * FX中心类
 * 负责管理场景数据和事件监听，处理数据库数据和操作数的添加
 */
export class FXCentre {
  /** 调用中心，用于事件通信 */
  callCenter: any = null;

  /**
   * 构造函数
   * 初始化场景根目录并设置事件监听器
   */
  constructor() {
    fx.sceneFolder = new Folder("场景根目录");
    fx.targetFolder = fx.sceneFolder;
    this.initEventListener();
  }

  /**
   * 初始化事件监听器
   * 注册数据库数据添加和操作数添加的事件监听
   */
  initEventListener(): void {
    this.callCenter = new CallCenter();
    this.callCenter.addEventListener(
      fx.Eve.ADD_DATABASE_DATA,
      this.addDataBaseFunction,
      null,
      this
    );
    this.callCenter.addEventListener(
      fx.Eve.ADD_OPERAND_DATA,
      this.addOperandFunction.bind(this)
    );
  }

  /**
   * 添加节点到符号操作符
   * 检测并将操作数添加到符号操作符，触发相关视图更新事件
   * @param symbolicOperator - 符号操作符对象
   * @param operand - 操作数对象
   * @param coord - 坐标信息
   */
  addBody(symbolicOperator: any, operand: any, coord: any): void {
    if (symbolicOperator != null && !symbolicOperator.addTest(operand)) {
      Call.send(fx.Eve.SHIFT_REMOVE_BODY, [operand, false], null);
      symbolicOperator.addBody(operand);
      Call.send(
        fx.Eve.SHIFT_ADD_BODY_VIEW,
        [symbolicOperator, operand, coord],
        null
      );
    }
  }

  /**
   * 添加操作数的事件处理函数
   * @param e - 事件参数数组 [符号操作符, 操作数, 坐标]
   */
  addOperandFunction(e: any): void {
    this.addBody(e[0], e[1], e[2]);
  }

  /**
   * 添加数据库数据的事件处理函数
   * @param e - 事件参数数组 [数据, 父节点, 位置]
   */
  addDataBaseFunction(e: any): void {
    this.addData(e[0], e[1], e[2]);
  }

  /**
   * 添加数据到文件夹树
   * 根据父节点和位置信息将数据添加到相应的文件夹结构中
   * @param data - 要添加的数据对象
   * @param parent - 父节点对象，为null时添加到目标文件夹
   * @param location - 插入位置，为null时添加到末尾
   */
  addData(data: any, parent: any, location: any): void {
    if (parent != null) {
      if (parent.typeView != null) {
        parent = null;
      }
    }

    if (parent != null && parent.isFolder) {
      data.parentFolder = parent;

      if (location != null) {
        parent.spliceChild(data, location);
      } else {
        parent.pushChild(data);
      }
    } else {
      if (parent == null) {
        data.parentFolder = fx.targetFolder;

        if (location != null) {
          fx.targetFolder.spliceChild(data, location);
        } else {
          fx.targetFolder.pushChild(data);
        }
      } else {
        data.parentFolder = parent.parentFolder;
        data.parentFolder.spliceChild(
          data,
          parent.parentFolder.tree.indexOf(parent) + 1
        );
      }
    }
  }
}
