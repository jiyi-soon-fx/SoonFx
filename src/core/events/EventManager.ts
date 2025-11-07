export class EventManager {
  /**
   * 更新玩家数据
   * @type {string}
   */
  static UP_DATA_PLAYER: string = "UP_DATA_PLAYER";

  /**
   * 创建文件夹
   * @type {string}
   */
  static CREATE_FILE_DATA: string = "CREATE_FILE_DATA";

  /**
   * 创建运算层
   * @type {string}
   */
  static CREATE_OPERATION_DATA: string = "CREATE_OPERATION_DATA";

  /**
   * 创建元数据
   * @type {string}
   */
  static CREATE_METADATE_DATA: string = "CREATE_METADATE_DATA";

  /**
   * 添加数据到数据库
   * @type {string}
   */
  static ADD_DATABASE_DATA: string = "ADD_DATABASE_DATA";

  /**
   * 添加运算体
   * @type {string}
   */
  static ADD_OPERAND_DATA: string = "ADD_OPERAND_DATA";

  /**
   * 发送公式体锚点
   * @type {string}
   */
  static SEND_ANCHOR_FORMULA: string = "SEND_ANCHOR_FORMULA";

  /**
   * 发送中转信息创建书签
   * @type {string}
   */
  static SHIFT_ADD_BOOKMARK: string = "SHIFT_ADD_BOOKMARK";

  /**
   * 发送中转信息创建看板层
   * @type {string}
   */
  static SHIFT_ADD_BOARD: string = "SHIFT_ADD_BOARD";

  /**
   * 发送中转信息创建图标层
   * @type {string}
   */
  static SHIFT_ADD_CHARTS: string = "SHIFT_ADD_CHARTS";

  /**
   * 发送中转信息创建公式体
   * @type {string}
   */
  static SHIFT_ADD_FORMULA: string = "SHIFT_ADD_FORMULA";

  /**
   * 发送中转信息创建宏变量
   * @type {string}
   */
  static SHIFT_ADD_FUNCTION: string = "SHIFT_ADD_FUNCTION";

  /**
   * 发送中转信息创建运算体
   * @type {string}
   */
  static SHIFT_ADD_OPERATIONBODY: string = "SHIFT_ADD_OPERATIONBODY";

  /**
   * 发送中转信息创建变量字段
   * @type {string}
   */
  static SHIFT_ADD_VARIABLEBODY: string = "SHIFT_ADD_VARIABLEBODY";

  /**
   * 发送中转信息创建符号运算体
   * @type {string}
   */
  static SHIFT_ADD_SYMBOLBODY: string = "SHIFT_ADD_SYMBOLBODY";

  /**
   * 发送中转信息显示视图
   * @type {string}
   */
  static SHIFT_SHOW_VIEW: string = "SHIFT_SHOW_VIEW";

  /**
   * 发送中转信息显示视图独立
   * @type {string}
   */
  static SHIFT_SHOW_VIEW_ON: string = "SHIFT_SHOW_VIEW_ON";

  /**
   * 发送中转信息销毁运算体
   * @type {string}
   */
  static SHIFT_REMOVE_BODY: string = "SHIFT_REMOVE_BODY";

  /**
   * 发送中转信息添加运算体视图
   * @type {string}
   */
  static SHIFT_ADD_BODY_VIEW: string = "SHIFT_ADD_BODY_VIEW";

  /**
   * 发送中转信息刷新库坐标
   * @type {string}
   */
  static SHIFT_REFRESH_LIBRARY_COORDINATES: string =
    "SHIFT_REFRESH_LIBRARY_COORDINATES";

  static IDINDEX: number = 1;

  /**
   * PLAYER 升级事件
   * @type {string}
   */
  static PLAYER_INSTANCE_LEVEL_UP: string = "PLAYER_INSTANCE_LEVEL_UP";
  constructor() { }
}
