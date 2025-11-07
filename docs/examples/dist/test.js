var N = Object.defineProperty;
var M = (e, t, r) => t in e ? N(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var n = (e, t, r) => M(e, typeof t != "symbol" ? t + "" : t, r);
var I, MessageList = (I = class {
  /**
   * 构造函数
   * 初始化消息列表
   */
  constructor() {
    /**
     * 事件消息列表，存储所有注册的事件对象
     */
    n(this, "eventMessageList", []);
  }
  /**
   * 获取单例实例
   * @returns MessageList的单例实例
   */
  static getInstance() {
    return I._instance == null && (I._instance = new I()), I._instance;
  }
  /**
   * 从事件消息列表中移除指定的事件对象
   * @param e - 要移除的事件对象
   */
  removeEventObject(t) {
    const r = this.eventMessageList.indexOf(t);
    r !== -1 && this.eventMessageList.splice(r, 1);
  }
  /**
   * 向事件消息列表中添加事件对象
   * 如果对象已存在则不会重复添加
   * @param e - 要添加的事件对象
   */
  addEventObject(t) {
    this.eventMessageList.indexOf(t) === -1 && this.eventMessageList.push(t);
  }
}, /**
 * 单例实例
 */
n(I, "_instance", null), I), Call = class {
  /**
   * 构造函数
   */
  constructor() {
  }
  /**
   * 发送消息到所有注册的事件监听器
   * @param type - 事件类型标识符
   * @param message - 要发送的消息对象，如果为null则不会发送
   * @param fun - 可选的回调函数，当消息被处理后会调用此函数
   */
  static send(e, t, r) {
    t != null && (t.Call_Event_type = e);
    for (let i = 0; i < MessageList.getInstance().eventMessageList.length; i++)
      if (MessageList.getInstance().eventMessageList[i].getEvents(e)) {
        const s = MessageList.getInstance().eventMessageList[i].execute(e, t);
        r && r.apply([e], [s]);
      }
  }
}, CallCenter = class {
  /**
   * 构造函数
   * 初始化事件列表并将当前实例添加到消息列表中
   */
  constructor() {
    /**
     * 事件列表，存储所有注册的事件监听器
     */
    n(this, "eventsList", null);
    this.eventsList = null, MessageList.getInstance().addEventObject(this);
  }
  /**
   * 执行指定类型的事件
   * @param type - 事件类型
   * @param message - 事件消息
   * @returns 事件处理函数的返回值
   */
  execute(e, t) {
    return this.eventsList[e].apply([e], [t]);
  }
  /**
   * 检查是否存在指定类型的事件监听器
   * @param type - 事件类型
   * @returns 如果存在该类型的事件监听器则返回true，否则返回false
   */
  getEvents(e) {
    return this.eventsList == null ? !1 : this.eventsList[e] != null;
  }
  /**
   * 添加事件监听器
   * @param type - 事件类型
   * @param listener - 事件处理函数
   * @param listenerArgs - 可选的事件处理函数参数
   * @param thisArg - 可选的事件处理函数this上下文
   */
  addEventListener(e, t, r, i) {
    this.eventsList == null && (this.eventsList = {}), this.eventsList[e] = t.bind(i);
  }
  /**
   * 清理所有事件监听器并释放资源
   */
  dispose() {
    for (const e in this.eventsList)
      delete this.eventsList[e];
    this.eventsList = null;
  }
  /**
   * 移除指定类型的事件监听器
   * @param type - 要移除的事件类型
   */
  removeEventListener(e) {
    this.eventsList != null && (this.eventsList[e] = null);
  }
}, E, EventManager = (E = class {
  constructor() {
  }
}, /**
 * 更新玩家数据
 * @type {string}
 */
n(E, "UP_DATA_PLAYER", "UP_DATA_PLAYER"), /**
 * 创建文件夹
 * @type {string}
 */
n(E, "CREATE_FILE_DATA", "CREATE_FILE_DATA"), /**
 * 创建运算层
 * @type {string}
 */
n(E, "CREATE_OPERATION_DATA", "CREATE_OPERATION_DATA"), /**
 * 创建元数据
 * @type {string}
 */
n(E, "CREATE_METADATE_DATA", "CREATE_METADATE_DATA"), /**
 * 添加数据到数据库
 * @type {string}
 */
n(E, "ADD_DATABASE_DATA", "ADD_DATABASE_DATA"), /**
 * 添加运算体
 * @type {string}
 */
n(E, "ADD_OPERAND_DATA", "ADD_OPERAND_DATA"), /**
 * 发送公式体锚点
 * @type {string}
 */
n(E, "SEND_ANCHOR_FORMULA", "SEND_ANCHOR_FORMULA"), /**
 * 发送中转信息创建书签
 * @type {string}
 */
n(E, "SHIFT_ADD_BOOKMARK", "SHIFT_ADD_BOOKMARK"), /**
 * 发送中转信息创建看板层
 * @type {string}
 */
n(E, "SHIFT_ADD_BOARD", "SHIFT_ADD_BOARD"), /**
 * 发送中转信息创建图标层
 * @type {string}
 */
n(E, "SHIFT_ADD_CHARTS", "SHIFT_ADD_CHARTS"), /**
 * 发送中转信息创建公式体
 * @type {string}
 */
n(E, "SHIFT_ADD_FORMULA", "SHIFT_ADD_FORMULA"), /**
 * 发送中转信息创建宏变量
 * @type {string}
 */
n(E, "SHIFT_ADD_FUNCTION", "SHIFT_ADD_FUNCTION"), /**
 * 发送中转信息创建运算体
 * @type {string}
 */
n(E, "SHIFT_ADD_OPERATIONBODY", "SHIFT_ADD_OPERATIONBODY"), /**
 * 发送中转信息创建变量字段
 * @type {string}
 */
n(E, "SHIFT_ADD_VARIABLEBODY", "SHIFT_ADD_VARIABLEBODY"), /**
 * 发送中转信息创建符号运算体
 * @type {string}
 */
n(E, "SHIFT_ADD_SYMBOLBODY", "SHIFT_ADD_SYMBOLBODY"), /**
 * 发送中转信息显示视图
 * @type {string}
 */
n(E, "SHIFT_SHOW_VIEW", "SHIFT_SHOW_VIEW"), /**
 * 发送中转信息显示视图独立
 * @type {string}
 */
n(E, "SHIFT_SHOW_VIEW_ON", "SHIFT_SHOW_VIEW_ON"), /**
 * 发送中转信息销毁运算体
 * @type {string}
 */
n(E, "SHIFT_REMOVE_BODY", "SHIFT_REMOVE_BODY"), /**
 * 发送中转信息添加运算体视图
 * @type {string}
 */
n(E, "SHIFT_ADD_BODY_VIEW", "SHIFT_ADD_BODY_VIEW"), /**
 * 发送中转信息刷新库坐标
 * @type {string}
 */
n(E, "SHIFT_REFRESH_LIBRARY_COORDINATES", "SHIFT_REFRESH_LIBRARY_COORDINATES"), n(E, "IDINDEX", 1), /**
 * PLAYER 升级事件
 * @type {string}
 */
n(E, "PLAYER_INSTANCE_LEVEL_UP", "PLAYER_INSTANCE_LEVEL_UP"), E), Folder = class {
  /**
   * 创建文件夹实例
   * @param name - 文件夹名称，可选参数
   */
  constructor(e = null) {
    /** 文件夹名称 */
    n(this, "name");
    /** 标识是否为文件夹，默认为 true */
    n(this, "isFolder", !0);
    /** 是否显示该文件夹，默认为 true */
    n(this, "isShow", !0);
    /** 是否显示子项，默认为 true */
    n(this, "isShowChild", !0);
    /** 树形结构数组，存储子元素 */
    n(this, "tree", []);
    /** 公式树数组，存储公式相关的数据 */
    n(this, "formulaTree", []);
    /** 最小箭头视图对象 */
    n(this, "minArrowsView", null);
    /** 构造器名称标识 */
    n(this, "constructorName", "Folder");
    /** 唯一标识符 */
    n(this, "id");
    this.name = e, this.id = ++EventManager.IDINDEX;
  }
  /**
   * 设置文件夹名称
   * @param name - 新的文件夹名称
   */
  setName(e) {
    this.name = e;
  }
  /**
   * 浅度销毁文件夹，清理相关数据
   * 将文件夹状态重置为初始状态
   */
  dispose() {
    this.name = null, this.isFolder = !1, this.isShowChild = !1, this.tree = [], this.formulaTree = [];
  }
  /**
   * 获取文件夹树的总高度
   * 递归计算所有可见子元素的高度
   * @returns 返回树的总高度
   */
  getMaxHeight() {
    let e = 1;
    for (let t = 0; t < this.tree.length; t++)
      this.tree[t].isShow && (this.tree[t].isFolder ? e += this.tree[t].getMaxHeight() : e++);
    return e;
  }
  /**
   * 检查是否可以添加子元素
   * 验证子元素是否已存在于树中
   * @param child - 要检查的子元素
   * @returns 如果子元素不存在则返回 true，否则返回 false
   */
  addTest(e) {
    return this.tree.indexOf(e) == -1;
  }
  /**
   * 在指定位置插入子元素
   * @param child - 要插入的子元素
   * @param index - 插入位置索引
   */
  spliceChild(e, t) {
    this.addTest(e) && this.tree.splice(t, 0, e);
  }
  /**
   * 在树结构末尾添加子元素
   * @param child - 要添加的子元素
   */
  pushChild(e) {
    this.addTest(e) && this.tree.push(e);
  }
  /**
   * 在树结构开头添加子元素
   * @param child - 要添加的子元素
   */
  unshiftChild(e) {
    this.addTest(e) && this.tree.unshift(e);
  }
  /**
   * 从树结构中删除指定的子元素
   * @param child - 要删除的子元素
   */
  removeChild(e) {
    if (!this.addTest(e)) {
      const t = this.tree.indexOf(e);
      this.tree.splice(t, 1);
    }
  }
}, FXCentre = class {
  /**
   * 构造函数
   * 初始化场景根目录并设置事件监听器
   */
  constructor() {
    /** 调用中心，用于事件通信 */
    n(this, "callCenter", null);
    fx.sceneFolder = new Folder("场景根目录"), fx.targetFolder = fx.sceneFolder, this.initEventListener();
  }
  /**
   * 初始化事件监听器
   * 注册数据库数据添加和操作数添加的事件监听
   */
  initEventListener() {
    this.callCenter = new CallCenter(), this.callCenter.addEventListener(
      fx.Eve.ADD_DATABASE_DATA,
      this.addDataBaseFunction,
      null,
      this
    ), this.callCenter.addEventListener(
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
  addBody(e, t, r) {
    e != null && !e.addTest(t) && (Call.send(fx.Eve.SHIFT_REMOVE_BODY, [t, !1], null), e.addBody(t), Call.send(
      fx.Eve.SHIFT_ADD_BODY_VIEW,
      [e, t, r],
      null
    ));
  }
  /**
   * 添加操作数的事件处理函数
   * @param e - 事件参数数组 [符号操作符, 操作数, 坐标]
   */
  addOperandFunction(e) {
    this.addBody(e[0], e[1], e[2]);
  }
  /**
   * 添加数据库数据的事件处理函数
   * @param e - 事件参数数组 [数据, 父节点, 位置]
   */
  addDataBaseFunction(e) {
    this.addData(e[0], e[1], e[2]);
  }
  /**
   * 添加数据到文件夹树
   * 根据父节点和位置信息将数据添加到相应的文件夹结构中
   * @param data - 要添加的数据对象
   * @param parent - 父节点对象，为null时添加到目标文件夹
   * @param location - 插入位置，为null时添加到末尾
   */
  addData(e, t, r) {
    t != null && t.typeView != null && (t = null), t != null && t.isFolder ? (e.parentFolder = t, r != null ? t.spliceChild(e, r) : t.pushChild(e)) : t == null ? (e.parentFolder = fx.targetFolder, r != null ? fx.targetFolder.spliceChild(e, r) : fx.targetFolder.pushChild(e)) : (e.parentFolder = t.parentFolder, e.parentFolder.spliceChild(
      e,
      t.parentFolder.tree.indexOf(t) + 1
    ));
  }
}, NodeType = /* @__PURE__ */ ((e) => (e[e.Variable = 1] = "Variable", e[e.Macro = 4] = "Macro", e[e.CalculationLayer = 5] = "CalculationLayer", e.SymbolBody = "SymbolBody", e.OperationBody = "OperationBody", e.Bookmark = "Bookmark", e[e.Sheet = 11] = "Sheet", e[e.LogicalBasic = 12] = "LogicalBasic", e[e.LogicalSlider = 14] = "LogicalSlider", e[e.LogicalBool = 16] = "LogicalBool", e))(NodeType || {});
function getCatchValue(e, t, r, i) {
  let s = 0;
  try {
    s = e.getValue(t, r, i);
  } catch (l) {
    console.log(l), s = 0;
  }
  return s;
}
var getGlobalThis = () => typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof self < "u" ? self : {}, VariableValue = class {
  /**
   * 构造函数
   * 初始化变量值数据模型实例
   * @param name 变量名称
   * @param value 变量值
   * @param type 节点类型
   * @param operator 操作符
   */
  constructor(e, t, r = null, i = null) {
    // ==================== 基础属性 ====================
    /** 变量名称 */
    n(this, "name");
    /** 唯一标识符 */
    n(this, "id");
    /** 类型标识符 */
    n(this, "TID");
    /** 变量值 */
    n(this, "value", 0);
    /** excel节点输出信息 */
    n(this, "selectedOutputInfo", 0);
    /** 节点类型 */
    n(this, "type");
    /** 操作符 */
    n(this, "operator", null);
    // ==================== AI相关 ====================
    /** 是否为AI标识 */
    n(this, "isAI", !1);
    // ==================== 宏定义和表格 ====================
    /** 宏定义字符串 */
    n(this, "macros", "");
    /** 表格数据 */
    n(this, "sheetData", null);
    // ==================== 逻辑控制 ====================
    /** 序列号 */
    n(this, "snNo", 1);
    /** 是否逻辑开启 */
    n(this, "isLogicalOpen", !1);
    /** 是否正在拖拽 */
    n(this, "isDragging", !1);
    /** 逻辑数字列表 */
    n(this, "logicalNumberList", []);
    /** 公式文本值 */
    n(this, "formulaTextValue");
    // ==================== 滑块控制 ====================
    /** 当前步数 */
    n(this, "currentStep", 0);
    /** 最小值 */
    n(this, "minValue", 1);
    /** 最大值 */
    n(this, "maxValue", 100);
    /** 步长 */
    n(this, "step", 10);
    // ==================== 层级和关系 ====================
    /** 父节点 */
    n(this, "parent", null);
    /** 子单元格 */
    n(this, "childCell");
    /** 子数组 */
    n(this, "childArray", []);
    /** 子体数组 */
    n(this, "childBodyArray", []);
    /** 逻辑子数组 */
    n(this, "logicalChildArray", []);
    /** 树结构 */
    n(this, "tree", []);
    // ==================== 缓存和视图 ====================
    /** 缓存值 */
    n(this, "cacheValue", null);
    /** 视图对象 */
    n(this, "view", null);
    /** 体对象 */
    n(this, "body", null);
    /** 标签 */
    n(this, "tag", null);
    // ==================== 敌对相关 ====================
    /** 敌对体 */
    n(this, "enemyBody", null);
    /** 敌对标识 */
    n(this, "enemyFlag", !1);
    // ==================== 权重和统计 ====================
    /** 是否为权重 */
    n(this, "isWeight", !0);
    /** 统计值 */
    n(this, "statistics", 0);
    // ==================== 地址和位置 ====================
    /** 绝对地址 */
    n(this, "absoluteAddress", null);
    /** 位置 */
    n(this, "site", null);
    /** 源对象 */
    n(this, "source", null);
    // ==================== 捕获和更新 ====================
    /** 捕获关键 */
    n(this, "captureCrit", !0);
    /** 更新值 */
    n(this, "upDateValue", 1);
    /** 降级值 */
    n(this, "demoteValue", 0);
    // ==================== 函数类型 ====================
    /** 函数类型 */
    n(this, "funcType", 0);
    // ==================== 历史记录 ====================
    /** 历史目标 */
    n(this, "historyTarget", null);
    // ==================== 显示控制 ====================
    /** 是否系统显示 */
    n(this, "isSystemShow", !1);
    // ==================== 构造器名称 ====================
    /** 构造函数名称 */
    n(this, "constructorName", "VariableValue");
    this.name = e, this.value = t, this.type = r, this.id = ++EventManager.IDINDEX, this.operator = i;
  }
  /**
   * 设置宏定义
   * @param value 宏定义字符串
   */
  setMacros(e) {
    this.macros = e, this.getValue();
  }
  /**
   * 设置全局值
   * @param value 要设置的值
   */
  setGlobalValue(e) {
    this.source != null && this.source.setValue(e);
  }
  /**
   * 设置变量值
   * @param value 要设置的值
   */
  setValue(e) {
    this.type !== 11 && (this.value = e, this.upDataChild(), this.type === 1 && fx.code === !1 && this.updateVariableDisplay(e));
  }
  /**
   * 更新变量显示
   * 私有方法，用于更新UI中的变量显示
   * @param value 要显示的值
   */
  updateVariableDisplay(e) {
    var i, s;
    const t = (i = fx.getDataById) == null ? void 0 : i.call(fx, this.id), r = (s = fx.getTreeDataById) == null ? void 0 : s.call(fx, this.id);
    if (t && r) {
      const l = getGlobalThis();
      if (l.window && !l.window.updatingSheeData) {
        const o = `componentDatas.nodeList.props.tree.props.dataSource.${r.dataPath}.showName`;
        l.window.set_data(
          l.window.store,
          o,
          `${this.name}=${e}`
        );
      }
    }
  }
  /**
   * 添加数字列表项
   */
  addNumberList() {
    this.logicalNumberList.push({ value: "" });
  }
  /**
   * 修改数字列表项
   * @param index 索引
   * @param value 新值
   */
  changeNumberListItem(e, t) {
    this.logicalNumberList[e].value = t;
  }
  /**
   * 获取是否为函数
   * @returns 是否为宏类型
   */
  getIsFunction() {
    return this.type === 4;
  }
  /**
   * 获取资源字符串
   * @param body 体对象
   * @returns 资源字符串
   */
  getRessSring(e) {
    const t = [];
    return fx.getStepData(e, t), t.join("");
  }
  /**
   * 设置敌对体
   * @param body 敌对体对象
   */
  setEnemyBody(e) {
    this.enemyBody = e;
  }
  /**
   * 设置表格数据
   * @param sheetData 表格数据
   */
  setSheetData(e) {
    this.sheetData = new fx.SheetData(e), this.getValue(), this.upDataChild();
  }
  /**
   * 获取变量值
   * 根据变量类型和状态计算并返回值
   * @returns 计算后的变量值
   */
  getValue(e, t, r) {
    if (this.type !== 1 && this.enemyFlag && fx.enemyBody != null)
      return this.value = getCatchValue(
        fx.enemyBody.getPropertyObject(this.source.absoluteAddress)
      ), this.returnFunc(this.value);
    switch (this.type) {
      case 4:
        return this.getMacroValue();
      case 11:
        return this.getSheetValue(e, t, r);
      case NodeType.LogicalNumberList:
        return this.getLogicalNumberListValue();
      case 14:
        return this.getLogicalSliderValue();
      case NodeType.LogicalList:
      case 12:
        return this.getLogicalValue();
      case 5:
        return this.getCalculationLayerValue();
      default:
        return this.getDefaultValue();
    }
  }
  /**
   * 获取宏值
   * 私有方法，执行宏定义并返回值
   * @returns 宏执行结果
   */
  getMacroValue() {
    try {
      if (this.historyTarget = globalThis.target, globalThis.target = this, this.macros === "")
        return this.value = 0, this.returnFunc(this.value);
      if (fx.code)
        this.value = new Function(
          `return ${fx["f_" + this.TID].fun.replace(/[\r\n\s]/g, "")}`
        )();
      else
        try {
          this.value = eval(this.macros);
        } catch (e) {
          this.value = 0;
        }
      return globalThis.target = this.historyTarget, isNaN(this.value) || (this.value = fx.double(this.value, 4)), this.returnFunc(this.value);
    } catch (e) {
      return this.value = 0, this.value;
    }
  }
  /**
   * 获取表格值
   * 私有方法，从表格数据中获取值
   * @returns 表格值
   */
  getSheetValue(e, t, r) {
    var i, s, l;
    return this.value = ((s = (i = this.source) == null ? void 0 : i.sheetData) == null ? void 0 : s.getValue(e, t, r)) || ((l = this.sheetData) == null ? void 0 : l.getValue(e, t, r)) || 0, this.returnFunc(this.value);
  }
  /**
   * 获取逻辑数字列表值
   * 私有方法，处理数字列表类型的值
   * @returns 数字列表值
   */
  getLogicalNumberListValue() {
    const e = this.getNumberListValue();
    if (typeof e == "string" && e.startsWith("[")) {
      const t = JSON.parse(e), r = Math.floor(Math.random() * (t[1] - t[0] + 1)) + t[0];
      this.value = r;
    } else
      this.value = Number(e);
    return this.returnFunc(this.value);
  }
  /**
   * 获取数字列表值
   * 私有方法，根据序列号获取数字列表中的值
   * @returns 数字列表中的值
   */
  getNumberListValue() {
    return typeof this.snNo == "number" && this.logicalNumberList.length && this.snNo <= this.logicalNumberList.length && this.logicalNumberList[this.snNo - 1].value || 0;
  }
  /**
   * 获取逻辑滑块值
   * 私有方法，根据滑块设置计算值
   * @returns 滑块值
   */
  getLogicalSliderValue() {
    const e = this.currentStep * this.step;
    return this.value = Math.max(this.minValue, Math.min(e, this.maxValue)), this.returnFunc(this.value);
  }
  /**
   * 获取逻辑值
   * 私有方法，从逻辑子数组中获取值
   * @returns 逻辑值
   */
  getLogicalValue() {
    const e = this.logicalChildArray[this.snNo - 1];
    return this.value = e ? e.getValue() : 0, this.returnFunc(this.value);
  }
  /**
   * 获取计算层值
   * 私有方法，从计算层中获取值
   * @returns 计算层值
   */
  getCalculationLayerValue() {
    var r;
    const e = (r = this.source) == null ? void 0 : r.body, t = this.body;
    return e ? this.value = getCatchValue(e) : t && (this.value = getCatchValue(t)), isNaN(this.value) || (this.value = Number(fx.double(this.value, 4))), this.returnFunc(this.value);
  }
  /**
   * 获取默认值
   * 私有方法，返回默认的变量值
   * @returns 默认值
   */
  getDefaultValue() {
    return this.value || (this.value = 0), isNaN(this.value) || (this.value = Number(this.value)), this.returnFunc(this.value);
  }
  /**
   * 函数处理 - 根据funcType执行对应的数学运算
   * 根据函数类型执行相应的数学运算，包括基础运算、三角函数、逻辑函数等
   * @param value 输入值
   * @returns 处理后的值
   */
  returnFunc(e) {
    return this.funcType === 0 ? e : this.funcType >= 1 && this.funcType <= 23 ? this.handleFunction(e) : this.funcType >= 24 && this.funcType <= 35 ? this.commonFormulaFunction() : this.funcType >= 36 && this.funcType <= 43 ? this.triangleFunction(e) : this.funcType >= 44 && this.funcType <= 51 ? this.logicFunction() : this.funcType >= 4 && this.funcType <= 14 || this.funcType >= 52 && this.funcType <= 55 ? this.commonFunction(e) : this.funcType >= 56 && this.funcType <= 60 ? this.algorithmFunction() : this.funcType >= 61 && this.funcType <= 68 ? this.gameFormulaFunction() : e;
  }
  handleFunction(e) {
    const t = (r) => getCatchValue(this.tree[r]);
    switch (this.funcType) {
      case 1:
        return 1 - e;
      case 2:
        return 1 / e;
      case 3:
        return -e;
      case 15:
        return e * 2;
      case 16:
        return e / 2;
      case 17:
        return e * 100;
      case 18:
        return e / 100;
      case 19:
        return e * e;
      case 20:
        return this.tree.length < 2 ? 0 : t(0) / t(1);
      case 21:
        return this.tree.length < 2 ? 0 : t(0) / (t(0) + t(1));
      case 22:
        return this.tree.length < 2 ? 0 : t(0) / (t(1) - t(0));
      case 23:
        return this.weightedRandom();
      case 10:
        return this.tree.length < 2 ? 0 : Math.random() * (t(1) - t(0)) + t(0);
      default:
        return e;
    }
  }
  commonFormulaFunction() {
    const e = (t) => getCatchValue(this.tree[t]);
    switch (this.funcType) {
      case 24:
        return this.tree.length < 2 ? 0 : e(0) - e(1);
      case 25:
        return this.tree.length < 2 ? 0 : e(0) * e(0) / (e(0) + e(1));
      case 26:
        return this.tree.length < 2 ? 0 : (e(0) - e(1)) * (e(0) / e(1));
      case 27:
        return this.tree.length < 2 ? 0 : e(0) * e(0) / e(1);
      case 28:
        return this.tree.length < 2 ? 0 : e(0) / e(1);
      case 29:
        return this.tree.length < 2 ? 0 : e(0) * (1 - e(1));
      case 30:
        return this.tree.length < 2 ? 0 : e(0) * e(1) / (1 + e(0) * e(1));
      case 31:
        return this.tree.length < 2 ? 0 : e(0) * e(1);
      case 32:
        return this.tree.length < 3 ? 0 : e(0) / (1 + e(1) * e(2));
      case 33:
        return this.tree.length < 3 ? 0 : e(0) / e(1) * e(2);
      case 34:
        return this.tree.length < 3 ? 0 : e(0) * e(2) / e(1);
      case 35:
        return this.tree.length < 3 ? 0 : e(0) * (e(2) / e(1));
      default:
        return 0;
    }
  }
  triangleFunction(e) {
    const t = (r) => getCatchValue(this.tree[r]);
    switch (this.funcType) {
      case 36:
        return e * Math.PI;
      case 37:
        return Math.cos(e);
      case 38:
        return Math.sin(e);
      case 39:
        return Math.tan(e);
      case 40:
        return Math.acos(e);
      case 41:
        return Math.asin(e);
      case 42:
        return Math.atan(e);
      case 43:
        return this.tree.length < 2 ? 0 : Math.atan2(t(0), t(1));
      default:
        return e;
    }
  }
  logicFunction() {
    const e = (t) => getCatchValue(this.tree[t]);
    if (this.tree.length < 4 && this.funcType !== 51 && this.funcType !== 50)
      return 0;
    switch (this.funcType) {
      case 44:
        return e(0) > e(1) ? e(2) : e(3);
      case 45:
        return e(0) >= e(1) ? e(2) : e(3);
      case 46:
        return e(0) < e(1) ? e(2) : e(3);
      case 47:
        return e(0) <= e(1) ? e(2) : e(3);
      case 48:
        return e(0) == e(1) ? e(2) : e(3);
      case 49:
        return e(0) != e(1) ? e(2) : e(3);
      case 50:
        return this.complexForLoop();
      case 51:
        return this.tree.length > 0 ? e(e(0)) : 0;
      default:
        return 0;
    }
  }
  commonFunction(e) {
    const t = (r) => getCatchValue(this.tree[r]);
    switch (this.funcType) {
      case 4:
        return Math.abs(e);
      case 5:
        return Math.random() * e;
      case 6:
        return Math.floor(e);
      case 7:
        return Math.sqrt(e);
      case 8:
        return Math.max(...this.tree.map((r, i) => Number(t(i))));
      case 9:
        return Math.min(...this.tree.map((r, i) => Number(t(i))));
      case 11:
        return this.tree.length < 2 ? 0 : Math.pow(t(0), t(1));
      case 12:
        return Math.log(e);
      case 13:
        return Math.exp(e);
      case 14:
        return Math.cbrt(e);
      case 52:
        return Math.sign(e);
      case 53:
        return Math.imul(e, 1);
      case 54:
        return Math.ceil(e);
      case 55:
        return Math.round(e);
      default:
        return e;
    }
  }
  algorithmFunction() {
    const e = (t) => getCatchValue(this.tree[t]);
    switch (this.funcType) {
      case 56:
        return this.tree.length < 2 ? 0 : fx.length(e(0), e(1));
      case 57:
        return this.tree.length < 4 ? 0 : fx.distance(e(0), e(1), e(2), e(3));
      case 58:
        return this.tree.length < 4 ? 0 : fx.dot(e(0), e(1), e(2), e(3));
      case 59:
        return this.tree.length < 4 ? 0 : fx.cross(e(0), e(1), e(2), e(3));
      case 60:
        return this.tree.length < 3 ? 0 : fx.mix(e(0), e(1), e(2));
      default:
        return 0;
    }
  }
  gameFormulaFunction() {
    const e = (t) => getCatchValue(this.tree[t]);
    switch (this.funcType) {
      case 61:
        return this.tree.length < 3 ? 0 : e(0) * e(2) * (1 - 1 / (1 + e(0) * e(2) / (5 * e(1))));
      case 62:
        return this.tree.length < 4 ? 0 : e(0) + e(2) * e(1) + e(3) * (1 + e(1)) * e(1) / 2;
      case 63:
      case 64:
        return this.tree.length < 5 ? 0 : e(0) * 2 + Math.pow(e(0) / 10, 2) + e(1) / 5 + e(2) / 5 + e(4) * e(3);
      case 65:
        return this.tree.length < 1 ? 0 : e(0) * 2 + Math.pow(e(0) / 10, 2);
      case 66:
      case 67:
        return this.value;
      case 70:
        return this.tree.length < 2 ? 0 : e(0) + e(1);
      default:
        return this.value;
    }
  }
  weightedRandom() {
    if (this.tree.length % 2 !== 0)
      return 0;
    let e = 0;
    for (let r = 1; r < this.tree.length; r += 2)
      this.tree[r].indexex = getCatchValue(this.tree[r]) + e, e += getCatchValue(this.tree[r]);
    const t = Math.random() * e;
    for (let r = 1; r < this.tree.length; r += 2) {
      const i = r === 1 ? 0 : this.tree[r - 2].indexex;
      if (t >= i && t < this.tree[r].indexex)
        return getCatchValue(this.tree[r - 1]);
    }
    return 0;
  }
  complexForLoop() {
    if (this.tree.length < 3)
      return 0;
    let e = 0, t = 0;
    const r = getCatchValue(this.tree[0]), i = getCatchValue(this.tree[1]), s = getCatchValue(this.tree[2]);
    for (let l = r; l <= i; l++)
      l % s === 1 && e++, t += e + 2;
    return t;
  }
  /**
   * 获取公式文本值体
   * 根据函数类型生成对应的公式文本表示
   * @returns 公式文本值
   */
  getFormulaTextValueBody() {
    return {
      1: `1-(${this.value})`,
      2: `1/(${this.value})`,
      3: `-(${this.value})`,
      4: `abs(${this.value})`,
      5: `random()*${this.value}`,
      6: `floor(${this.value})`,
      7: `sqrt(${this.value})`,
      12: `log(${this.value})`,
      13: `exp(${this.value})`,
      14: `cbrt(${this.value})`,
      15: `(${this.value})*2`,
      16: `(${this.value})/2`,
      17: `(${this.value})*100`,
      18: `(${this.value})/100`,
      19: `${this.value}*${this.value}`,
      36: `${this.value}*PI`,
      37: `cos(${this.value})`,
      38: `sin(${this.value})`,
      39: `tan(${this.value})`,
      40: `acos(${this.value})`,
      41: `asin(${this.value})`,
      42: `atan(${this.value})`,
      52: `sign(${this.value})`,
      53: `imul(${this.value})`,
      54: `ceil(${this.value})`,
      55: `round(${this.value})`
    }[this.funcType] || this.formulaTextValue || String(this.value);
  }
  /**
   * 获取公式文本值
   * @returns 公式文本值
   */
  getFormulaTextValue() {
    return this.getFormulaTextValueBody();
  }
  /**
   * 获取公式文本字符体
   * 根据函数类型生成对应的字符表示
   * @returns 公式字符表示
   */
  getFormulaTextCharacterBody() {
    if (this.type === 5)
      return this.body ? this.body.getFormulaTextCharacter() : "";
    if (this.type === 4)
      return this.getValue();
    let e = this.name;
    return this.type === 4 && (e = `${this.name}_${this.TID}`), {
      1: `1-(${this.name})`,
      2: `1/(${this.name})`,
      3: `-${this.name}`,
      4: `abs(${this.name})`,
      5: `random()*(${this.name})`,
      6: `floor(${this.name})`,
      7: `sqrt(${this.name})`,
      12: `log(${this.name})`,
      13: `exp(${this.name})`,
      14: `cbrt(${this.name})`,
      15: `${this.name}*2`,
      16: `${this.name}/2`,
      17: `${this.name}*100`,
      18: `${this.name}/100`,
      19: `${this.name}*${this.name}`,
      36: `${this.name}*PI`,
      37: `cos(${this.name})`,
      38: `sin(${this.name})`,
      39: `tan(${this.name})`,
      40: `acos(${this.name})`,
      41: `asin(${this.name})`,
      42: `atan(${this.name})`,
      52: `sign(${this.name})`,
      53: `imul(${this.name})`,
      54: `ceil(${this.name})`,
      55: `round(${this.name})`
    }[this.funcType] || e;
  }
  /**
   * 获取公式文本字符
   * @returns 公式字符表示
   */
  getFormulaTextCharacter() {
    return this.getFormulaTextCharacterBody();
  }
  /**
   * 移除子项
   * @param child 要移除的子项
   */
  removeChild(e) {
    const t = this.childArray.indexOf(e);
    t > -1 && this.childArray.splice(t, 1);
  }
  /**
   * 浅度销毁
   * 清理引用和重置数据
   */
  dispose() {
    this.source != null && this.source.removeChild(this), this.macros = "", this.childArray = [];
  }
  /**
   * 设置参数
   * @param name 参数名称
   * @param value 参数值
   */
  setParameter(e, t) {
    this.name = e, this.value = t;
  }
  /**
   * 更新子项信息
   * 同步更新所有子项的基本信息
   */
  upDataChild() {
    for (const e of this.childArray)
      e.name = this.name, e.value = this.value, e.body = this.body, e.TID = this.TID;
  }
  /**
   * 修改子项信息
   * 递归更新所有子项的信息
   * @param name 名称
   * @param value 值
   */
  setDataChild(e, t) {
    this.name = e, this.value = t;
    for (const r of this.childArray)
      r.setDataChild(e, t);
  }
  /**
   * 同步运算体
   * 同步所有子项的运算体引用
   */
  syncBody() {
    for (const e of this.childArray)
      e.body = this.body;
  }
  /**
   * 复制变量值
   * 创建当前变量值的副本
   * @returns 复制后的变量值实例
   */
  copy() {
    const e = new fx.VariableValue(
      this.name,
      this.value,
      this.type,
      this.operator
    );
    return e.source = this, e.body = this.body, e.TID = this.TID, this.childArray.push(e), e;
  }
}, BasicBody = class {
  /**
   * 构造函数
   * 初始化基础数据模型实例
   *
   * @constructor
   * @description 创建一个新的 BasicBody 实例，自动分配唯一标识符
   * 初始化所有属性为默认值，准备用于构建表达式树
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * console.log(body.id); // 输出唯一的数字ID
   * ```
   */
  constructor() {
    // ==================== 树结构属性 ====================
    /** 子节点树 */
    n(this, "tree", []);
    /** 父节点 */
    n(this, "parent", null);
    /** 节点类型 */
    n(this, "type", "BasicBody");
    // ==================== 状态属性 ====================
    /** 是否为权重节点 */
    n(this, "isWeight", !1);
    /** 节点值 */
    n(this, "value", null);
    /** 是否为高级节点 */
    n(this, "isAdvance", !1);
    /** 是否绑定运算 */
    n(this, "isBindingOperation", !1);
    /** 是否绑定公式 */
    n(this, "isBindingFormula", !1);
    // ==================== 文本属性 ====================
    /** 公式文本值 */
    n(this, "formulaTextValue", "");
    /** 公式文本字符 */
    n(this, "formulaTextCharacter", "");
    /** 运算逻辑文本 */
    n(this, "operationalLogicText", "");
    // ==================== 缓存和功能属性 ====================
    /** 缓存元素值 */
    n(this, "cacheElementValue", null);
    /** 函数类型 */
    n(this, "funcType", 0);
    /** 构造函数名称 */
    n(this, "constructorName", "BasicBody");
    /** 唯一标识符 */
    n(this, "id");
    /** 类型类型 */
    n(this, "typetype", null);
    /** 操作符 */
    n(this, "operator", null);
    /** 索引 */
    n(this, "indexex", 0);
    /** 是否为函数 */
    n(this, "isFunction", !1);
    // ==================== 位置属性 ====================
    /** X坐标 */
    n(this, "x", 0);
    /** Y坐标 */
    n(this, "y", 0);
    this.id = ++EventManager.IDINDEX;
  }
  /**
   * 添加测试 - 检查节点是否存在于树中
   *
   * @param {BasicBody} body - 要检查的节点
   * @returns {boolean} 如果节点存在于当前树或其子树中返回 true，否则返回 false
   * @description 递归检查指定的 BasicBody 节点是否存在于当前节点的子树中
   * 包括直接子节点和所有后代节点
   *
   * @example
   * ```typescript
   * const parent = new BasicBody();
   * const child = new BasicBody();
   * const grandchild = new BasicBody();
   *
   * parent.addBody(child);
   * child.addBody(grandchild);
   *
   * console.log(parent.addTest(grandchild)); // true
   * console.log(parent.addTest(new BasicBody())); // false
   * ```
   */
  addTest(e) {
    return this.tree.includes(e) ? !0 : this.tree.some(
      (t) => t instanceof fx.BasicBody && t.addTest(e)
    );
  }
  /**
   * 替换运算体
   *
   * @param {BasicBody} body - 新的运算体节点
   * @param {number} index - 要替换的子节点索引位置
   * @returns {void}
   * @description 在指定索引位置替换子节点，并自动设置新节点的父节点引用
   * 如果索引超出范围，可能会导致数组越界错误
   *
   * @example
   * ```typescript
   * const parent = new BasicBody();
   * const oldChild = new BasicBody();
   * const newChild = new BasicBody();
   *
   * parent.addBody(oldChild);
   * parent.replace(newChild, 0); // 替换第一个子节点
   * ```
   */
  replace(e, t) {
    this.tree[t] = e, e.parent = this;
  }
  /**
   * 删除运算体
   *
   * @param {BasicBody} body - 要删除的运算体节点
   * @returns {void}
   * @description 从当前节点的子节点列表中删除指定的节点，并清除其父节点引用
   * 如果节点不存在于子节点列表中，则不执行任何操作
   *
   * @example
   * ```typescript
   * const parent = new BasicBody();
   * const child = new BasicBody();
   *
   * parent.addBody(child);
   * parent.deletebody(child); // 删除子节点
   * console.log(parent.tree.length); // 0
   * ```
   */
  deletebody(e) {
    const t = this.tree.indexOf(e);
    t !== -1 && (this.tree.splice(t, 1), e.parent = null);
  }
  /**
   * 添加运算体
   *
   * @param {BasicBody} body - 要添加的运算体节点
   * @returns {void}
   * @description 将指定的 BasicBody 节点添加为当前节点的子节点
   * 如果节点已经存在于子节点列表中，则不重复添加
   * 自动设置新节点的父节点引用
   *
   * @example
   * ```typescript
   * const parent = new BasicBody();
   * const child = new BasicBody();
   *
   * parent.addBody(child);
   * console.log(parent.tree.length); // 1
   * console.log(child.parent === parent); // true
   * ```
   */
  addBody(e) {
    this.tree.includes(e) || (e.parent = this, this.tree.push(e));
  }
  /**
   * 获取可删除运算列表
   *
   * @param {BasicBody} body - 起始删除的节点
   * @returns {BasicBody[]} 从指定节点开始到末尾的所有子节点数组
   * @description 从指定节点开始，获取并删除从该节点到子节点列表末尾的所有节点
   * 返回被删除的节点数组，同时从当前节点的子节点列表中移除这些节点
   *
   * @example
   * ```typescript
   * const parent = new BasicBody();
   * const child1 = new BasicBody();
   * const child2 = new BasicBody();
   * const child3 = new BasicBody();
   *
   * parent.addBody(child1);
   * parent.addBody(child2);
   * parent.addBody(child3);
   *
   * const deleted = parent.getDeleteBodyTree(child2);
   * console.log(deleted.length); // 2 (child2 和 child3)
   * console.log(parent.tree.length); // 1 (只剩下 child1)
   * ```
   */
  getDeleteBodyTree(e) {
    const t = this.tree.indexOf(e);
    if (t === -1)
      return [];
    const r = this.tree.slice(t);
    return this.tree.splice(t), r;
  }
  /**
   * 浅度销毁
   * 清理所有引用和缓存数据
   *
   * @returns {void}
   * @description 递归销毁当前节点及其所有子节点，清理所有引用和缓存数据
   * 重置所有状态标志，释放内存资源。调用此方法后，节点将不可用
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * body.addBody(new BasicBody());
   *
   * // 使用节点...
   *
   * body.dispose(); // 清理所有资源
   * // body 现在已被清理，不应再使用
   * ```
   */
  dispose() {
    this.tree.forEach((e) => {
      e && typeof e.dispose == "function" && e.dispose();
    }), this.tree = [], this.value = null, this.parent = null, this.typetype = null, this.cacheElementValue = null, this.formulaTextValue = "", this.formulaTextCharacter = "", this.operationalLogicText = "", this.isWeight = !1, this.isAdvance = !1, this.isBindingOperation = !1, this.isBindingFormula = !1, this.isFunction = !1;
  }
  /**
   * 获取最大高度
   * 递归计算树结构的总高度
   *
   * @returns {number} 树的最大高度，至少为1
   * @description 递归计算当前节点及其所有子节点组成的树结构的总高度
   * 用于确定树形结构的深度，有助于布局和显示
   *
   * @example
   * ```typescript
   * const root = new BasicBody();
   * const child1 = new BasicBody();
   * const child2 = new BasicBody();
   * const grandchild = new BasicBody();
   *
   * root.addBody(child1);
   * root.addBody(child2);
   * child1.addBody(grandchild);
   *
   * console.log(root.getMaxHeight()); // 3 (root -> child1 -> grandchild)
   * ```
   */
  getMaxHeight() {
    return this.tree.filter((t) => t instanceof fx.BasicBody).reduce((t, r) => t + r.getMaxHeight(), 0) || 1;
  }
  /**
   * 获取节点值
   * 计算并返回当前节点的值
   *
   * @returns {any} 计算后的值，可能是数字、字符串或其他类型
   * @description 递归计算当前节点及其所有子节点的值，根据函数类型应用相应的计算逻辑
   * 这是整个表达式树计算的核心方法，会触发整个子树的重新计算
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * body.funcType = CommonFunctionTypes.max;
   *
   * const child1 = new BasicBody();
   * child1.value = 10;
   * const child2 = new BasicBody();
   * child2.value = 20;
   *
   * body.addBody(child1);
   * body.addBody(child2);
   *
   * console.log(body.getValue()); // 20 (最大值)
   * ```
   */
  getValue(e, t, r) {
    if (this.resetValues(), !!this.tree)
      return this.processTreeValues(), this.calculateFinalValue(), this.value = this.applyFunction(this.value), this.value;
  }
  /**
   * 重置值
   * 清空所有计算相关的临时值
   *
   * @private
   * @returns {void}
   * @description 在开始新的计算前，清空所有与计算相关的临时值和缓存
   * 确保每次计算都从干净的状态开始，避免上次计算结果的干扰
   */
  resetValues() {
    this.value = null, this.formulaTextValue = "", this.formulaTextCharacter = "", this.operationalLogicText = "", this.cacheElementValue = null;
  }
  /**
   * 处理树值
   * 遍历所有子节点并更新相关值
   *
   * @private
   * @returns {void}
   * @description 遍历当前节点的所有子节点，获取每个节点的值并更新运算逻辑和公式文本
   * 这是计算过程中的核心步骤，负责收集和处理所有子节点的数据
   */
  processTreeValues() {
    for (const e of this.tree) {
      const t = this.getNodeValue(e);
      this.updateOperationalLogic(e, t), this.updateFormulaTexts(e, t);
    }
  }
  /**
   * 获取节点值
   *
   * @private
   * @param {BasicBody} node - 要获取值的节点
   * @returns {any} 节点的值
   * @description 获取指定节点的值，根据节点类型使用不同的获取策略
   * 目前所有节点类型都使用相同的获取方式，但为将来扩展预留了接口
   */
  getNodeValue(e) {
    if (e.type === 11) {
      const { name: t, row: r, col: i } = (e == null ? void 0 : e.selectedOutputInfo) || {};
      return getCatchValue(e, t, r, i);
    }
    return e.type === 5, getCatchValue(e);
  }
  /**
   * 更新运算逻辑
   *
   * @private
   * @param {BasicBody} node - 当前处理的节点
   * @param {any} value - 节点的值
   * @returns {void}
   * @description 根据节点的值和操作符更新运算逻辑文本
   * 构建用于最终计算的数学表达式字符串
   */
  updateOperationalLogic(e, t) {
    var r;
    (r = this.cacheElementValue) != null && r.operator && (this.operationalLogicText += `(${t})`), this.cacheElementValue || (this.cacheElementValue = e, this.operationalLogicText += `(${t})`), e.operator && (this.operationalLogicText += e.operator);
  }
  /**
   * 更新公式文本
   *
   * @private
   * @param {BasicBody} node - 当前处理的节点
   * @param {any} value - 节点的值
   * @returns {void}
   * @description 根据节点类型更新公式文本值和字符表示
   * 只处理支持的节点类型，构建完整的公式文本字符串
   */
  updateFormulaTexts(e, t) {
    [
      0,
      1,
      2,
      3,
      4,
      5,
      11
      /* Sheet */
    ].includes(e.type) && (this.formulaTextCharacter += e.getFormulaTextCharacter(), this.formulaTextValue += t, e.operator && (this.formulaTextValue += e.operator, this.formulaTextCharacter += e.operator));
  }
  /**
   * 计算最终值
   *
   * @private
   * @returns {void}
   * @description 根据运算逻辑文本计算最终结果值
   * 检查表达式是否完整，然后使用 fx.eval 进行计算
   */
  calculateFinalValue() {
    const e = this.formulaTextValue.slice(-1);
    ["+", "-", "*", "/", "%", ">", ">=", "<", "<=", "!="].includes(e) || (this.value = fx.eval(this.operationalLogicText)), isNaN(this.value) ? this.value = this.operationalLogicText : this.value = Number(this.value);
  }
  /**
   * 应用函数
   *
   * @private
   * @param {any} value - 要处理的输入值
   * @returns {any} 经过函数处理后的结果值
   * @description 将计算得到的值传递给函数处理器进行进一步处理
   * 这是计算流程中的最后一步，应用用户指定的函数类型
   */
  applyFunction(e) {
    return this.returnFunc(e);
  }
  /**
   * 返回函数处理结果
   *
   * @param {any} value - 要处理的输入值
   * @returns {any} 经过函数处理后的结果值
   * @description 根据当前节点的函数类型(funcType)，应用相应的处理函数
   * 支持数学函数、逻辑函数、游戏公式等多种类型的计算
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * body.funcType = CommonFunctionTypes.abs;
   *
   * console.log(body.returnFunc(-5)); // 5
   *
   * body.funcType = CommonFunctionTypes.sqrt;
   * console.log(body.returnFunc(16)); // 4
   * ```
   */
  returnFunc(e) {
    const r = this.getFunctionHandlers()[this.funcType];
    return r ? r(e, this.tree) : e;
  }
  /**
   * 获取函数处理器映射
   *
   * @private
   * @returns {Record<number, (value: any, tree: BasicBody[]) => any>} 函数类型到处理函数的映射
   * @description 返回所有支持的函数类型及其对应的处理函数
   * 包括数学函数、逻辑函数、游戏公式等多种类型的处理器
   */
  getFunctionHandlers() {
    return {
      0: (e) => e,
      // 默认返回
      // HandleFunctionTypes
      1: (e) => 1 - e,
      2: (e) => 1 / e,
      3: (e) => -e,
      15: (e) => e * 2,
      16: (e) => e / 2,
      17: (e) => e * 100,
      18: (e) => e / 100,
      19: (e) => e * e,
      // CommonFunctionTypes
      4: (e) => Math.abs(e),
      5: (e) => Math.random() * e,
      6: (e) => Math.floor(e),
      7: (e) => Math.sqrt(e),
      8: (e, t) => this.calculateMax(t),
      9: (e, t) => this.calculateMin(t),
      11: (e, t) => this.calculatePower(t),
      12: (e) => Math.log(e),
      13: (e) => Math.exp(e),
      14: (e) => Math.cbrt(e),
      52: (e) => Math.sign(e),
      53: (e) => Math.imul(e, 1),
      54: (e) => Math.ceil(e),
      55: (e) => Math.round(e),
      // HandleFunctionTypes (continued)
      10: (e, t) => this.calculateRandom(t),
      20: (e, t) => this.divideValues(t),
      21: (e, t) => this.divideBySum(t),
      22: (e, t) => this.divideByDifference(t),
      23: (e, t) => this.weightedRandom(t),
      // CommonFormulaTypes
      24: (e, t) => this.attackMinusDefense(t),
      25: (e, t) => this.attackSquaredOverDiff(t),
      26: (e, t) => this.diffTimesRatio(t),
      27: (e, t) => this.attackSquaredOverDefense(t),
      28: (e, t) => this.attackOverDefense(t),
      29: (e, t) => this.attackWithCoefficient(t),
      30: (e, t) => this.armorFormula(t),
      31: (e, t) => this.attackWithDamageRate(t),
      32: (e, t) => this.attackOverDefenseFormula(t),
      33: (e, t) => this.attackRatioWithCoef(t),
      34: (e, t) => this.attackCoefOverDefense(t),
      35: (e, t) => this.attackTimesCoefRatio(t),
      // TriangleFunctionTypes
      36: (e) => e * Math.PI,
      37: (e) => Math.cos(e),
      38: (e) => Math.sin(e),
      39: (e) => Math.tan(e),
      40: (e) => Math.acos(e),
      41: (e) => Math.asin(e),
      42: (e) => Math.atan(e),
      43: (e, t) => this.calculateAtan2(t),
      // LogicFunctionTypes
      44: (e, t) => this.ifGreater(t),
      45: (e, t) => this.ifGreaterEqual(t),
      46: (e, t) => this.ifLess(t),
      47: (e, t) => this.ifLessEqual(t),
      48: (e, t) => this.ifEqual(t),
      49: (e, t) => this.ifNotEqual(t),
      50: (e, t) => this.forLoop(t),
      51: (e, t) => this.arrayAccess(t),
      // AlgorithmFunctionTypes
      56: (e, t) => this.calculateLength(t),
      57: (e, t) => this.calculateDistance(t),
      58: (e, t) => this.calculateDot(t),
      59: (e, t) => this.calculateCross(t),
      60: (e, t) => this.calculateMix(t),
      // GameFormula1
      61: (e, t) => this.battleFormula(t),
      // GameFormula2
      62: (e, t) => this.characterHealth(t),
      63: (e, t) => this.meleeAttack(t),
      64: (e, t) => this.rangedAttack(t),
      65: (e, t) => this.mageAttack(t),
      66: (e, t) => this.physicalDefense(t),
      67: (e, t) => this.magicDefense(t),
      68: (e, t) => this.hitRate(t),
      69: (e, t) => this.dodgeRate(t),
      70: (e) => 1 + e / 3,
      71: (e) => 1 + e / 5,
      72: (e, t) => this.jobPointGrowth(t),
      73: (e, t) => this.finalMeleeAttack(t),
      74: (e, t) => this.finalRangedAttack(t),
      75: (e, t) => this.finalMagicAttack(t),
      76: (e, t) => this.physicalDamage(t),
      77: (e, t) => this.magicDamage(t),
      78: (e, t) => this.hitChance(t),
      79: (e, t) => this.critChance(t),
      // GameFormula3
      80: (e, t) => this.growthFormula(t)
    };
  }
  // Helper methods for calculations
  /**
   * 获取树节点值
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组
   * @param {number} index - 要获取的节点索引
   * @returns {number} 节点的数值，如果索引超出范围则返回0
   * @description 安全地获取指定索引位置的子节点值，并转换为数字类型
   */
  getTreeValue(e, t) {
    return e.length > t ? Number(getCatchValue(e[t])) : 0;
  }
  /**
   * 计算最大值
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组
   * @returns {number} 所有子节点值中的最大值
   * @description 遍历所有子节点，找到其中的最大值
   */
  calculateMax(e) {
    const t = e.map((r) => Number(getCatchValue(r)));
    return Math.max(...t);
  }
  /**
   * 计算最小值
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组
   * @returns {number} 所有子节点值中的最小值
   * @description 遍历所有子节点，找到其中的最小值
   */
  calculateMin(e) {
    const t = e.map((r) => Number(getCatchValue(r)));
    return Math.min(...t);
  }
  /**
   * 计算幂运算
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点
   * @returns {number} 第一个节点的值作为底数，第二个节点的值作为指数的幂运算结果
   * @description 计算 base^exponent，如果节点数量不足则返回0
   */
  calculatePower(e) {
    return e.length < 2 ? 0 : Math.pow(this.getTreeValue(e, 0), this.getTreeValue(e, 1));
  }
  /**
   * 计算随机数
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点
   * @returns {number} 在指定范围内的随机数
   * @description 生成一个在 [min, max) 范围内的随机数，如果节点数量不足则返回0
   */
  calculateRandom(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return Math.random() * (r - t) + t;
  }
  /**
   * 计算除法
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点
   * @returns {number} 第一个节点值除以第二个节点值的结果
   * @description 计算 a / b，如果节点数量不足则返回0
   */
  divideValues(e) {
    return e.length < 2 ? 0 : this.getTreeValue(e, 0) / this.getTreeValue(e, 1);
  }
  /**
   * 计算除以和
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点
   * @returns {number} a / (a + b) 的结果
   * @description 计算第一个值除以两个值之和，如果节点数量不足则返回0
   */
  divideBySum(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return t / (t + r);
  }
  /**
   * 计算除以差
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点
   * @returns {number} a / (b - a) 的结果
   * @description 计算第一个值除以两个值之差，如果节点数量不足则返回0
   */
  divideByDifference(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return t / (r - t);
  }
  /**
   * 计算加权随机数
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，必须是偶数个节点
   * @returns {number} 根据权重随机选择的值
   * @description 根据权重进行随机选择，节点数组格式为 [值1, 权重1, 值2, 权重2, ...]
   * 如果节点数量不是偶数则返回0
   */
  weightedRandom(e) {
    if (e.length % 2 !== 0)
      return 0;
    let t = 0;
    for (let i = 1; i < e.length; i += 2) {
      const s = this.getTreeValue(e, i);
      e[i].indexex = s + t, t += s;
    }
    const r = Math.random() * t;
    for (let i = 1; i < e.length; i += 2) {
      const s = i > 1 && e[i - 2].indexex || 0, l = e[i].indexex || 0;
      if (r >= s && r < l)
        return this.getTreeValue(e, i - 1);
    }
    return 0;
  }
  // Combat formula helpers
  /**
   * 攻击减防御公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点 [攻击力, 防御力]
   * @returns {number} 攻击力减去防御力的结果
   * @description 基础战斗伤害计算公式：伤害 = 攻击力 - 防御力
   * 这是最简单的伤害计算方式，适用于基础战斗系统
   */
  attackMinusDefense(e) {
    return e.length < 2 ? 0 : this.getTreeValue(e, 0) - this.getTreeValue(e, 1);
  }
  /**
   * 攻击平方除以攻击加防御公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点 [攻击力, 防御力]
   * @returns {number} 攻击力平方除以(攻击力+防御力)的结果
   * @description 复杂战斗伤害公式：伤害 = 攻击力² / (攻击力 + 防御力)
   * 这种公式在高攻击力时伤害增长更快，但防御力仍有一定效果
   */
  attackSquaredOverDiff(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return t * t / (t + r);
  }
  /**
   * 差值乘以比率公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点 [攻击力, 防御力]
   * @returns {number} (攻击力-防御力) * (攻击力/防御力) 的结果
   * @description 复合战斗伤害公式：伤害 = (攻击力 - 防御力) × (攻击力 / 防御力)
   * 结合了线性差值和比率计算，攻击力优势时伤害会显著增加
   */
  diffTimesRatio(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return (t - r) * (t / r);
  }
  /**
   * 攻击平方除以防御公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点 [攻击力, 防御力]
   * @returns {number} 攻击力平方除以防御力的结果
   * @description 高攻击力伤害公式：伤害 = 攻击力² / 防御力
   * 攻击力对伤害的影响是二次方的，防御力效果相对较弱
   */
  attackSquaredOverDefense(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return t * t / r;
  }
  /**
   * 攻击除以防御公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点 [攻击力, 防御力]
   * @returns {number} 攻击力除以防御力的结果
   * @description 比率伤害公式：伤害 = 攻击力 / 防御力
   * 伤害完全取决于攻击力和防御力的比率，适用于平衡性要求较高的战斗系统
   */
  attackOverDefense(e) {
    return e.length < 2 ? 0 : this.getTreeValue(e, 0) / this.getTreeValue(e, 1);
  }
  /**
   * 攻击乘以系数公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点 [攻击力, 系数]
   * @returns {number} 攻击力乘以(1-系数)的结果
   * @description 减伤攻击公式：伤害 = 攻击力 × (1 - 减伤系数)
   * 系数表示减伤百分比，适用于有护甲或减伤效果的战斗系统
   */
  attackWithCoefficient(e) {
    return e.length < 2 ? 0 : this.getTreeValue(e, 0) * (1 - this.getTreeValue(e, 1));
  }
  /**
   * 护甲公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，至少需要2个节点 [护甲值, 系数]
   * @returns {number} 护甲减伤百分比
   * @description 护甲减伤公式：减伤率 = (护甲 × 系数) / (1 + 护甲 × 系数)
   * 这是经典的护甲减伤公式，护甲越高减伤效果越明显，但有递减效应
   */
  armorFormula(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return t * r / (1 + t * r);
  }
  attackWithDamageRate(e) {
    return e.length < 2 ? 0 : this.getTreeValue(e, 0) * this.getTreeValue(e, 1);
  }
  attackOverDefenseFormula(e) {
    if (e.length < 3)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2);
    return t / (1 + r * i);
  }
  attackRatioWithCoef(e) {
    return e.length < 3 ? 0 : this.getTreeValue(e, 0) / this.getTreeValue(e, 1) * this.getTreeValue(e, 2);
  }
  attackCoefOverDefense(e) {
    return e.length < 3 ? 0 : this.getTreeValue(e, 0) * this.getTreeValue(e, 2) / this.getTreeValue(e, 1);
  }
  attackTimesCoefRatio(e) {
    return e.length < 3 ? 0 : this.getTreeValue(e, 0) * (this.getTreeValue(e, 2) / this.getTreeValue(e, 1));
  }
  // Trigonometric helpers
  calculateAtan2(e) {
    return e.length < 2 ? 0 : Math.atan2(this.getTreeValue(e, 0), this.getTreeValue(e, 1));
  }
  // Logic helpers
  ifGreater(e) {
    return e.length < 4 ? 0 : this.getTreeValue(e, 0) > this.getTreeValue(e, 1) ? this.getTreeValue(e, 2) : this.getTreeValue(e, 3);
  }
  ifGreaterEqual(e) {
    return e.length < 4 ? 0 : this.getTreeValue(e, 0) >= this.getTreeValue(e, 1) ? this.getTreeValue(e, 2) : this.getTreeValue(e, 3);
  }
  ifLess(e) {
    return e.length < 4 ? 0 : this.getTreeValue(e, 0) < this.getTreeValue(e, 1) ? this.getTreeValue(e, 2) : this.getTreeValue(e, 3);
  }
  ifLessEqual(e) {
    return e.length < 4 ? 0 : this.getTreeValue(e, 0) <= this.getTreeValue(e, 1) ? this.getTreeValue(e, 2) : this.getTreeValue(e, 3);
  }
  ifEqual(e) {
    return e.length < 4 ? 0 : this.getTreeValue(e, 0) === this.getTreeValue(e, 1) ? this.getTreeValue(e, 2) : this.getTreeValue(e, 3);
  }
  ifNotEqual(e) {
    return e.length < 4 ? 0 : this.getTreeValue(e, 0) !== this.getTreeValue(e, 1) ? this.getTreeValue(e, 2) : this.getTreeValue(e, 3);
  }
  forLoop(e) {
    if (e.length < 4)
      return 0;
    let t = 0, r = 0;
    const i = this.getTreeValue(e, 0), s = this.getTreeValue(e, 1), l = this.getTreeValue(e, 2), o = this.getTreeValue(e, 3);
    for (let u = i; u <= s; u++)
      u % l === 1 && t++, r += t + o;
    return r;
  }
  arrayAccess(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0);
    return this.getTreeValue(e, t);
  }
  // Algorithm helpers
  calculateLength(e) {
    return e.length < 2 ? 0 : fx.length(this.getTreeValue(e, 0), this.getTreeValue(e, 1));
  }
  calculateDistance(e) {
    return e.length < 4 ? 0 : fx.distance(
      this.getTreeValue(e, 0),
      this.getTreeValue(e, 1),
      this.getTreeValue(e, 2),
      this.getTreeValue(e, 3)
    );
  }
  calculateDot(e) {
    return e.length < 4 ? 0 : fx.dot(
      this.getTreeValue(e, 0),
      this.getTreeValue(e, 1),
      this.getTreeValue(e, 2),
      this.getTreeValue(e, 3)
    );
  }
  calculateCross(e) {
    return e.length < 4 ? 0 : fx.cross(
      this.getTreeValue(e, 0),
      this.getTreeValue(e, 1),
      this.getTreeValue(e, 2),
      this.getTreeValue(e, 3)
    );
  }
  calculateMix(e) {
    return e.length < 3 ? 0 : fx.mix(
      this.getTreeValue(e, 0),
      this.getTreeValue(e, 1),
      this.getTreeValue(e, 2)
    );
  }
  // Game formula helpers
  battleFormula(e) {
    if (e.length < 3)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2);
    return t * i * (1 - 1 / (1 + t * i / (5 * r)));
  }
  /**
   * 人物生命值公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，需要4个节点 [基础生命, 等级, 系数A, 系数B]
   * @returns {number} 计算后的人物生命值
   * @description 人物生命值计算公式：生命值 = 基础生命 + 系数A × 等级 + 系数B × (1 + 等级) × 等级 / 2
   * 这是一个二次增长的生命值公式，等级越高生命值增长越快，适用于RPG游戏
   */
  characterHealth(e) {
    if (e.length < 4)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2), s = this.getTreeValue(e, 3);
    return t + i * r + s * (1 + r) * r / 2;
  }
  /**
   * 近战物理攻击力公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，需要5个节点 [力量, 灵巧, 幸运, 等级, 职业攻击系数]
   * @returns {number} 计算后的近战物理攻击力
   * @description 近战攻击力计算公式：攻击力 = 力量×2 + (力量/10)² + 灵巧/5 + 幸运/5 + 职业系数×等级
   * 力量是主要属性，有线性增长和二次增长两部分，其他属性提供辅助加成
   */
  meleeAttack(e) {
    if (e.length < 5)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2), s = this.getTreeValue(e, 3), l = this.getTreeValue(e, 4);
    return t * 2 + Math.pow(t / 10, 2) + r / 5 + i / 5 + l * s;
  }
  /**
   * 远程物理攻击力公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，需要5个节点 [灵巧, 力量, 幸运, 等级, 职业攻击系数]
   * @returns {number} 计算后的远程物理攻击力
   * @description 远程攻击力计算公式：攻击力 = 灵巧×2 + (灵巧/10)² + 力量/5 + 幸运/5 + 职业系数×等级
   * 灵巧是主要属性，有线性增长和二次增长两部分，力量提供辅助加成
   */
  rangedAttack(e) {
    if (e.length < 5)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2), s = this.getTreeValue(e, 3), l = this.getTreeValue(e, 4);
    return t * 2 + Math.pow(t / 10, 2) + r / 5 + i / 5 + l * s;
  }
  /**
   * 法师物理攻击力公式
   *
   * @private
   * @param {BasicBody[]} tree - 子节点数组，需要1个节点 [力量]
   * @returns {number} 计算后的法师物理攻击力
   * @description 法师攻击力计算公式：攻击力 = 力量×2 + (力量/10)²
   * 法师的物理攻击力主要依赖力量属性，有线性增长和二次增长两部分
   */
  mageAttack(e) {
    if (e.length < 1)
      return 0;
    const t = this.getTreeValue(e, 0);
    return t * 2 + Math.pow(t / 10, 2);
  }
  physicalDefense(e) {
    return this.value;
  }
  magicDefense(e) {
    return this.value;
  }
  hitRate(e) {
    return e.length < 2 ? 0 : this.getTreeValue(e, 0) + this.getTreeValue(e, 1);
  }
  dodgeRate(e) {
    return e.length < 2 ? 0 : this.getTreeValue(e, 0) + this.getTreeValue(e, 1);
  }
  jobPointGrowth(e) {
    return e.length < 2 ? 0 : 1 + this.getTreeValue(e, 0) / this.getTreeValue(e, 1);
  }
  finalMeleeAttack(e) {
    if (e.length < 8)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2), s = this.getTreeValue(e, 3), l = this.getTreeValue(e, 4), o = this.getTreeValue(e, 5), u = this.getTreeValue(e, 6), h = this.getTreeValue(e, 7);
    return (t * 7 + t / 5 + r / 5 + i / 5 + s + (s + l) * o) * u * h;
  }
  finalRangedAttack(e) {
    if (e.length < 8)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2), s = this.getTreeValue(e, 3), l = this.getTreeValue(e, 4), o = this.getTreeValue(e, 5), u = this.getTreeValue(e, 6), h = this.getTreeValue(e, 7);
    return (t * 5 + t / 5 + r / 5 + i / 5 + s + (s + l) * o) * u * h;
  }
  finalMagicAttack(e) {
    if (e.length < 6)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1), i = this.getTreeValue(e, 2), s = this.getTreeValue(e, 3), l = this.getTreeValue(e, 4), o = this.getTreeValue(e, 5);
    return (t * 7 + t / 5 + r + (r + i) * s) * l * o;
  }
  physicalDamage(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return t * (4e3 + r) / (4e3 + r * 10);
  }
  magicDamage(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return t * (1e3 + r) / (1e3 + r * 10);
  }
  hitChance(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return (t - r + 80) / 100;
  }
  critChance(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return (t - r) / 100;
  }
  growthFormula(e) {
    if (e.length < 2)
      return 0;
    const t = this.getTreeValue(e, 0), r = this.getTreeValue(e, 1);
    return (t - 1) * r;
  }
  /**
   * 获取公式文本值主体
   *
   * @returns {string} 格式化的公式文本字符串
   * @description 根据当前节点的函数类型，生成相应的公式文本表示
   * 支持各种数学函数、逻辑函数和游戏公式的文本格式化
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * body.funcType = CommonFunctionTypes.max;
   * body.formulaTextValue = "10,20,30";
   *
   * console.log(body.getFormulaTextValueBody()); // "max(10,20,30)"
   * ```
   */
  getFormulaTextValueBody() {
    const t = this.getFormulaTextBuilders()[this.funcType];
    return t ? t(this.formulaTextValue, this.tree) : this.formulaTextValue;
  }
  /**
   * 获取公式文本构建器映射
   *
   * @private
   * @returns {Record<number, (text: string, tree: BasicBody[]) => string>} 函数类型到文本构建函数的映射
   * @description 返回所有支持的函数类型及其对应的公式文本构建函数
   * 用于将计算结果转换为可读的公式文本表示
   */
  getFormulaTextBuilders() {
    return {
      0: (e) => e,
      // HandleFunctionTypes
      1: (e) => `(1-(${e}))`,
      2: (e) => `1/(${e})`,
      3: (e) => `-(${e})`,
      15: (e) => `(${e})*2`,
      16: (e) => `(${e})/2`,
      17: (e) => `(${e})*100`,
      18: (e) => `(${e})/100`,
      19: (e) => `(${e})*(${e})`,
      // CommonFunctionTypes
      4: (e) => `abs(${e})`,
      5: (e) => `random()*(${e})`,
      6: (e) => `floor(${e})`,
      7: (e) => `sqrt(${e})`,
      8: (e, t) => this.buildMaxText(t),
      9: (e, t) => this.buildMinText(t),
      11: (e, t) => this.buildPowerText(t),
      12: (e) => `log(${e})`,
      13: (e) => `exp(${e})`,
      14: (e) => `cbrt(${e})`,
      52: (e) => `sign(${e})`,
      53: (e) => `imul(${e})`,
      54: (e) => `ceil(${e})`,
      55: (e) => `round(${e})`,
      // Complex formulas handled separately
      10: (e, t) => this.buildRandomRangeText(t),
      20: (e, t) => this.buildDivisionText(t),
      21: (e, t) => this.buildDivisionSumText(t),
      22: (e, t) => this.buildDivisionDiffText(t),
      23: (e, t) => this.buildWeightedText(t),
      // Add all other formula types...
      24: (e, t) => this.buildAttackDefenseText(t, "-"),
      25: (e, t) => this.buildComplexAttackText(t, 1),
      26: (e, t) => this.buildComplexAttackText(t, 2),
      27: (e, t) => this.buildComplexAttackText(t, 3),
      28: (e, t) => this.buildAttackDefenseText(t, "/"),
      // Trigonometric
      36: (e) => `(${e})*PI`,
      37: (e) => `cos(${e})`,
      38: (e) => `sin(${e})`,
      39: (e) => `tan(${e})`,
      40: (e) => `acos(${e})`,
      41: (e) => `asin(${e})`,
      42: (e) => `atan(${e})`,
      43: (e, t) => this.buildAtan2Text(t),
      // Logic functions
      44: (e, t) => this.buildIfText(t, ">"),
      45: (e, t) => this.buildIfText(t, ">="),
      46: (e, t) => this.buildIfText(t, "<"),
      47: (e, t) => this.buildIfText(t, "<="),
      48: (e, t) => this.buildIfText(t, "=="),
      49: (e, t) => this.buildIfText(t, "!="),
      50: (e, t) => this.buildForLoopText(t),
      51: (e, t) => this.buildArrayAccessText(t),
      // Algorithm functions
      56: (e, t) => this.buildAlgorithmText(t, "length"),
      57: (e, t) => this.buildAlgorithmText(t, "distance"),
      58: (e, t) => this.buildAlgorithmText(t, "dot"),
      59: (e, t) => this.buildAlgorithmText(t, "cross"),
      60: (e, t) => this.buildMixText(t),
      // Game formulas
      61: (e, t) => this.buildBattleFormulaText(t),
      62: (e, t) => this.buildCharacterHealthText(t),
      63: (e, t) => this.buildMeleeAttackText(t),
      64: (e, t) => this.buildRangedAttackText(t),
      65: (e, t) => this.buildMageAttackText(t),
      76: (e, t) => this.buildPhysicalDamageText(t),
      77: (e, t) => this.buildMagicDamageText(t),
      78: (e, t) => this.buildHitChanceText(t),
      79: (e, t) => this.buildCritChanceText(t),
      80: (e, t) => this.buildGrowthText(t)
    };
  }
  // Helper methods for formula text building
  buildMaxText(e) {
    return `max(${e.map((r) => r.getFormulaTextValue()).join(",")})`;
  }
  buildMinText(e) {
    return `min(${e.map((r) => r.getFormulaTextValue()).join(",")})`;
  }
  buildPowerText(e) {
    return e.length < 2 ? "参数不匹配,请输入[值,值]" : `pow(${e[0].getFormulaTextValue()},${e[1].getFormulaTextValue()})`;
  }
  buildRandomRangeText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[最小值,最大值]";
    const t = e[0].getFormulaTextValue();
    return `random()*(${e[1].getFormulaTextValue()}-${t})+${t}`;
  }
  buildDivisionText(e) {
    return e.length < 2 ? "参数不匹配,请输入[值,值]" : `(${e[0].getFormulaTextValue()})/(${e[1].getFormulaTextValue()})`;
  }
  buildDivisionSumText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[值,值]";
    const t = e[0].getFormulaTextValue(), r = e[1].getFormulaTextValue();
    return `${t}/(${t}+${r})`;
  }
  buildDivisionDiffText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[值,值]";
    const t = e[0].getFormulaTextValue(), r = e[1].getFormulaTextValue();
    return `${t}/(${r}-${t})`;
  }
  buildWeightedText(e) {
    if (e.length % 2 !== 0)
      return "参数不匹配,请输入[值,权重]";
    const t = [];
    for (let r = 0; r < e.length; r += 2)
      t.push(
        `[值:${e[r].getFormulaTextValue()},权重:${e[r + 1].getFormulaTextValue()}]`
      );
    return t.join(",");
  }
  buildAttackDefenseText(e, t) {
    return e.length < 2 ? "参数不匹配,请输入[攻击,防御]" : `${e[0].getFormulaTextValue()}${t}${e[1].getFormulaTextValue()}`;
  }
  buildComplexAttackText(e, t) {
    if (e.length < 2)
      return "参数不匹配,请输入[攻击,防御]";
    const r = e[0].getFormulaTextValue(), i = e[1].getFormulaTextValue();
    switch (t) {
      case 1:
        return `${r}*${r}/(${r}+${i})`;
      case 2:
        return `(${r}-${i})*(${r}/${i})`;
      case 3:
        return `${r}*${r}/${i}`;
      default:
        return "";
    }
  }
  buildAtan2Text(e) {
    return e.length < 2 ? "参数不匹配,请输入[值,值]" : `atan2(${e[0].getFormulaTextValue()},${e[1].getFormulaTextValue()})`;
  }
  buildIfText(e, t) {
    if (e.length < 4)
      return "参数不匹配,请输入[值,值,值,值]";
    const [r, i, s, l] = e.map((o) => o.getFormulaTextValue());
    return `if(${r}${t}${i}){return ${s}}else{return ${l}}`;
  }
  buildForLoopText(e) {
    if (e.length < 4)
      return "参数不匹配,请输入[初始等级,当前等级,间隔值,初始值]";
    const [t, r, i, s] = e.map(
      (l) => l.getFormulaTextValue()
    );
    return `for(var i=${t};i<=${r};i++){if(i%${i}==1){a++}c+=a+${s}}`;
  }
  buildArrayAccessText(e) {
    return e.length < 2 ? "参数不匹配,请输入下标和数组" : `[${e[0].getFormulaTextValue()}]`;
  }
  buildAlgorithmText(e, t) {
    const r = t === "mix" ? 3 : 4, i = t === "mix" ? "[值1,值2,混合比例]" : "[x1,y1,x2,y2]";
    if (e.length < r)
      return `参数不匹配,请输入${i}`;
    const s = e.slice(0, r).map((l) => l.getFormulaTextValue()).join(",");
    return `${t}(${s})`;
  }
  buildMixText(e) {
    return e.length < 3 ? "参数不匹配,请输入[值1,值2,混合比例]" : `mix(${e.slice(0, 3).map((r) => r.getFormulaTextValue()).join(",")})`;
  }
  buildBattleFormulaText(e) {
    if (e.length < 3)
      return "参数不匹配,请输入[攻击,防御,技能系数]";
    const [t, r, i] = e.map((s) => s.getFormulaTextValue());
    return `${t}*${i}*(1-(1/(1+((${t}*${i})/(5*${r})))))`;
  }
  buildCharacterHealthText(e) {
    if (e.length < 4)
      return "参数不匹配,请输入[基础生命,等级,职业系数A,职业系数B]";
    const [t, r, i, s] = e.map(
      (l) => l.getFormulaTextValue()
    );
    return `${t}+${i}*${r}+${s}*(1+${r})*${r}/2`;
  }
  buildMeleeAttackText(e) {
    if (e.length < 5)
      return "参数不匹配,请输入[力量,灵巧,幸运,等级,职业攻击系数]";
    const [t, r, i, s, l] = e.map(
      (o) => o.getFormulaTextValue()
    );
    return `${t}*2+pow((${t}/10),2)+${r}/5+${i}/5+${l}*${s}`;
  }
  buildRangedAttackText(e) {
    if (e.length < 5)
      return "参数不匹配,请输入[灵巧,力量,幸运,等级,职业攻击系数]";
    const [t, r, i, s, l] = e.map(
      (o) => o.getFormulaTextValue()
    );
    return `${t}*2+pow((${t}/10),2)+${r}/5+${i}/5+${l}*${s}`;
  }
  buildMageAttackText(e) {
    if (e.length < 1)
      return "参数不匹配,请输入[力量]";
    const t = e[0].getFormulaTextValue();
    return `${t}*2+pow(${t}/10,2)`;
  }
  buildPhysicalDamageText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[物攻,物防]";
    const [t, r] = e.map((i) => i.getFormulaTextValue());
    return `${t}*(4000+${r})/(4000+(${r}*10))`;
  }
  buildMagicDamageText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[魔攻,魔防]";
    const [t, r] = e.map((i) => i.getFormulaTextValue());
    return `${t}*(1000+${r})/(1000+(${r}*10))`;
  }
  buildHitChanceText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[命中,闪避]";
    const [t, r] = e.map((i) => i.getFormulaTextValue());
    return `(${t}-${r}+80)/100`;
  }
  buildCritChanceText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[暴击,抗暴]";
    const [t, r] = e.map((i) => i.getFormulaTextValue());
    return `(${t}-${r})/100`;
  }
  buildGrowthText(e) {
    if (e.length < 2)
      return "参数不匹配,请输入[等级,属性成长值]";
    const [t, r] = e.map((i) => i.getFormulaTextValue());
    return `(${t}-1)*${r}`;
  }
  /**
   * 获取公式文本值
   *
   * @returns {string} 完整的公式文本字符串
   * @description 获取当前节点及其子节点组成的完整公式文本表示
   * 这是对外提供的主要接口，用于获取可读的公式字符串
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * body.funcType = CommonFunctionTypes.add;
   *
   * const child1 = new BasicBody();
   * child1.value = 10;
   * const child2 = new BasicBody();
   * child2.value = 20;
   *
   * body.addBody(child1);
   * body.addBody(child2);
   *
   * console.log(body.getFormulaTextValue()); // "10+20"
   * ```
   */
  getFormulaTextValue() {
    return this.getFormulaTextValueBody();
  }
  /**
   * 获取公式文本字符主体
   *
   * @returns {string} 公式的字符表示
   * @description 获取当前节点的公式字符表示，通常用于显示变量名或占位符
   * 与 getFormulaTextValueBody 类似，但返回的是字符表示而非数值
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * body.formulaTextCharacter = "A + B";
   *
   * console.log(body.getFormulaTextCharacterBody()); // "A + B"
   * ```
   */
  getFormulaTextCharacterBody() {
    return this.formulaTextCharacter;
  }
  /**
   * 获取公式文本字符
   *
   * @returns {string} 完整的公式字符字符串
   * @description 获取当前节点及其子节点组成的完整公式字符表示
   * 用于显示公式的结构和变量名，便于用户理解和调试
   *
   * @example
   * ```typescript
   * const body = new BasicBody();
   * body.funcType = CommonFunctionTypes.add;
   *
   * const child1 = new BasicBody();
   * child1.formulaTextCharacter = "A";
   * const child2 = new BasicBody();
   * child2.formulaTextCharacter = "B";
   *
   * body.addBody(child1);
   * body.addBody(child2);
   *
   * console.log(body.getFormulaTextCharacter()); // "A+B"
   * ```
   */
  getFormulaTextCharacter() {
    return this.getFormulaTextCharacterBody();
  }
}, SymbolBody = class extends BasicBody {
  /**
   * 构造函数
   * 初始化符号体数据模型实例
   */
  constructor() {
    super();
    /** 运算符 */
    n(this, "operator", null);
    /** 节点类型标识 */
    n(this, "type", "SymbolBody");
    /** 是否为函数标识 */
    n(this, "isFunctionId", 1);
    /** 函数类型 */
    n(this, "funcType", 0);
    /** 构造函数名称 */
    n(this, "constructorName", "SymbolBody");
  }
  /**
   * 复制符号体实例
   * 创建当前符号体的深拷贝
   * @returns 复制后的符号体实例
   */
  copy() {
    var t = new fx.SymbolBody();
    return t.operator = this.operator, t.isFunctionId = this.isFunctionId, t.tree = this.tree, t.parent = this.parent, t.value = this.value, t.isWeight = this.isWeight, t.isBindingOperation = this.isBindingOperation, t.isBindingFormula = this.isBindingFormula, t.formulaTextValue = this.formulaTextValue, t.formulaTextCharacter = this.formulaTextCharacter, t.operationalLogicText = this.operationalLogicText, t.cacheElementValue = this.cacheElementValue, t;
  }
  /**
   * 设置函数ID
   * @param value 函数ID值
   */
  setFunctionId(t) {
    this.isFunctionId = t;
  }
  /**
   * 获取可执行宏编号
   * 自动递增函数ID，超出范围时重置为1
   * @returns 当前可执行的函数ID
   */
  getRunFunctionId() {
    var t = this.getFunctionLength();
    return this.isFunctionId++, this.isFunctionId > t && (this.isFunctionId = 1), this.isFunctionId;
  }
  /**
   * 获取可以执行宏总数
   * 统计树中所有函数节点的数量
   * @returns 函数节点总数
   */
  getFunctionLength() {
    for (var t = 0, r = 0; r < this.tree.length; r++)
      this.tree[r].isFunction && t++;
    return t;
  }
  /**
   * 获取可执行宏
   * 根据ID获取对应的函数节点
   * @param id 函数ID
   * @returns 对应的函数节点，如果不存在则返回null
   */
  getFunction(t) {
    for (var r = 0, i = 0; i < this.tree.length; i++)
      if (this.tree[i].isFunction && (r++, r == t))
        return this.tree[i];
    return null;
  }
  /**
   * 获取符号体的值
   * 根据运算符类型和函数状态计算并返回值
   * @returns 计算后的值
   */
  getValue() {
    if ((this.operator == "fx" || this.operator == "=") && this.getFunctionLength() > 0) {
      const r = this.getFunction(this.isFunctionId);
      return r ? this.value = this.returnFunc(
        getCatchValue(r)
      ) : this.value = null, this.value;
    } else {
      this.value = null, this.operationalLogicText = "";
      for (var t = 0; t < this.tree.length; t++)
        t < this.tree.length - 1 ? this.operationalLogicText += Number(getCatchValue(this.tree[t])) + (this.operator || "") : this.operationalLogicText += "(" + Number(getCatchValue(this.tree[t])) + ")";
      this.value = fx.eval(this.operationalLogicText);
    }
    return isNaN(this.value) ? (this.value = this.returnFunc(this.value), this.value) : (this.value = this.returnFunc(Number(this.value)), this.value);
  }
  /**
   * 获取公式文本字符
   * 根据运算符和函数状态生成公式的字符表示
   * @returns 公式的字符表示
   */
  getFormulaTextCharacter() {
    if (this.operator == "=" && this.getFunctionLength() > 0) {
      const s = this.getFunction(this.isFunctionId);
      s ? this.formulaTextCharacter = "(" + s.getFormulaTextCharacter() + ")" : this.formulaTextCharacter = "";
    } else {
      this.formulaTextCharacter = "";
      for (var t = 0; t < this.tree.length; t++)
        if (t < this.tree.length - 1)
          this.formulaTextCharacter += "(" + this.tree[t].getFormulaTextCharacter() + ")" + (this.operator || "");
        else {
          var r = this.tree[t].getFormulaTextCharacter();
          r.indexOf("+") == -1 && r.indexOf("-") == -1 && r.indexOf("*") == -1 && r.indexOf("/") == -1 && r.indexOf("%") == -1 && r.indexOf(">") == -1 && r.indexOf(">=") == -1 && r.indexOf("<") == -1 && r.indexOf("<=") == -1 && r.indexOf("==") == -1 ? this.formulaTextCharacter += r : this.formulaTextCharacter += "(" + r + ")";
        }
    }
    var i = this.formulaTextCharacter;
    return this.funcType != 0 && (i = this.getFormulaTextCharacterBody()), i;
  }
  /**
   * 获取公式文本值
   * 根据函数类型和运算符状态生成公式的值表示
   * @returns 公式的值表示
   */
  getFormulaTextValue() {
    if (this.funcType == 0) {
      if (this.operator == "=" && this.getFunctionLength() > 0) {
        const i = this.getFunction(this.isFunctionId);
        i ? this.formulaTextValue = "(" + i.getFormulaTextValue() + ")" : this.formulaTextValue = "";
      } else {
        this.formulaTextValue = "";
        for (var t = 0; t < this.tree.length; t++) {
          var r = this.tree[t].getFormulaTextValue();
          t < this.tree.length - 1 ? this.formulaTextValue += "(" + r + ")" + (this.operator || "") : r.indexOf("+") == -1 && r.indexOf("-") == -1 && r.indexOf("*") == -1 && r.indexOf("/") == -1 && r.indexOf("%") == -1 && r.indexOf(">") == -1 && r.indexOf(">=") == -1 && r.indexOf("<") == -1 && r.indexOf("<=") == -1 && r.indexOf("==") == -1 ? this.formulaTextValue += r : this.formulaTextValue += "(" + r + ")";
        }
      }
      return this.formulaTextValue;
    } else
      return this.getFormulaTextValueBody();
  }
  /**
   * 浅度销毁
   * 清理所有子节点的引用
   */
  dispose() {
    for (var t = 0; t < this.tree.length; t++)
      this.tree[t].dispose();
  }
}, OperationBody = class extends BasicBody {
  /**
   * 构造函数
   * 初始化运算体数据模型实例
   */
  constructor() {
    super();
    /** 节点类型标识 */
    n(this, "type", "OperationBody");
    /** 构造函数名称 */
    n(this, "constructorName", "OperationBody");
    /** 是否为函数标识 */
    n(this, "isFunction", !1);
  }
}, FormulaData = class {
  /**
   * 创建公式数据实例
   * 
   * @constructor
   * @param {string} name - 公式名称
   * @param {number} x - X 坐标位置
   * @param {number} y - Y 坐标位置
   * @description 初始化公式对象，自动注册到系统缓存中并分配唯一ID
   */
  constructor(e, t, r) {
    /** 公式的名称 */
    n(this, "name");
    /** 公式的 X 坐标位置 */
    n(this, "x");
    /** 公式的 Y 坐标位置 */
    n(this, "y");
    /** 公式的主体数据对象 */
    n(this, "body", null);
    /** 公式的类型标识，固定为 "Formula" */
    n(this, "type", "Formula");
    /** 缓存目标存储池，用于存储公式实例 */
    n(this, "cacheTargetStoragePool", null);
    /** 缓存目标文件夹，用于组织公式实例 */
    n(this, "cacheTargetFolder", null);
    /** 构造器名称，用于标识类名 */
    n(this, "constructorName", "FormulaData");
    /** 公式的唯一标识符 */
    n(this, "id", 0);
    this.name = e, this.x = t, this.y = r, this.cacheTargetStoragePool = fx.targetStoragePool, this.cacheTargetFolder = fx.targetFolder.formulaTree, this.cacheTargetStoragePool.push(this), this.cacheTargetFolder.push(this), this.id = ++EventManager.IDINDEX;
  }
  /**
   * 获取公式的当前值
   * 
   * @method getValue
   * @returns {number} 公式的数值结果，如果主体为空则返回 0
   * @description 通过主体对象计算并返回公式的值，使用缓存值获取函数
   */
  getValue() {
    return this.body != null ? getCatchValue(this.body) : 0;
  }
  /**
   * 销毁公式实例并清理缓存
   * 
   * @method dispose
   * @returns {void}
   * @description 从存储池和文件夹中移除当前公式实例，执行浅度销毁操作
   */
  dispose() {
    let e = this.cacheTargetStoragePool.indexOf(this);
    e >= 0 && this.cacheTargetStoragePool.splice(e, 1), e = this.cacheTargetFolder.indexOf(this), this.cacheTargetFolder.splice(e, 1);
  }
}, Player = class {
  /**
   * 构造函数 - 初始化玩家对象
   * 设置所有默认属性值并注册事件监听器
   */
  constructor() {
    /** 玩家名称 */
    n(this, "name", "");
    /** 当前生命值 */
    n(this, "hp", 0);
    /** 最大生命值 */
    n(this, "maxHp", 0);
    /** 最大护盾值 */
    n(this, "maxShield", 0);
    /** 当前护盾值 */
    n(this, "shield", 0);
    /** 敌对实体引用 */
    n(this, "enemyBody", null);
    /** 战斗池 - 存储战斗相关对象 */
    n(this, "battlePool", []);
    /** 变量列表 - 存储玩家变量数据 */
    n(this, "valist", []);
    /** 生命列表 - 存储生命相关数据 */
    n(this, "lflist", []);
    /** 血条列表 - 存储血条显示相关数据 */
    n(this, "brlist", []);
    /** 实例化对象引用 */
    n(this, "instantiation", null);
    /** 玩家数据文件夹 */
    n(this, "playerData", null);
    /** 数据存储文件夹 */
    n(this, "folder", null);
    /** 最大HP公式名称 */
    n(this, "comboxMaxHp", "未设置血量公式");
    /** 攻击公式名称 */
    n(this, "combBoxAttack", "未设置攻击公式");
    /** 受攻击时触发的公式名称 */
    n(this, "underAttackName", "");
    /** 护盾破裂时触发的公式名称 */
    n(this, "shieldRuptureName", "");
    /** 是否已检测护盾破裂 */
    n(this, "isShieldDetection", !1);
    /** 死亡时触发的公式名称 */
    n(this, "dieName", "");
    /** 玩家是否已死亡 */
    n(this, "isDie", !1);
    /** 延迟执行的自定义属性列表 */
    n(this, "delayCustomList", []);
    /** 通信调用中心 */
    n(this, "callCenter", null);
    /** 玩家标签数组 - 用于标记玩家状态 */
    n(this, "tagArray", []);
    /** 玩家唯一标识ID */
    n(this, "id", 0);
    /** 构造器名称 */
    n(this, "constructorName", "Player");
    /** 攻击次数统计 */
    n(this, "attackNum", 0);
    /** 当前等级 */
    n(this, "level", 1);
    /** 等级变量名称 */
    n(this, "levelVar", "");
    /** 最大等级上限 */
    n(this, "maxLEvel", 100);
    /** 当前经验值 */
    n(this, "exp", 0);
    /** 经验值变量名称 */
    n(this, "expName", "");
    /** 升级配置对象 */
    n(this, "levelUpConfig", {});
    /** 参数信息数组 - 用于存储角色的参数配置信息 */
    n(this, "parameterInfoArray", []);
    this.name = "", this.hp = 0, this.maxHp = 0, this.maxShield = 0, this.shield = 0, this.enemyBody = null, this.level = 1, this.levelVar = "", this.battlePool = [], this.valist = [], this.lflist = [], this.brlist = [], this.instantiation = null, this.playerData = null, this.updatePlayerData(), this.comboxMaxHp = "未设置血量公式", this.combBoxAttack = "未设置攻击公式", this.underAttackName = "", this.shieldRuptureName = "", this.isShieldDetection = !1, this.dieName = "", this.isDie = !1, this.delayCustomList = [], this.callCenter = new CallCenter(), this.callCenter.addEventListener(
      EventManager.UP_DATA_PLAYER,
      this.upDataPlayerFunction,
      null,
      this
    ), this.tagArray = [], this.id = ++EventManager.IDINDEX, this.constructorName = "Player", this.attackNum = 0;
  }
  /**
   * 重置所有标签
   * 清空玩家的标签数组
   */
  resetTag() {
    this.tagArray = [];
  }
  /**
   * 获取指定名称标签的数量
   * @param name - 标签名称
   * @returns 该标签在标签数组中出现的次数
   */
  gesetTagPopulation(e) {
    let t = 0;
    for (let r = 0; r < this.tagArray.length; r++)
      this.tagArray[r].name == e && t++;
    return t;
  }
  /**
   * 获取所有标签
   * @returns 包含所有标签的数组
   */
  gesetTagAll() {
    return this.tagArray;
  }
  /**
   * 添加标签
   * @param name - 要添加的标签名称
   */
  addTag(e) {
    this.tagArray.push({ name: e });
  }
  /**
   * 更新玩家数据的事件处理函数
   * @param e - 事件对象
   */
  upDataPlayerFunction(e) {
    this.updatePlayerData();
  }
  /**
   * 更新玩家数据
   * 重置攻击次数并重新创建玩家数据
   */
  updatePlayerData() {
    fx.player = this, this.attackNum = 0, this.playerData = this.createPlayer();
  }
  /**
   * 递归更新数据
   * 遍历树结构，更新变量值和敌对实体引用
   * @param tree - 数据树结构数组
   * @param target - 目标对象
   */
  recursionSet(e, t) {
    fx.player = this;
    for (let r = 0; r < e.length; r++)
      e[r] instanceof VariableValue ? e[r].enemyFlag && (t == null ? e[r].setEnemyBody(null) : e[r].setEnemyBody(
        t.getPropertyObject(e[r].source.absoluteAddress)
      )) : this.recursionSet(e[r].tree, t);
  }
  /**
   * 获取公式执行结果
   * 根据公式名称计算并返回公式的值
   * @param name - 公式名称
   * @returns 公式计算结果
   */
  getFormula(e) {
    fx.player = this, fx.clearCacheRecursion(this.folder);
    let t = 0;
    for (let r = 0; r < this.playerData.formulaTree.length; r++)
      if (this.playerData.formulaTree[r].name == e) {
        t = this.playerData.formulaTree[r].body.getValue();
        break;
      }
    for (let r = 0; r < fx.stageStoragePool.length; r++)
      fx.stageStoragePool[r] instanceof FormulaData && fx.stageStoragePool[r].name == e && (t = fx.stageStoragePool[r].body.getValue());
    return t;
  }
  /**
   * 设置延迟执行
   * 实现基于次数的延迟执行机制
   * @param name - 延迟标识名称
   * @param value - 触发次数阈值
   * @param value2 - 最大执行次数
   * @param fun - 延迟执行的回调函数
   */
  delay(e, t, r, i) {
    const s = e + "次数";
    this["" + e] == null && (this["" + e] = 0, this.delayCustomList.push("" + e)), this["" + s] == null && (this["" + s] = 0, this.delayCustomList.push("" + s)), this["" + e]++, this["" + e] >= t && Number(this["" + s]) <= Number(r) + 1 && (this["" + e] = 0, this["" + s]++, i());
  }
  /**
   * 手动攻击
   * 触发实例化对象的攻击行为
   * @param name - 攻击名称
   * @param delay - 延迟时间
   * @param amount - 攻击次数
   */
  hit(e, t, r) {
    this.instantiation != null;
  }
  /**
   * 攻击目标
   * 根据公式名称对目标进行攻击，计算伤害并扣除生命值或护盾
   * @param name - 攻击公式名称
   * @param target - 攻击目标对象
   * @returns 包含伤害值和是否暴击的元组 [伤害值, 是否暴击]
   */
  attack(e, t) {
    this.attackNum++, fx.player = this, fx.clearCacheRecursion(this.folder), fx.isCrit = !1;
    let r = 0, i = 0;
    for (let s = 0; s < this.playerData.formulaTree.length; s++)
      if (this.playerData.formulaTree[s].name == e) {
        fx.enemyBody = t, this.enemyBody = t, r = this.playerData.formulaTree[s].body.getValue();
        let l = t.isDie;
        t.getShield() != 0 ? t.minusShield(r) : t.minusHp(r), !l && t.isDie && i++, fx.enemyBody = null;
        break;
      }
    for (let s = 0; s < fx.stageStoragePool.length; s++)
      if (fx.stageStoragePool[s] instanceof FormulaData && fx.stageStoragePool[s].name == e) {
        fx.enemyBody = t, this.enemyBody = t, r = fx.stageStoragePool[s].body.getValue();
        let l = t.isDie;
        t.getShield() != 0 ? t.minusShield(r) : t.minusHp(r), !l && t.isDie && i++, fx.enemyBody = null;
      }
    return i > 0 && this.onEnmeyKilled(i), [r, fx.isCrit];
  }
  /**
   * 获取升级所需经验值
   * @returns 升级所需的经验值
   */
  getNeedExp() {
    return 1;
  }
  /**
   * 击杀敌人回调
   * 增加经验值并检查是否升级
   * @param killEnemeNum - 击杀敌人的数量
   */
  onEnmeyKilled(e) {
    this.exp += e, this.checkUpdateLevel();
  }
  /**
   * 检查并更新等级
   * 如果经验值满足条件，则升级并触发升级事件
   */
  checkUpdateLevel() {
    let e = this.getNeedExp();
    this.exp >= e && this.level < this.maxLEvel && (this.level++, this.exp = 0, fx.Call.send(EventManager.PLAYER_INSTANCE_LEVEL_UP, [
      this.id,
      this.level,
      this.exp
    ]));
  }
  /**
   * 设置最大护盾值
   * 根据公式名称计算并设置最大护盾和当前护盾值
   * @param name - 护盾公式名称，传入"无"则设置为0
   * @returns 设置后的最大护盾值
   */
  setMaxShield(e) {
    fx.player = this, fx.clearCacheRecursion(this.folder), this.maxShield = 0, this.shield = 0;
    for (let t = 0; t < this.playerData.formulaTree.length; t++)
      if (this.playerData.formulaTree[t].name == e) {
        this.maxShield = this.playerData.formulaTree[t].body.getValue(), this.shield = this.maxShield;
        break;
      }
    for (let t = 0; t < fx.stageStoragePool.length; t++)
      fx.stageStoragePool[t] instanceof FormulaData && fx.stageStoragePool[t].name == e && (this.maxShield = fx.stageStoragePool[t].body.getValue(), this.shield = this.maxShield);
    return e == "无" && (this.maxShield = this.shield = 0), this.isShieldDetection = !1, this.maxShield;
  }
  /**
   * 设置最大生命值
   * 根据公式名称计算并设置最大生命值和当前生命值
   * @param name - 生命值公式名称，传入"无"则设置为0
   * @returns 设置后的最大生命值
   */
  setMaxHp(e) {
    fx.player = this, fx.clearCacheRecursion(this.folder), this.maxHp = 0, this.hp = 0;
    for (let t = 0; t < this.playerData.formulaTree.length; t++)
      if (this.playerData.formulaTree[t].name == e) {
        this.maxHp = this.playerData.formulaTree[t].body.getValue(), this.hp = this.maxHp;
        break;
      }
    for (let t = 0; t < fx.stageStoragePool.length; t++)
      fx.stageStoragePool[t] instanceof FormulaData && fx.stageStoragePool[t].name == e && (this.maxHp = fx.stageStoragePool[t].body.getValue(), this.hp = this.maxHp);
    e == "无" && (this.maxHp = this.hp = 0), this.isDie = !1;
    for (let t = 0; t < this.delayCustomList.length; t++)
      this[this.delayCustomList[t]] = null;
    return this.maxHp;
  }
  /**
   * 获取最大生命值
   * @returns 最大生命值
   */
  getMaxHp() {
    return this.maxHp;
  }
  /**
   * 获取最大护盾值
   * @returns 最大护盾值
   */
  getMaxShield() {
    return this.maxShield;
  }
  /**
   * 获取当前护盾值
   * @returns 当前护盾值
   */
  getShield() {
    return this.shield;
  }
  /**
   * 获取当前生命值
   * @returns 当前生命值
   */
  getHp() {
    return this.hp;
  }
  /**
   * 设置当前生命值
   * @param value - 要设置的生命值
   */
  setHp(e) {
    this.hp = e;
  }
  /**
   * 设置当前护盾值
   * @param value - 要设置的护盾值
   */
  setShield(e) {
    this.shield = e;
  }
  /**
   * 受到攻击时的处理
   * 触发受攻击公式
   */
  underAttack() {
    this.getFormula(this.underAttackName);
  }
  /**
   * 设置护盾破裂时触发的公式
   * @param name - 公式名称
   */
  setshieldRupture(e) {
    this.shieldRuptureName = e;
  }
  /**
   * 设置被攻击时触发的公式
   * @param name - 公式名称
   */
  setUnderAttack(e) {
    this.underAttackName = e;
  }
  /**
   * 护盾破裂时的处理
   * 触发护盾破裂公式并标记护盾已被检测
   */
  shieldRupture() {
    this.getFormula(this.shieldRuptureName), this.isShieldDetection = !0;
  }
  /**
   * 减少护盾值
   * 扣除护盾伤害，护盾归零时触发护盾破裂
   * @param damage - 伤害值
   * @returns 剩余护盾值
   */
  minusShield(e) {
    return this.shield -= e, this.shield <= 0 && this.isShieldDetection == !1 && (this.shield = 0, this.shieldRupture()), this.underAttack(), this.shield;
  }
  /**
   * 设置死亡时触发的公式
   * @param name - 公式名称
   */
  setDie(e) {
    this.dieName = e;
  }
  /**
   * 死亡处理
   * 触发死亡公式并标记玩家已死亡
   */
  die() {
    this.getFormula(this.dieName), this.isDie = !0;
  }
  /**
   * 减少生命值
   * 扣除生命值伤害，生命值归零时触发死亡
   * @param damage - 伤害值
   * @returns 剩余生命值
   */
  minusHp(e) {
    return this.hp -= e, this.hp <= 0 && this.isDie == !1 && (this.hp = 0, this.die()), this.underAttack(), this.hp;
  }
  /**
   * 获取属性看板
   * 递归获取玩家数据的属性看板列表
   * @returns 属性看板数组
   */
  getBillboard() {
    fx.player = this;
    const e = [];
    return fx.recursionGetBillboard(e, this.playerData), e.length == 0 ? fx.billBoardList : e;
  }
  /**
   * 获取属性对象
   * 根据绝对地址路径获取玩家数据中的属性对象
   * @param site - 属性的绝对地址路径
   * @param value - 可选的值参数
   * @returns 属性对象
   */
  getPropertyObject(e, t) {
    return fx.player = this, fx.getBody(
      this.playerData,
      fx.parseAbsoluteAddress(e),
      t
    );
  }
  /**
   * 设置属性值
   * 根据绝对地址路径设置玩家数据中的属性值
   * @param site - 属性的绝对地址路径
   * @param value - 要设置的值
   * @returns 设置后的值
   */
  setProperty(e, t) {
    fx.player = this;
    const r = this.getPropertyObject(e);
    return r != null ? r.setValue(t) : console.log("没有找到属性"), t;
  }
  /**
   * 获取属性值
   * 根据绝对地址路径获取玩家数据中的属性值
   * @param site - 属性的绝对地址路径
   * @param value - 可选的值参数
   * @returns 属性值
   */
  getProperty(e, t) {
    return fx.player = this, fx.clearCache(), this.getPropertyObject(e) != null ? fx.getBody(this.playerData, fx.parseAbsoluteAddress(e), t).getValue() : (console.log("没有找到属性"), 0);
  }
  /**
   * 销毁玩家对象
   * 释放所有引用和资源，清理内存
   */
  dispose() {
    this.callCenter.dispose(), this.playerData.dispose(), this.name = null, this.hp = null, this.maxHp = null, this.playerData = null, this.callCenter = null, this.tagArray = null, this.id = null, this.constructorName = null, this.attackNum = null;
  }
  /**
   * 清理运算缓存
   * 清除玩家数据文件夹中的缓存信息
   */
  clearCache() {
    fx.player = this, fx.clearCacheRecursion(this.folder);
  }
  /**
   * 创建玩家数据
   * 从场景文件夹复制数据并创建玩家的独立数据文件夹
   * @returns 玩家数据文件夹
   */
  createPlayer() {
    this.attackNum = 0, fx.editBody = null, fx.selectBody = null, fx.isBodyView = !1, this.folder = new fx.Folder();
    const e = [];
    fx.addLibraryBody(e, fx.targetFolder.tree);
    const t = e;
    return fx.targetFolder = this.folder, fx.createLibraryBody(t, !0), fx.parseLibraryBody(t, !0), fx.recursionSyncBody(fx.targetFolder.tree), fx.editBody = null, fx.selectBody = null, fx.targetStoragePool = fx.stageStoragePool, fx.targetFolder = fx.sceneFolder, fx.isBodyView = !0, this.valist = [], this.lflist = [], this.brlist = [], fx.recursiveDataReading(
      this.folder,
      this.valist,
      this.lflist,
      this.brlist
    ), this.folder;
  }
  /**
   * 恢复属性
   * 从变量列表中恢复所有属性的初始值
   */
  recoveryAttribute() {
    for (let e = 0; e < this.valist.length; e++)
      this.setProperty(
        this.valist[e].absoluteAddress,
        Number(this.valist[e].value)
      );
  }
  /**
   * 设置参数信息数组
   * @param parameterInfoArray 参数信息数组
   */
  setParameterInfoArray(e) {
    this.parameterInfoArray = e;
  }
  /**
   * 获取参数信息数组
   * @returns 参数信息数组
   */
  getParameterInfoArray() {
    return this.parameterInfoArray;
  }
  /**
   * 根据玩家名称查找参数信息
   * @param playerName 玩家名称
   * @returns 匹配的参数信息，如果未找到返回null
   */
  findParameterInfoByName(e) {
    return this.parameterInfoArray.find(
      (t) => t.parameterInfoname === e
    ) || null;
  }
  /**
   * 更新参数值
   * @param playerName 玩家名称
   * @param path 参数路径
   * @param value 新值
   * @returns 是否更新成功
   */
  updateParameterValue(e, t, r) {
    const i = this.findParameterInfoByName(e);
    if (!i)
      return !1;
    for (const s of i.parameterInfoArray)
      for (const l of s.parameter)
        if (l.path === t)
          return l.value = r, !0;
    return !1;
  }
  /**
   * 获取参数值
   * @param playerName 玩家名称
   * @param path 参数路径
   * @returns 参数值，如果未找到返回null
   */
  getParameterValue(e, t) {
    const r = this.findParameterInfoByName(e);
    if (!r)
      return null;
    for (const i of r.parameterInfoArray)
      for (const s of i.parameter)
        if (s.path === t)
          return s.value;
    return null;
  }
  /**
   * 改变玩家等级和职业
   * @param level 目标等级
   * @param occupation 职业类型
   */
  changeLevelAndOccupation(e, t, r = { levelPath: "等级", occupationPath: "职业" }) {
    const i = this.findParameterInfoByName(this.name);
    if (!i) {
      console.warn(`未找到玩家 "${this.name}" 的参数信息`);
      return;
    }
    for (const s of i.parameterInfoArray)
      for (const l of s.parameter)
        l.path === r.levelPath ? l.value = e : l.path === r.occupationPath && (l.value = t);
    this.level = e, this.gameManualOverrideParameter(i);
  }
  /**
   * 手动覆盖参数的辅助方法
   * 根据新的参数信息更新玩家的看板元数据
   * @param newParameterInfo 新的参数信息
   */
  gameManualOverrideParameter(e) {
    const t = this.getBillboard();
    e.parameterInfoArray.forEach((r) => {
      r && t.forEach((i) => {
        r.name === i.name && r.parameter.forEach((s) => {
          const l = s.path;
          i.metadataArray.forEach((o) => {
            const u = [];
            if (fx.getStepData(o.body.source, u), u.toString() === l) {
              const d = o.body.getValue(), c = Number(s.value);
              d !== c && o.body.setGlobalValue(c);
            }
          });
        });
      });
    });
  }
}, BillboardLayer = class {
  /**
   * 创建广告牌图层实例
   * @param name - 图层名称
   */
  constructor(e) {
    /** 图层名称 */
    n(this, "name", "");
    /** 运算层数组 */
    n(this, "operationArray", []);
    /** 元数据数组 */
    n(this, "metadataArray", []);
    /** 唯一标识符 */
    n(this, "id", 0);
    /** 是否被监控 */
    n(this, "monitored", !0);
    /** 构造函数名称 */
    n(this, "constructorName", "BillboardLayer");
    this.name = e, this.id = ++EventManager.IDINDEX;
  }
  /**
   * 释放资源，清理图层数据
   */
  dispose() {
    this.name = null, this.operationArray = null, this.metadataArray = null, this.monitored = null;
  }
  /**
   * 填充运算层数据
   * 从当前点击的运算层对象中获取数据并添加到运算层数组中
   */
  pushOperationLayer() {
    if (fx.clickBody != null && fx.clickBody.type == 5) {
      const e = new fx.OperationLayerData(fx.clickBody);
      this.operationArray.push(e);
    }
    fx.clickBody = null;
  }
  /**
   * 添加元数据
   * 从当前点击的变量值对象中创建元数据并添加到元数据数组中
   * @param type - 元数据类型
   * @param minValue - 最小值
   * @param maxValue - 最大值
   * @param intervalValue - 间隔值
   * @param list - 可选的元数据列表项数组
   */
  pushMetadata(e, t, r, i, s) {
    if (fx.clickBody != null && fx.clickBody instanceof fx.VariableValue && fx.clickBody.type != 5) {
      const l = new fx.MetadataData(fx.clickBody);
      l.type = e, l.presentValue = getCatchValue(l.body), l.minValue = t, l.maxValue = r, l.intervalValue = i, l.list = s && s.length ? s.map((o) => ({
        value: Number(o.value),
        name: o.name
      })) : [], this.metadataArray.push(l);
    }
    fx.clickBody = null;
  }
}, ChartsLayer = class {
  /**
   * 创建图表图层实例
   * @param name - 图层名称
   */
  constructor(e) {
    /** 图层名称 */
    n(this, "name");
    /** 运算层对象数组 */
    n(this, "operationArray", []);
    /** 元数据对象 */
    n(this, "metadata", null);
    /** 元数据数组 */
    n(this, "metadataArray", []);
    /** 初始单位值 */
    n(this, "minValue", 1);
    /** 最大行数值 */
    n(this, "maxValue", 1);
    /** 间隔行数值 */
    n(this, "intervalValue", 1);
    /** 构造函数名称 */
    n(this, "constructorName", "ChartsLayer");
    /** 唯一标识符 */
    n(this, "id");
    this.name = e, this.id = ++EventManager.IDINDEX;
  }
  /**
   * 添加元数据
   * 从当前点击的对象中复制元数据并设置到元数据数组中
   */
  addMetadataData() {
    fx.clickBody != null && (this.metadata = fx.clickBody.copy(), this.metadataArray[0] = this.metadata);
  }
  /**
   * 释放资源，清理图层数据
   */
  dispose() {
  }
}, Bookmark = class {
  // Consider specifying a type for 'bookmarkView' if possible
  /**
   * 创建书签实例
   * 
   * @constructor
   * @description 初始化书签对象，所有属性都有默认值
   */
  constructor() {
    /** 书签的唯一标识符 */
    n(this, "id", 0);
    /** 书签的 X 坐标位置 */
    n(this, "x", 0);
    /** 书签的 Y 坐标位置 */
    n(this, "y", 0);
    /** 书签的宽度，默认值为 512 */
    n(this, "width", 512);
    /** 书签的高度，默认值为 512 */
    n(this, "height", 512);
    /** 书签显示的文本内容，默认为"标签" */
    n(this, "text", "标签");
    /** 书签关联的视图对象 */
    n(this, "view", null);
    // Consider specifying a type for 'view' if possible
    /** 书签的类型标识，固定为 "Bookmark" */
    n(this, "type", "Bookmark");
    /** 书签视图对象 */
    n(this, "bookmarkView", null);
  }
}, MetadataData = class {
  /**
   * 创建元数据实例
   * 
   * @constructor
   * @param {any} body - 主体数据对象
   * @description 初始化元数据对象，复制主体数据作为副本
   */
  constructor(e) {
    /** 元数据的主体对象 */
    n(this, "body");
    /** 元数据关联的视图对象 */
    n(this, "view", null);
    /** 元数据的类型标识 */
    n(this, "type", 0);
    /** 元数据的当前值 */
    n(this, "presentValue", 0);
    /** 元数据的最小值 */
    n(this, "minValue", 0);
    /** 元数据的最大值 */
    n(this, "maxValue", 0);
    /** 元数据的间隔值 */
    n(this, "intervalValue", 0);
    /** 元数据的列表数据 */
    n(this, "list");
    this.body = e.copy();
  }
}, SheetData = class {
  /**
   * 创建表格数据实例
   * @param data - 原始数据对象
   */
  constructor(e) {
    /** 原始数据对象 */
    n(this, "originData");
    this.originData = e;
  }
  /**
   * 设置表格数据
   * @param data - 新的数据对象
   */
  setData(e) {
    this.originData = e;
  }
  /**
   * 获取单元格的值
   * 根据唯一信息定位到特定单元格并返回其值
   * 支持普通值、函数和公式的计算
   * @returns 返回单元格的值，如果无法获取则返回 0
   */
  getValue(e, t, r) {
    var d, c, f;
    if (!(this != null && this.originData) || typeof e > "u" || typeof t > "u" || typeof r > "u")
      return;
    const s = this.originData.sheets, l = s.find((g) => g.name === e), o = (d = l == null ? void 0 : l.data) == null ? void 0 : d.get(`${t},${r}`), u = o == null ? void 0 : o.cellData;
    let h = u == null ? void 0 : u.v;
    return u != null && u.type && (h = (c = o == null ? void 0 : o.source) != null && c.getValue ? (f = o.source) == null ? void 0 : f.getValue() : 0), u != null && u.f && (h = u != null && u.getValue ? u.getValue(s) : u.v), h || 0;
  }
}, OperationLayerData = class {
  /**
   * 创建运算层数据实例
   * @param body - 主体数据对象
   */
  constructor(e) {
    /** 主体数据对象 */
    n(this, "body");
    /** 视图对象 */
    n(this, "view", null);
    this.body = e.copy();
  }
}, Message = class {
  /**
   * 构造函数
   * 初始化消息对象
   */
  constructor() {
    /**
     * 用户数据，存储消息的具体内容
     */
    n(this, "userData", null);
    /**
     * 消息类型，标识消息的类别
     */
    n(this, "type", null);
  }
}, globalThis_ = /* @__PURE__ */ function() {
  return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
}();
globalThis_.target = null;
var A = class {
  /**
   * 测试方法
   */
  test() {
    try {
      console.log("console A");
    } catch (e) {
      console.error("Error in class A test:", e);
    }
  }
}, B = class extends A {
  constructor() {
    super();
  }
  /**
   * 重写测试方法
   */
  test() {
    try {
      console.log("console B");
    } catch (e) {
      console.error("Error in class B test:", e);
    }
  }
}, a, fx = (a = class {
  /**
   * 递归读取数据
   * 遍历对象树结构，分类收集不同类型的数据
   * @param obj 要遍历的对象
   * @param valist 变量列表
   * @param lflist 层列表
   * @param brlist 看板列表
   */
  static recursiveDataReading(t, r, i, s) {
    try {
      if (!t || !t.tree || !Array.isArray(t.tree))
        throw new Error("Invalid object structure for recursive reading");
      for (let l = 0; l < t.tree.length; l++) {
        const o = t.tree[l];
        o != null && (o.isFolder ? this.recursiveDataReading(o, r, i, s) : o.type == 1 ? r.push(o) : o.type == 5 ? i.push(o) : o instanceof a.BillboardLayer && s.push(o));
      }
    } catch (l) {
      console.error("Error in recursive data reading:", l);
    }
  }
}, /** 测试实例 */
n(a, "b", new B()), /** 代码执行状态 */
n(a, "code", !1), /**
 * 判断是否为数字
 * @param token 待检查的值
 * @returns 是否为有效数字
 */
n(a, "isNumber", function(t) {
  try {
    return !isNaN(Number(t)) && isFinite(Number(t));
  } catch (r) {
    return console.error("Error checking if value is number:", r), !1;
  }
}), /**
 * 混合公式 - 线性插值
 * @param v1 起始值
 * @param v2 结束值
 * @param v3 混合系数 (0-1)
 * @returns 混合结果
 */
n(a, "mix", function(t, r, i) {
  try {
    if (!a.isNumber(t) || !a.isNumber(r) || !a.isNumber(i))
      throw new Error("Invalid parameters for mix function");
    return t * (1 - i) + r * i;
  } catch (s) {
    return console.error("Error in mix function:", s), 0;
  }
}), /**
 * 计算向量的叉积
 * @param p1x 第一个向量的x分量
 * @param p1y 第一个向量的y分量
 * @param p2x 第二个向量的x分量
 * @param p2y 第二个向量的y分量
 * @returns 叉积结果
 */
n(a, "cross", function(t, r, i, s) {
  try {
    if (!a.isNumber(t) || !a.isNumber(r) || !a.isNumber(i) || !a.isNumber(s))
      throw new Error("Invalid parameters for cross function");
    return t * i - r * s;
  } catch (l) {
    return console.error("Error in cross function:", l), 0;
  }
}), /**
 * 计算向量的点积
 * @param p1x 第一个向量的x分量
 * @param p1y 第一个向量的y分量
 * @param p2x 第二个向量的x分量
 * @param p2y 第二个向量的y分量
 * @returns 点积结果
 */
n(a, "dot", function(t, r, i, s) {
  try {
    if (!a.isNumber(t) || !a.isNumber(r) || !a.isNumber(i) || !a.isNumber(s))
      throw new Error("Invalid parameters for dot function");
    return t * i + r * s;
  } catch (l) {
    return console.error("Error in dot function:", l), 0;
  }
}), /**
 * 计算两点之间的距离
 * @param p1x 第一个点的x坐标
 * @param p1y 第一个点的y坐标
 * @param p2x 第二个点的x坐标
 * @param p2y 第二个点的y坐标
 * @returns 距离值
 */
n(a, "distance", function(t, r, i, s) {
  try {
    if (!a.isNumber(t) || !a.isNumber(r) || !a.isNumber(i) || !a.isNumber(s))
      throw new Error("Invalid parameters for distance function");
    const l = Math.abs(t - i), o = Math.abs(r - s);
    return a.length(l, o);
  } catch (l) {
    return console.error("Error in distance function:", l), 0;
  }
}), /**
 * 计算向量的长度
 * @param a x分量
 * @param b y分量
 * @returns 向量长度
 */
n(a, "length", function(t, r) {
  try {
    if (!a.isNumber(t) || !a.isNumber(r))
      throw new Error("Invalid parameters for length function");
    return Math.sqrt(t * t + r * r);
  } catch (i) {
    return console.error("Error in length function:", i), 0;
  }
}), // ==================== 系统状态属性 ====================
/** 看板列表 */
n(a, "billBoardList", []), /** 函数添加索引 */
n(a, "functionAddIndex", 0), /** 视觉版本兼容性 */
n(a, "visualVersionCompatibility", !1), /** 单例实例 */
n(a, "singletonInstance", null), /** 系统启动状态 */
n(a, "isStart", !1), // ==================== 模块引用 ====================
/** 战斗中心模块 */
n(a, "FXCentre", FXCentre), /** 节点类型模块 */
n(a, "NodeType", NodeType), /** 文件夹模块 */
n(a, "Folder", Folder), /** 事件管理器模块 */
n(a, "Eve", EventManager), /** 调用中心模块 */
n(a, "CallCenter", CallCenter), /** 消息列表模块 */
n(a, "MessageList", MessageList), /** 变量值模块 */
n(a, "VariableValue", VariableValue), /** 调用模块 */
n(a, "Call", Call), /** 符号体模块 */
n(a, "SymbolBody", SymbolBody), /** 基础体模块 */
n(a, "BasicBody", BasicBody), /** 运算体模块 */
n(a, "OperationBody", OperationBody), /** 玩家模块 */
n(a, "Player", Player), /** 看板层模块 */
n(a, "BillboardLayer", BillboardLayer), /** 图表层模块 */
n(a, "ChartsLayer", ChartsLayer), /** 书签模块 */
n(a, "Bookmark", Bookmark), /** 公式数据模块 */
n(a, "FormulaData", FormulaData), /** 元数据模块 */
n(a, "MetadataData", MetadataData), /** 表格数据模块 */
n(a, "SheetData", SheetData), /** 运算层数据模块 */
n(a, "OperationLayerData", OperationLayerData), /** 消息模块 */
n(a, "Message", Message), /** 缓存控制 */
n(a, "noCache", !1), // ==================== 游戏状态属性 ====================
/** 敌对玩家数据 */
n(a, "enemyBody", null), /** 场景根目录文件夹 */
n(a, "sceneFolder", null), /** 当前选择文件夹 */
n(a, "targetFolder", null), /** 文件夹是否有重名 */
n(a, "isFolderDuplicationOfName", !1), /** 是否显示看板层 */
n(a, "isBillboardLayerView", !0), /** 是否显示运算体视图 */
n(a, "isBodyView", !0), /** 是否准备全局运算 */
n(a, "isGlobalOperations", !1), /**
 * 是否在拖拽运算体
 * @type {boolean}
 */
n(a, "isDragBody", !1), /**
 * 场景遮罩参数
 * @type {{}}
 */
n(a, "stageMaskValue", {}), /**
 * 场景顶级组
 * @type {null}
 */
n(a, "stageGroup", null), /**
 * 当前点击运算体(场景)
 * @type {null}
 */
n(a, "clickBody", null), /**
 * 当前选择运算体(场景)
 * @type {null}
 */
n(a, "selectCellBody", null), /**
 * 当前编辑运算体(文件)
 * @type {null}
 */
n(a, "editBody", null), /**
 * 当前选择运算体(文件)
 * @type {null}
 */
n(a, "selectBody", null), /**
 * 场景显示存储池
 * @type {*[]}
 */
n(a, "stageStoragePool", []), /**
 * 当前选择存储池
 * @type {*[]}
 */
n(a, "targetStoragePool", a.stageStoragePool), /**
 * 玩家实例对象
 * @type {null}
 */
n(a, "player", null), /**
 * 是否发生了暴击
 * @type {boolean}
 */
n(a, "isCrit", !1), // constructor() { }
// calculateArea() {
//   return this.width * this.height;
// }
// calculatePerimeter() {
//   return 2 * (this.width + this.height);
// }
/**
 *
 * @param 总数
 * @param 权重数组
 * @returns {*}
 */
n(a, "distribute", function(t, r) {
  const i = r.reduce((s, l) => s + l, 0);
  return r.map((s) => t * s / i);
}), /**
 *
 * @param 总数
 * @param 切割数
 * @param 指数
 * @param 取整类型
 * @param 低指数
 * @param 高指数
 * @returns {[]}
 */
n(a, "partitionCurve", function(t, r, i, s, l, o) {
  var u = [], h = [], d = l, c = o;
  d == null && (d = 0.382), c == null && (c = 0.618);
  for (var f = 0, g = 1; g <= r; g++) {
    var p = Math.pow(r, i), v = Math.pow(g, i), D = v / p, y = g * (1e4 * d) / r + D * (1e4 * c);
    u.push(y), f += y;
  }
  for (var m = 0; m < u.length; m++)
    if (s == null)
      h.push(
        u[m] / f * t
      );
    else
      switch (s) {
        case 0:
          h.push(
            u[m] / f * t
          );
          break;
        case 1:
          h.push(
            Math.floor(
              u[m] / f * t
            )
          );
          break;
        case 2:
          h.push(
            Math.floor(
              u[m] / f * t
            )
          );
          break;
      }
  return h;
}), n(a, "eval", function(t) {
  return a.evaluateExpression(t);
}), n(a, "recursionLibraryBody", function(t, r, i) {
  if (r.tree == null)
    return null;
  for (var s = 0; s < r.tree.length; s++) {
    if (r.tree[s].absoluteAddress == i) {
      t.push(r.tree[s]);
      return;
    }
    a.recursionLibraryBody(t, r.tree[s], i);
  }
  return null;
}), /**
 * 范围小数点后面几位
 * @param	value
 * @param	type
 * @return
 */
n(a, "double", function(t, r) {
  switch (r) {
    case 0:
      return Math.round(t * 1) / 1;
    case 1:
      return Math.round(t * 10) / 10;
    case 2:
      return Math.round(t * 100) / 100;
    case 3:
      return Math.round(t * 1e3) / 1e3;
    case 4:
      return Math.round(t * 1e4) / 1e4;
    case 5:
      return Math.round(t * 1e5) / 1e5;
    case 6:
      return Math.round(t * 1e6) / 1e6;
    case 7:
      return Math.round(t * 1e7) / 1e7;
  }
  return 0;
}), /**
 * 从库中获取元素
 * @param library
 * @param array
 * @param address
 */
n(a, "getLibraryBody", function(t, r, i) {
  for (var s = 0; s < r.length; s++) {
    if (r[s].absoluteAddress == null && (r[s].absoluteAddress = a.getAbsoluteAddress(r[s])), r[s].absoluteAddress == i) {
      t.push(r[s]);
      return;
    }
    r[s].isFolder && a.getLibraryBody(t, r[s].tree, i);
  }
}), n(a, "mapToJSON", function(t) {
  return t ? JSON.stringify(
    [...t].reduce((r, [i, s]) => {
      const l = { ...s }, o = l.source;
      if (o) {
        const u = a.createVarData(
          o.TID,
          o.name,
          o.value,
          o.type,
          o.macros,
          o.operator,
          o.enemyFlag,
          o.source,
          o.tag,
          o.statistics,
          o.upDateValue,
          o.demoteValue,
          o.funcType,
          // 逻辑块数据
          o.isLogicalOpen,
          o.isDragging,
          o.currentStep,
          o.snNo,
          o.minValue,
          o.maxValue,
          o.step,
          o.logicalChildArray,
          o.selectedOutputInfo
        );
        l.source = u;
      }
      return r[i] = l, r;
    }, {})
  ) : "{}";
}), /**
 * 递归添加库元素
 * @param saveArray
 * @param bodyArray
 */
n(a, "addLibraryBody", function(t, r) {
  var h;
  for (var i = 0; i < r.length; i++) {
    let d = r[i], c = (h = d.sheetData) == null ? void 0 : h.originData;
    if (c && (c = { ...c }, c.sheets = [
      ...c.sheets.map((f) => ({ ...f, data: a.mapToJSON(f.data) }))
    ]), d instanceof a.VariableValue) {
      var s = a.createOperationLayerData(
        d.name,
        d.type,
        d.value,
        d,
        d.tag,
        d.isSystemShow,
        d.sheetData ? JSON.stringify(c) : null,
        d.childCell
      );
      s.id = d.id, t.push(s), a.saveBody(
        s.operationArray,
        a.seekSource(d.childBodyArray)
      );
    }
    if (d instanceof a.Folder) {
      var s = a.createFolderData(
        d.name,
        d.isFolder,
        d
      );
      s.id = d.id, t.push(s), a.addLibraryBody(s.operationArray, d.tree);
    }
    if (a.isBillboardLayerView) {
      if (d instanceof a.BillboardLayer) {
        var s = a.createBillboarData(
          d.name,
          d,
          d.monitored
        );
        s.id = d.id, t.push(s);
        for (var l = 0; l < d.operationArray.length; l++) {
          let g = d.operationArray[l];
          var o = a.createOperationLayerData(
            g.body.name,
            g.body.type,
            g.body.value,
            g.body.source,
            g.body.tag,
            g.body.isSystemShow,
            null,
            null
          );
          o.id = g.body.id, s.operationArray.push(o);
        }
        for (var l = 0; l < d.metadataArray.length; l++) {
          const p = d.metadataArray[l];
          var u = a.createBillboarMetadataData(
            p.body.name,
            p.body.type,
            p.body.value,
            p.body.source,
            p
          );
          u.id = p.body.id, s.metadataArray.push(u);
        }
      }
      if (d instanceof a.ChartsLayer) {
        var s = a.createChartData(d);
        s.id = d.id, t.push(s);
      }
    }
  }
}), /**
 * 解析运算层库内容
 * @param data
 * @param init
 */
n(a, "parseLibraryBody", function(t, r) {
  for (var i = 0; i < t.length; i++) {
    const u = t[i];
    if (u.type == 5) {
      var s = [];
      a.getLibraryBody(s, a.targetFolder.tree, u.site), a.editBody = s[0], a.selectBody = a.editBody, a.targetStoragePool = a.editBody.childBodyArray, a.editBody.isSystemShow = u.isSystemShow, a.parseStageBody(u.operationArray);
    } else if (u.type == 0 || u.type == 1 || u.type == 2 || u.type == 3) {
      var s = [];
      a.getLibraryBody(s, a.targetFolder.tree, u.site), a.editBody = s[0], a.selectBody = a.editBody, a.targetStoragePool = a.stageStoragePool, a.parseStageBody(u.operationArray);
    } else if (u.isFile == !0) {
      var s = [];
      a.getLibraryBody(s, a.targetFolder.tree, u.site), a.editBody = s[0];
      for (var l = s[0], o = 0; o < u.operationArray.length; o++) {
        const d = u.operationArray[o];
        if (d.type == 5) {
          var s = [];
          a.getLibraryBody(
            s,
            a.targetFolder.tree,
            d.site
          ), a.editBody = s[0], a.selectBody = s[0], a.targetStoragePool = s[0].childBodyArray, a.parseStageBody(d.operationArray), a.editBody = l, a.editBody.isSystemShow = d.isSystemShow;
        } else d.isBoard == !0 ? (a.selectBody = a.editBody, d.index = o, a.Call.send(a.Eve.SHIFT_ADD_BOARD, d, null)) : d.isXlsx == !0 && (a.selectBody = a.editBody, d.index = o, a.Call.send(a.Eve.SHIFT_ADD_CHARTS, d, null));
        if (d.isFile == !0) {
          var s = [];
          a.getLibraryBody(
            s,
            a.targetFolder.tree,
            d.site
          ), a.editBody = s[0], a.parseLibraryBody(d.operationArray, !1);
        }
      }
      a.editBody = null;
    } else u.isBoard == !0 ? (a.selectBody = a.editBody, a.billBoardList.push(u), a.Call.send(a.Eve.SHIFT_ADD_BOARD, u, null)) : u.isXlsx == !0 && (a.selectBody = a.editBody, a.Call.send(a.Eve.SHIFT_ADD_CHARTS, u, null));
    r && (a.selectBody = null);
  }
}), /**
 * 创建运算体库
 * @param data
 * @param init
 */
n(a, "createLibraryBody", function(t, r, i, s) {
  for (var l = 0; l < t.length; l++) {
    const c = t[l];
    if (c.isFile == !0) {
      var o = new a.Folder(c.name);
      a.Call.send(a.Eve.CREATE_FILE_DATA, o, null), s != null ? (a.Call.send(a.Eve.ADD_DATABASE_DATA, [o, s], null), a.Call.send(
        a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
        [o, s],
        null
      )) : (a.Call.send(a.Eve.ADD_DATABASE_DATA, [o, a.selectBody], null), a.Call.send(
        a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
        [o, a.selectBody],
        null
      )), a.selectBody = o, a.selectBody.absoluteAddress = c.site;
      for (var u = 0; u < c.operationArray.length; u++) {
        const f = c.operationArray[u];
        if (f.type == 5)
          a.editBody = new a.VariableValue(f.name, null, 5), a.editBody.tag = f.name.tag, a.Call.send(a.Eve.CREATE_OPERATION_DATA, a.editBody, null), a.Call.send(
            a.Eve.ADD_DATABASE_DATA,
            [a.editBody, a.selectBody],
            null
          ), a.Call.send(
            a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
            [a.editBody, a.selectBody],
            null
          ), a.editBody.absoluteAddress = f.site, a.targetStoragePool = a.editBody.childBodyArray;
        else if (f.type == 0 || f.type == 1 || f.type == 2 || f.type == 3) {
          var h = f.name + "=" + f.value, d = new a.VariableValue(
            h.split("=")[0],
            h.split("=")[1],
            1
          );
          f.type == 1 && (d.isAI = i || !1), a.editBody = d, a.editBody.tag = f.tag, a.Call.send(a.Eve.CREATE_METADATE_DATA, d, null), a.Call.send(
            a.Eve.ADD_DATABASE_DATA,
            [a.editBody, a.selectBody],
            null
          ), a.Call.send(
            a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
            [a.editBody, a.selectBody],
            null
          ), a.editBody.absoluteAddress = f.site, a.targetStoragePool = a.editBody.childBodyArray;
        } else if (f.type == 11) {
          var h = f.name, d = new a.VariableValue(
            h.split("=")[0],
            void 0,
            f.type
          );
          d.selectedOutputInfo = f != null && f.selectedOutputInfo ? JSON.parse(f == null ? void 0 : f.selectedOutputInfo) : null;
          const v = typeof f.sheetData == "string" ? JSON.parse(f.sheetData) : f.sheetData;
          v != null && v.sheets && (v.sheets = v.sheets.map((D) => {
            const y = JSON.parse(D.data);
            return Object.values(y).forEach((m) => {
              if (m != null && m.source) {
                const V = m.source;
                var T = [];
                a.getLibraryBody(
                  T,
                  a.targetFolder.tree,
                  a.getAbsoluteAddress(V)
                );
                var b = T[0];
                m.source = b.copy();
              }
            }), {
              ...D,
              data: new Map(Object.entries(y))
            };
          })), d.setSheetData(v), d.childCell = f.childCell, a.editBody = d, a.editBody.tag = f.tag, a.Call.send(
            a.Eve.ADD_DATABASE_DATA,
            [a.editBody, a.selectBody],
            null
          ), a.Call.send(
            a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
            [a.editBody, a.selectBody],
            null
          ), a.editBody.absoluteAddress = f.site, a.targetStoragePool = a.editBody.childBodyArray;
        }
        if (f.isFile == !0) {
          var o = new a.Folder(f.name);
          a.Call.send(a.Eve.CREATE_FILE_DATA, o, null), a.Call.send(
            a.Eve.ADD_DATABASE_DATA,
            [o, a.selectBody],
            null
          ), a.Call.send(
            a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
            [o, a.selectBody],
            null
          ), a.selectBody = o, a.selectBody.absoluteAddress = f.site, a.createLibraryBody(
            f.operationArray,
            !1,
            !1,
            o
          ), a.selectBody = o.parentFolder;
        }
      }
      a.selectBody = o.parentFolder;
    }
    if (c.type == 5)
      a.editBody = new a.VariableValue(c.name, null, 5), a.editBody.tag = c.tag, a.editBody.isSystemShow = c.isSystemShow, a.Call.send(a.Eve.CREATE_OPERATION_DATA, a.editBody, null), a.Call.send(
        a.Eve.ADD_DATABASE_DATA,
        [a.editBody, a.selectBody],
        null
      ), a.Call.send(
        a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
        [a.editBody, a.selectBody],
        null
      ), a.editBody.absoluteAddress = c.site, a.targetStoragePool = a.editBody.childBodyArray;
    else if (c.type == 0 || c.type == 1 || c.type == 2 || c.type == 3) {
      var h = c.name + "=" + c.value, d = new a.VariableValue(
        h.split("=")[0],
        h.split("=")[1],
        1
      );
      c.type == 1 && (d.isAI = i || !1), a.editBody = d, a.editBody.tag = c.tag, a.Call.send(a.Eve.CREATE_METADATE_DATA, d, null), a.Call.send(
        a.Eve.ADD_DATABASE_DATA,
        [a.editBody, a.selectBody],
        null
      ), a.Call.send(
        a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
        [a.editBody, a.selectBody],
        null
      ), a.editBody.absoluteAddress = c.site, a.targetStoragePool = a.editBody.childBodyArray;
    } else if (c.type == 11) {
      var h = c.name, d = new a.VariableValue(
        h.split("=")[0],
        void 0,
        c.type
      );
      d.selectedOutputInfo = c != null && c.selectedOutputInfo ? JSON.parse(c == null ? void 0 : c.selectedOutputInfo) : null;
      const p = typeof c.sheetData == "string" ? JSON.parse(c.sheetData) : c.sheetData;
      p != null && p.sheets && (p.sheets = p.sheets.map((v) => {
        const D = JSON.parse(v.data);
        return Object.values(D).forEach((y) => {
          if (y != null && y.source) {
            const b = y.source;
            var m = [];
            a.getLibraryBody(
              m,
              a.targetFolder.tree,
              a.getAbsoluteAddress(b)
            );
            var T = m[0];
            y.source = T.copy();
          }
        }), {
          ...v,
          data: new Map(Object.entries(D))
        };
      })), d.setSheetData(p), d.childCell = c.childCell, a.editBody = d, a.editBody.tag = c.tag, a.Call.send(
        a.Eve.ADD_DATABASE_DATA,
        [a.editBody, a.selectBody],
        null
      ), a.Call.send(
        a.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES,
        [a.editBody, a.selectBody],
        null
      ), a.editBody.absoluteAddress = c.site, a.targetStoragePool = a.editBody.childBodyArray;
    }
    r && (a.selectBody = null);
  }
}), /**
 * 获取元素
 * @param folder
 * @param address
 * @returns {*}
 */
n(a, "getBody", function(t, r, i) {
  var s = [];
  return a.recursionLibraryBody(s, t, r), i != null && s[0].body.setFunctionId(i), s[0];
}), n(a, "evaluateExpression", function(t) {
  var r = a.toRPN(t), i = [];
  for (let s of r)
    if (a.isNumber(s))
      i.push(Number(s));
    else {
      const l = i.pop(), o = i.pop();
      let u;
      if (o !== void 0 && l !== void 0)
        switch (s) {
          case "+":
            u = o + l;
            break;
          case "-":
            u = o - l;
            break;
          case "*":
            u = o * l;
            break;
          case "/":
            u = o / l;
            break;
          case "%":
            u = o % l;
            break;
          case "^":
            u = Math.pow(o, l);
            break;
          case ">":
            u = o > l;
            break;
          case "<":
            u = o < l;
            break;
          case ">=":
            u = o >= l;
            break;
          case "<=":
            u = o <= l;
            break;
          case "==":
            u = o === l;
            break;
          case "!=":
            u = o !== l;
            break;
        }
      i.push(u);
    }
  return i.pop();
}), // 将自然表达式转换为逆波兰表达式
n(a, "toRPN", function(t) {
  t = t + "", t = t.replace(/\s+/g, "");
  var r = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "^": 3,
    ">": 4,
    "<": 4,
    ">=": 4,
    "<=": 4,
    "==": 4,
    "!=": 4
  }, i = [], s = [];
  function l(f) {
    i.push(f);
  }
  function o() {
    var f = s.pop();
    f && l(f);
  }
  function u(f) {
    return r.hasOwnProperty(f);
  }
  function h(f, g) {
    return f === "-" && g === 0 || f === "-" && !a.isNumber(t[g - 1]) && t[g - 1] !== ")";
  }
  for (let f = 0; f < t.length; f++) {
    var d = t[f];
    if (a.isNumber(d) || h(d, f)) {
      let g = d, p = f + 1;
      for (; p < t.length && (a.isNumber(t[p]) || t[p] === "."); )
        g += t[p], p++;
      l(g), f = p - 1;
    } else if (u(d)) {
      for (var c = s[s.length - 1]; u(c) && (r[d] <= r[c] && d !== "^" || r[d] < r[c] && d === "^"); )
        o(), c = s[s.length - 1];
      s.push(d);
    } else if (d === "(")
      s.push(d);
    else if (d === ")") {
      for (var c = s[s.length - 1]; c !== "(" && c !== void 0; )
        o(), c = s[s.length - 1];
      s.pop();
    }
  }
  for (; s.length > 0; )
    o();
  return i;
}), n(a, "Rectangle", class {
  constructor(r, i) {
    n(this, "width");
    n(this, "height");
    this.width = r, this.height = i;
  }
  calculateArea() {
    return this.width * this.height;
  }
  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }
}), /**
 * 递归同步运算体
 * @param 数组
 */
n(a, "recursionSyncBody", function(t) {
  for (var r = 0; r < t.length; r++)
    t[r].type == 5 && t[r].syncBody(), t[r].isFolder && a.recursionSyncBody(t[r].tree);
}), /**
 * 清理运算缓存
 */
n(a, "clearCache", function() {
  a.clearCacheRecursion(a.sceneFolder);
}), /**
 * 递归清理缓存
 * @param data
 * @param init
 */
n(a, "clearCacheRecursion", function(t) {
  for (var r = 0; r < t.tree.length; r++) {
    const i = t.tree[r];
    i.type == 5 && (i.cacheValue = null), i.isFolder == !0 && a.clearCacheRecursion(i);
  }
}), n(a, "initDataBase", function(t) {
  a.isBillboardLayerView = !1, new a.FXCentre(), JSON.parse(t).stage.operationArray;
  var r = JSON.parse(t).library.operationArray;
  a.editBody = null, a.selectBody = null, a.createLibraryBody(r, !0), a.parseLibraryBody(r, !0);
}), /**
 * 解析绝对路径
 * @param address
 * @returns {*|void|string}
 */
n(a, "parseAbsoluteAddress", function(t) {
  return t.replace(/\./g, "");
}), /**
 * 获取看板
 * @param array
 * @param folder
 * @returns {null}
 */
n(a, "recursionGetBillboard", function(t, r) {
  if (r.tree == null)
    return null;
  for (var i = 0; i < r.tree.length; i++)
    r.tree[i] instanceof a.BillboardLayer && t.push(r.tree[i]), a.recursionGetBillboard(t, r.tree[i]);
  return null;
}), /**
 * 存储运算体元素
 * @param saveArray
 * @param bodyArray
 */
n(a, "saveBody", function(t, r) {
  for (var i = 0; i < r.length; i++) {
    const g = r[i];
    if (g.type == "OperationBody") {
      var s = 0, l = 0;
      g.view != null && (s = g.view.getX(), l = g.view.getY());
      var o = a.createBodyData(
        g.type,
        g.isFunction,
        g.isBindingOperation,
        s,
        l,
        g.isWeight,
        g.isAdvance,
        g.funcType
      );
      g.isBindingFormula && (o.isFormula = !0, o.formulaName = g.formulaBody.name, o.formulaX = g.formulaBody.x, o.formulaY = g.formulaBody.y), o.id = g.id, t.push(o);
      for (var u = 0; u < g.tree.length; u++) {
        const p = g.tree[u];
        let v = a.createVarData(
          p.TID,
          p.name,
          p.value,
          p.type,
          p.macros,
          p.operator,
          p.enemyFlag,
          p.source,
          p.tag,
          p.statistics,
          p.upDateValue,
          p.demoteValue,
          p.funcType,
          // 逻辑块数据
          p.isLogicalOpen,
          p.isDragging,
          p.currentStep,
          p.snNo,
          p.minValue,
          p.maxValue,
          p.step,
          p.logicalChildArray,
          p.selectedOutputInfo
        );
        v.id = p.id, o.tree.push(v);
      }
    } else if (g.type == "SymbolBody") {
      var s = 0, l = 0;
      g.view != null && (s = g.view.getX(), l = g.view.getY());
      var h = a.createSymbolData(
        g.type,
        g.operator,
        g.isFunctionId,
        g.isBindingOperation,
        s,
        l,
        g.isWeight,
        g.funcType
      );
      g.isBindingFormula && (h.isFormula = !0, h.formulaName = g.formulaBody.name, h.formulaX = g.formulaBody.x, h.formulaY = g.formulaBody.y), h.id = g.id, t.push(h);
      for (var u = 0; u < g.tree.length; u++) {
        const y = g.tree[u];
        switch (y.type) {
          case "OperationBody":
            var s = 0, l = 0;
            y.view != null && (s = y.view.getX(), l = y.view.getY());
            var c = a.createBodyData(
              y.type,
              y.isFunction,
              y.isBindingOperation,
              s,
              l,
              y.isWeight,
              y.isAdvance,
              y.funcType
            );
            c.id = y.id, h.tree.push(c);
            for (var d = 0; d < y.tree.length; d++) {
              const b = y.tree[d];
              let V = a.createVarData(
                b.TID,
                b.name,
                b.value,
                b.type,
                b.macros,
                b.operator,
                b.enemyFlag,
                b.source,
                b.tag,
                b.statistics,
                b.upDateValue,
                b.demoteValue,
                b.funcType,
                // 逻辑块数据
                b.isLogicalOpen,
                b.isDragging,
                b.currentStep,
                b.snNo,
                b.minValue,
                b.maxValue,
                b.step,
                b.logicalChildArray,
                b.selectedOutputInfo
              );
              V.id = b.id, c.tree.push(V);
            }
            break;
          case "SymbolBody":
            var s = 0, l = 0;
            y.view != null && (s = y.view.getX(), l = y.view.getY());
            var c = a.createSymbolData(
              y.type,
              y.operator,
              y.isFunctionId,
              y.isBindingOperation,
              s,
              l,
              y.isWeight,
              y.funcType
            );
            c.id = y.id, h.tree.push(c), a.recursionSeekBody(c.tree, y.tree);
            break;
        }
      }
    } else if (g.type == "Bookmark") {
      var f = a.createBookmarkData(g);
      f.id = g.id, t.push(f);
    }
  }
}), n(a, "coordinateDetection", function(t) {
  return t != null ? { x: t.getX(), y: t.getY() } : { x: 0, y: 0 };
}), /**
 * 递归生成元素
 * @param 上级
 * @param tree
 */
n(a, "recursionSeekBody", function(t, r) {
  for (var i = 0; i < r.length; i++) {
    const u = r[i];
    switch (u.type) {
      case "OperationBody":
        var l = a.coordinateDetection(u.view), o = a.createBodyData(
          u.type,
          u.isFunction,
          u.isBindingOperation,
          l.x,
          l.y,
          u.isWeight,
          u.isAdvance,
          u.funcType
        );
        t.push(o);
        for (var s = 0; s < u.tree.length; s++) {
          const h = u.tree[s];
          o.tree.push(
            a.createVarData(
              h.TID,
              h.name,
              h.value,
              h.type,
              h.macros,
              h.operator,
              h.enemyFlag,
              h.source,
              h.tag,
              h.statistics,
              h.upDateValue,
              h.demoteValue,
              h.funcType,
              // 逻辑块数据
              h.isLogicalOpen,
              h.isDragging,
              h.currentStep,
              h.snNo,
              h.minValue,
              h.maxValue,
              h.step,
              h.logicalChildArray,
              h.selectedOutputInfo
            )
          );
        }
        break;
      case "SymbolBody":
        var l = a.coordinateDetection(u.view), o = a.createSymbolData(
          u.type,
          u.operator,
          u.isFunctionId,
          u.isBindingOperation,
          l.x,
          l.y,
          u.isWeight,
          u.funcType
        );
        t.push(o), a.recursionSeekBody(o.tree, u.tree);
        break;
    }
  }
}), /**
 * 获取绝对路径
 * @param body
 * @returns {string}
 */
n(a, "getAbsoluteAddress", function(t, r) {
  if (r) {
    var i = [];
    a.getStepData(t, i, r);
    for (var s = "", l = 0; l < i.length; l++)
      s += i[l];
    return s;
  }
  if (t.site != null && t.site != null)
    return t.site;
  if (t.parentFolder == null)
    return t.source != null ? t.source.absoluteAddress : t.name;
  var i = [];
  a.getStepData(t, i, r);
  for (var s = "", l = 0; l < i.length; l++)
    s += i[l];
  return s;
}), n(a, "copyHeadFun", function(t) {
  return t.copyHead ? !0 : t.parentFolder != null && t.parentFolder.name != null ? a.copyHeadFun(t.parentFolder) : !1;
}), /**
 * 获取层级信息
 * @param body
 * @param array
 */
n(a, "getStepData", function(t, r, i) {
  r.unshift(t.name), t.parentFolder != null && t.parentFolder.name != null && a.getStepData(t.parentFolder, r, i);
}), /**
 * 获取层级信息
 * @param body
 * @param array
 */
n(a, "getStepDataAll", function(t, r) {
  r.unshift(t.name), t.parentFolder.name != null && a.getStepDataAll(t.parentFolder, r);
}), /**
 * 创建变量存储数据
 * @param name
 * @param value
 * @param type
 * @param macro
 * @param operator
 * @param enemy
 * @param address
 * @returns {{}}
 */
n(a, "createVarData", function(t, r, i, s, l, o, u, h, d, c, f, g, p, v, D, y, m, T, b, V, x, O) {
  var F = {};
  return a.code, F.TID = t, F.name = r, F.value = i, F.type = s, F.macros = l, F.operator = o, F.enemy = u, F.tag = d, F.site = a.getAbsoluteAddress(h), F.statistics = c, F.upDateValue = f, F.demoteValue = g, F.funcType = p, F.isLogicalOpen = v, F.isDragging = D, F.currentStep = y, F.snNo = m, F.minValue = T, F.maxValue = b, F.step = V, F.logicalChildArray = [], F.selectedOutputInfo = typeof O == "object" ? JSON.stringify(O) : "", x && x.length && x.forEach((C) => {
    const S = a.createVarData(
      C.TID,
      C.name,
      C.value,
      C.type,
      C.macros,
      C.operator,
      C.enemyFlag,
      C.source,
      C.tag,
      C.statistics,
      C.upDateValue,
      C.demoteValue,
      C.funcType,
      // 逻辑块数据
      C.isLogicalOpen,
      C.isDragging,
      C.currentStep,
      C.snNo,
      C.minValue,
      C.maxValue,
      C.step,
      C.logicalChildArray
    );
    F.logicalChildArray.push(S);
  }), F;
}), /**
 * 创建运算体存储数据
 * @param type
 * @param isFunction
 * @param isBoundOutput
 * @param x
 * @param y
 * @returns {{}}
 */
n(a, "createBodyData", function(t, r, i, s, l, o, u, h) {
  var d = {};
  return d.tree = [], d.type = t, d.isFunction = r, d.isBoundOutput = i, d.x = s, d.y = l, d.isWeight = o, d.isAdvance = u, d.funcType = h, d;
}), /**
 * 创建符号体存储数据
 * @param type
 * @param operator
 * @param isFunctionId
 * @param isBoundOutput
 * @param x
 * @param y
 * @returns {{}}
 */
n(a, "createSymbolData", function(t, r, i, s, l, o, u, h) {
  var d = {};
  return d.tree = [], d.type = t, d.operator = r, d.isFunctionId = i, d.isBoundOutput = s, d.x = l, d.y = o, d.isWeight = u, d.funcType = h, d;
}), /**
 * 创建标签存储数据
 * @param name
 * @param address
 * @returns {{}}
 */
n(a, "createBookmarkData", function(t) {
  var r = {};
  return r.x = t.x, r.y = t.y, r.width = t.width, r.height = t.height, r.text = t.text, r.type = t.type, r;
}), /**
 * 创建图表存储数据
 * @param name
 * @param address
 * @returns {{}}
 */
n(a, "createChartData", function(t) {
  var r = {};
  if (r.name = t.name, r.minValue = t.minValue, r.maxValue = t.maxValue, r.intervalValue = t.intervalValue, r.operationlayer = [], r.metadataArray = [], r.isXlsx = !0, t.operationArray != null)
    for (var i = 0; i < t.operationArray.length; i++)
      r.operationlayer.push(
        a.getAbsoluteAddress(t.operationArray[i].source)
      );
  (t.body != null || t.metadata != null) && (r.metadata = a.getAbsoluteAddress(t.metadata.source));
  for (var i = 0, s = t.metadataArray.length; i < s; i++) {
    var l = t.metadataArray[i], o = l.source, u = {
      site: a.getAbsoluteAddress(o)
    };
    l.minValue != 1 && (u.minValue = l.minValue), l.intervalValue != 1 && (u.intervalValue = l.intervalValue), r.metadataArray.push(u);
  }
  return r.site = a.getAbsoluteAddress(t), r;
}), /**
 * 寻找运算体根级
 * @param 寻找运算体数组
 * @returns {[]}
 */
n(a, "seekSource", function(t) {
  for (var r = [], i = 0; i < t.length; i++) {
    const l = t[i];
    if (l.parent == null) {
      if (r.length == 0)
        r.push(l);
      else
        for (var s = 0; s < r.length; s++)
          if (r[s] != l) {
            r.push(l);
            break;
          }
    }
  }
  return r;
}), /**
 * 创建看板层元数据存储数据
 * @param name
 * @param type
 * @param value
 * @param address
 * @param module
 * @returns {{}}
 */
n(a, "createBillboarMetadataData", function(t, r, i, s, l) {
  var o = {};
  return o.name = t, o.type = r, o.value = i, o.site = a.getAbsoluteAddress(s), o.componentType = l.type, o.componentValue = l.body.value, o.componentMinValue = l.minValue, o.componentMaxValue = l.maxValue, o.componentIntervalValue = l.intervalValue, o.list = l.list, o;
}), /**
 * 创建运算层存储数据
 * @param name
 * @param type
 * @param value
 * @param address
 * @returns {{}}
 */
n(a, "createOperationLayerData", function(t, r, i, s, l, o, u, h) {
  var d = {};
  return d.name = t, d.type = r, d.value = i, d.site = a.getAbsoluteAddress(s), d.tag = l, d.operationArray = [], r === 11 && u && (d.sheetData = u, d.childCell = h), d.isSystemShow = o, d;
}), /**
 * 创建看板存储数据
 * @param name
 * @param address
 * @returns {{}}
 */
n(a, "createBillboarData", function(t, r, i) {
  var s = {};
  return s.name = t, s.site = a.getAbsoluteAddress(r), s.isBoard = !0, s.operationArray = [], s.metadataArray = [], s.monitored = i, s;
}), /**
 * 创建文件夹存储数据
 * @param name
 * @param isFolder
 * @param address
 * @returns {{}}
 */
n(a, "createFolderData", function(t, r, i) {
  var s = {};
  return s.name = t, s.isFile = r, s.operationArray = [], s.site = a.getAbsoluteAddress(i), s;
}), /**
 * 获得回合数
 * @param body
 * @returns {number[]}
 */
n(a, "getBout", function(t) {
  if (t.tree.length > 1) {
    if (t.tree[0].getValue() != 0 && t.tree[1].getValue() != 0 && Number(t.tree[0].getValue()) > Number(t.tree[1].getValue())) {
      for (var r = Number(t.tree[0].getValue()), i = 0, s = 1; s < t.tree.length; s++)
        i += Number(t.treeItem.getValue());
      for (var l = 0, o = 0; r >= i; )
        o += i, r -= i, l++;
      return [l, o / l];
    }
    return [0, 0];
  }
  return [0, 0];
}), /**
 * 深度复制
 * @param source
 * @returns {{}}
 */
n(a, "copy", function(t) {
  var r = {};
  for (var i in t)
    t.hasOwnProperty(i) && (r[i] = typeof t[i] == "object" ? a.copy(t[i]) : t[i]);
  return r;
}), n(a, "getIsBoundOutput", function(t, r) {
  return r != null ? !1 : t.isBoundOutput != null ? t.isBoundOutput : t.isBindingOperation;
}), n(a, "coordinate", function(t, r) {
  var i = 1;
  return a.visualVersionCompatibility && (i = 0.5), t.view != null ? t.parent == null ? [
    0,
    0
    // (fx.SabApp.mouseX - child.view.layerGroup.getParent().getX()) * s,
    // (fx.SabApp.mouseY - child.view.layerGroup.getParent().getY()) * s,
  ] : [t.view.getX() * i, t.view.getY() * i] : [t.x * i, t.y * i];
}), /**
 * 解析场景数据
 * @param 解析数据
 * @param 是否是场景
 */
n(a, "parseStageBody", function(t, r, i, s) {
  for (var l = null, o = 0; o < t.length; o++) {
    const y = t[o];
    if (i == null && y.parent != null)
      return;
    if (y.type == "OperationBody" || y.type == "运算体类") {
      var u;
      if (y.isFunction) {
        u = a.createOperationBody(
          a.coordinate(t[o], i)[0],
          a.coordinate(t[o], i)[1],
          1,
          y.isWeight,
          y.isAdvance,
          y.funcType
        ), u.isBindingOperation = a.getIsBoundOutput(
          t[o],
          i
        ), a.operationBindBody(u), l == null && (l = u);
        for (var h = 0; h < y.tree.length; h++) {
          const m = y.tree[h];
          if (m.type == 4) {
            var d = new a.VariableValue(
              m.name,
              null,
              m.type
            );
            d.TID = m.TID, d.TID == null && (d.TID = (/* @__PURE__ */ new Date()).getTime() + a.functionAddIndex, a.functionAddIndex++);
            var c = a.createFunctionBody(u, d);
            c.setMacros(a.amendMacros(m)), c.enemyFlag = m.enemy, c.funcType = m.funcType, c.funcType == null && (c.funcType = 0), c.statistics = m.statistics, c.upDateValue = m.upDateValue, c.demoteValue = m.demoteValue, a.symbolicLink(c, m.operator), a.Call.send(
              a.Eve.SHIFT_SHOW_VIEW,
              [c, m.operator, r],
              null
            );
          } else if ([
            12,
            16,
            NodeType.LogicalList,
            NodeType.LogicalNumberList,
            14
            /* LogicalSlider */
          ].includes(m.type)) {
            var d = new a.VariableValue(
              m.name,
              m.value,
              m.type
            );
            d.TID = m.TID, d.TID == null && (d.TID = (/* @__PURE__ */ new Date()).getTime() + a.functionAddIndex, a.functionAddIndex++);
            var c = a.createFunctionBody(u, d);
            c.enemyFlag = m.enemy, c.funcType = m.funcType, c.funcType == null && (c.funcType = 0), m.type == 11 && (c.selectedOutputInfo = m.selectedOutputInfo ? JSON.parse(m.selectedOutputInfo) : ""), c.statistics = m.statistics, c.upDateValue = m.upDateValue, c.demoteValue = m.demoteValue, c.isLogicalOpen = m.isLogicalOpen, c.isDragging = m.isDragging, c.snNo = m.snNo, c.logicalNumberList = m.logicalNumberList, c.currentStep = m.currentStep, c.snNo = m.snNo, c.minValue = m.minValue, c.maxValue = m.maxValue, c.step = m.step, c.logicalChildArray = [], m.logicalChildArray.forEach((V) => {
              var x = [];
              a.getLibraryBody(
                x,
                a.targetFolder.tree,
                a.getAbsoluteAddress(V)
              );
              var O = x[0], F = O.copy();
              F.enemyFlag = m.enemy, F.funcType = m.funcType, F.funcType == null && (F.funcType = 0), F.statistics = m.statistics, F.upDateValue = m.upDateValue, F.demoteValue = m.demoteValue, c.logicalChildArray.push(F);
            }), a.symbolicLink(c, m.operator), a.Call.send(
              a.Eve.SHIFT_SHOW_VIEW,
              [c, m.operator, r],
              null
            );
          } else {
            var f = [];
            s ? a.getLibraryBody(
              f,
              a.targetFolder.tree,
              a.getAbsoluteAddress(m.source)
            ) : a.getLibraryBody(
              f,
              a.targetFolder.tree,
              a.getAbsoluteAddress(m)
            );
            var g = f[0], c = a.createVariableBody(u, g);
            c.enemyFlag = m.enemy, c.funcType = m.funcType, c.funcType == null && (c.funcType = 0), m.type == 11 && (c.selectedOutputInfo = m.selectedOutputInfo ? JSON.parse(m.selectedOutputInfo) : ""), c.statistics = m.statistics, c.upDateValue = m.upDateValue, c.demoteValue = m.demoteValue, a.symbolicLink(c, m.operator), a.Call.send(
              a.Eve.SHIFT_SHOW_VIEW,
              [c, m.operator, r],
              null
            );
          }
        }
        a.Call.send(a.Eve.SHIFT_SHOW_VIEW_ON, [u, r], null);
      } else {
        u = a.createOperationBody(
          a.coordinate(t[o], i)[0],
          a.coordinate(t[o], i)[1],
          0,
          y.isWeight,
          y.isAdvance,
          y.funcType
        ), u.isBindingOperation = a.getIsBoundOutput(
          t[o],
          i
        ), a.operationBindBody(u), l == null && (l = u);
        for (var h = 0; h < y.tree.length; h++) {
          const T = y.tree[h];
          if (T.type == 4) {
            var d = new a.VariableValue(
              T.name,
              null,
              T.type
            );
            d.TID = T.TID, d.TID == null && (d.TID = (/* @__PURE__ */ new Date()).getTime() + a.functionAddIndex, a.functionAddIndex++);
            var c = a.createFunctionBody(u, d);
            c.setMacros(a.amendMacros(T)), c.enemyFlag = T.enemy, c.funcType = T.funcType, c.funcType == null && (c.funcType = 0), c.statistics = T.statistics, c.upDateValue = T.upDateValue, c.demoteValue = T.demoteValue, a.symbolicLink(c, T.operator), a.Call.send(
              a.Eve.SHIFT_SHOW_VIEW,
              [c, T.operator, r],
              null
            );
          } else {
            var f = [];
            s || T.source ? a.getLibraryBody(
              f,
              a.targetFolder.tree,
              a.getAbsoluteAddress(T.source)
            ) : a.getLibraryBody(
              f,
              a.targetFolder.tree,
              a.getAbsoluteAddress(T)
            );
            var g = f[0], c = a.createVariableBody(u, g);
            c.enemyFlag = T.enemy, c.funcType = T.funcType, c.funcType == null && (c.funcType = 0), T.type == 11 && (c.selectedOutputInfo = T.selectedOutputInfo ? JSON.parse(T.selectedOutputInfo) : ""), c.statistics = T.statistics, c.upDateValue = T.upDateValue, c.demoteValue = T.demoteValue, a.symbolicLink(c, T.operator), a.Call.send(
              a.Eve.SHIFT_SHOW_VIEW,
              [c, T.operator, r],
              null
            );
          }
        }
        a.Call.send(a.Eve.SHIFT_SHOW_VIEW_ON, [u, r], null);
      }
      if (y.isFormula) {
        var p = new a.FormulaData(
          y.formulaName,
          y.formulaX,
          y.formulaY
        );
        p.body = u, p.body.isBindingFormula = !0, u.formulaBody = p, a.Call.send(
          a.Eve.SHIFT_ADD_FORMULA,
          [p, u.view, r],
          null
        );
      }
    } else if (y.type == "SymbolBody" || y.type == "符号运算体类") {
      var v = a.createSymbolBody(
        null,
        null,
        y.operator,
        y.isFunctionId,
        y.isWeight,
        y.funcType
      );
      v.isBindingOperation = a.getIsBoundOutput(
        t[o],
        i
      ), a.operationBindBody(v), l == null && (l = v), v.view != null && (v.view.setX(a.coordinate(t[o], i)[0]), v.view.setY(a.coordinate(t[o], i)[1]));
      for (var h = 0; h < y.tree.length; h++) {
        const T = y.tree[h];
        if (T.type == "OperationBody" || T.type == "运算体类")
          if (T.isFunction) {
            var u = a.createOperationBody(
              a.coordinate(T, i)[0],
              a.coordinate(T, i)[1],
              1,
              T.isWeight,
              T.isAdvance,
              T.funcType
            );
            u.isBindingOperation = a.getIsBoundOutput(
              T,
              i
            ), a.operationBindBody(u), a.addBody(v, u, !1);
            for (var D = 0; D < T.tree.length; D++) {
              const V = T.tree[D];
              if (V.type == 4) {
                var d = new a.VariableValue(
                  V.name,
                  null,
                  4
                );
                d.TID = V.TID, d.TID == null && (d.TID = (/* @__PURE__ */ new Date()).getTime() + a.functionAddIndex, a.functionAddIndex++);
                var c = a.createFunctionBody(u, d);
                c.macros = a.amendMacros(V), c.enemyFlag = V.enemy, c.funcType = V.funcType, c.funcType == null && (c.funcType = 0), c.statistics = V.statistics, c.upDateValue = V.upDateValue, c.demoteValue = V.demoteValue, a.symbolicLink(c, V.operator), a.Call.send(
                  a.Eve.SHIFT_SHOW_VIEW,
                  [c, V.operator, r],
                  null
                );
              } else {
                var f = [];
                s ? a.getLibraryBody(
                  f,
                  a.targetFolder.tree,
                  a.getAbsoluteAddress(V.source)
                ) : a.getLibraryBody(
                  f,
                  a.targetFolder.tree,
                  a.getAbsoluteAddress(V)
                );
                var g = f[0], c = a.createVariableBody(
                  u,
                  g
                );
                c.enemyFlag = V.enemy, c.funcType = V.funcType, c.funcType == null && (c.funcType = 0), V.type == 11 && (c.selectedOutputInfo = V.selectedOutputInfo ? JSON.parse(V.selectedOutputInfo) : ""), c.statistics = V.statistics, c.upDateValue = V.upDateValue, c.demoteValue = V.demoteValue, a.symbolicLink(c, V.operator), a.Call.send(
                  a.Eve.SHIFT_SHOW_VIEW,
                  [c, V.operator, r],
                  null
                );
              }
            }
            a.Call.send(
              a.Eve.SHIFT_SHOW_VIEW_ON,
              [u, r],
              null
            );
          } else {
            var u = a.createOperationBody(
              a.coordinate(T, i)[0],
              a.coordinate(T, i)[1],
              0,
              T.isWeight,
              T.isAdvance,
              T.funcType
            );
            if (u.isBindingOperation = a.getIsBoundOutput(
              T,
              i
            ), a.operationBindBody(u), a.addBody(v, u, !1), T.tree == null)
              return null;
            for (var D = 0; D < T.tree.length; D++) {
              const x = T.tree[D];
              if (x.type == 4) {
                var d = new a.VariableValue(
                  x.name,
                  null,
                  x.type
                );
                d.TID = x.TID, d.TID == null && (d.TID = (/* @__PURE__ */ new Date()).getTime() + a.functionAddIndex, a.functionAddIndex++);
                var c = a.createFunctionBody(u, d);
                c.setMacros(a.amendMacros(x)), c.enemyFlag = x.enemy, c.funcType = x.funcType, c.funcType == null && (c.funcType = 0), c.statistics = x.statistics, c.upDateValue = x.upDateValue, c.demoteValue = x.demoteValue, a.symbolicLink(c, x.operator), a.Call.send(
                  a.Eve.SHIFT_SHOW_VIEW,
                  [c, x.operator, r],
                  null
                );
              } else {
                var f = [];
                s || x.source ? a.getLibraryBody(
                  f,
                  a.targetFolder.tree,
                  a.getAbsoluteAddress(x.source)
                ) : a.getLibraryBody(
                  f,
                  a.targetFolder.tree,
                  a.getAbsoluteAddress(x)
                );
                var g = f[0], c = a.createVariableBody(
                  u,
                  g
                );
                c.enemyFlag = x.enemy, c.funcType = x.funcType, c.funcType == null && (c.funcType = 0), x.type == 11 && (c.selectedOutputInfo = x.selectedOutputInfo ? JSON.parse(x.selectedOutputInfo) : ""), c.statistics = x.statistics, c.upDateValue = x.upDateValue, c.demoteValue = x.demoteValue, a.symbolicLink(c, x.operator), a.Call.send(
                  a.Eve.SHIFT_SHOW_VIEW,
                  [c, x.operator, r],
                  null
                );
              }
            }
            a.Call.send(
              a.Eve.SHIFT_SHOW_VIEW_ON,
              [u, r],
              null
            );
          }
        else if (T.type == "SymbolBody" || T.type == "符号运算体类") {
          var u = a.createSymbolBody(
            null,
            null,
            T.operator,
            T.isFunctionId,
            T.isWeight,
            T.funcType
          );
          u.isBindingOperation = a.getIsBoundOutput(
            T,
            i
          ), a.operationBindBody(u), u.view != null && (u.view.setX(a.coordinate(T, i)[0]), u.view.setY(a.coordinate(T, i)[1])), a.loopGenerateBody(u, T.tree, r), a.addBody(v, u, !1), a.Call.send(
            a.Eve.SHIFT_SHOW_VIEW_ON,
            [u, r],
            null
          );
        }
      }
      if (a.Call.send(a.Eve.SHIFT_SHOW_VIEW_ON, [v, r], null), y.isFormula) {
        var p = new a.FormulaData(
          y.formulaName,
          y.formulaX,
          y.formulaY
        );
        p.body = v, p.body.isBindingFormula = !0, v.formulaBody = p, a.Call.send(
          a.Eve.SHIFT_ADD_FORMULA,
          [p, v.view, r],
          null
        );
      }
    } else if (y.type == "Bookmark") {
      var u = a.createBookmark(
        y.x,
        y.y,
        y.width,
        y.height,
        y.text
      );
      a.Call.send(a.Eve.SHIFT_SHOW_VIEW_ON, [u, r], null);
    }
  }
  return l;
}), n(a, "amendMacros", function(t) {
  return t.macros == null ? t.macro : t.macros;
}), /**
 * 修正小数点
 * @param value
 * @param type
 * @returns {number}
 */
n(a, "fixedDecimal", function(t, r) {
  switch (r) {
    case 0:
      return Math.round(t);
    case 1:
      return Math.round(t * 10) / 10;
    case 2:
      return Math.round(t * 100) / 100;
    case 3:
      return Math.round(t * 1e3) / 1e3;
    case 4:
      return Math.round(t * 1e4) / 1e4;
  }
  return 0;
}), n(a, "currencyConversion", function(t) {
  var r = t % 100, i = parseInt(String(t / 100 % 100)), s = 0;
  return t < 1e5 ? s = parseInt(String(t / 100 / 100 % 100)) : s = parseInt(String(t / 100 / 100)), [s, i, r];
}), /**
 * 替换变量字段
 * @param parent
 * @param clickBody
 * @returns {*}
 */
n(a, "replaceVariableBody", function(t, r, i) {
  var s = r.copy();
  return t.replace(s, i), a.Call.send(
    a.Eve.SHIFT_ADD_VARIABLEBODY,
    [t, s],
    (function(l) {
    }).bind(this)
  ), s;
}), /**
 * 创建变量字段
 * @param parent
 * @param clickBody
 * @returns {*}
 */
n(a, "createVariableBody", function(t, r) {
  var i = r.copy();
  return t.addBody(i), a.Call.send(
    a.Eve.SHIFT_ADD_VARIABLEBODY,
    [t, i],
    (function(s) {
    }).bind(this)
  ), i;
}), /**
 * 创建宏变量
 * @param parent
 * @param clickBody
 * @returns {*}
 */
n(a, "createFunctionBody", function(t, r) {
  var i = r.copy();
  return t.addBody(i), a.Call.send(
    a.Eve.SHIFT_ADD_FUNCTION,
    [t, i],
    (function(s) {
    }).bind(this)
  ), i;
}), /**
 * 替换宏变量
 * @param parent
 * @param clickBody
 * @returns {*}
 */
n(a, "replaceFunctionBody", function(t, r, i) {
  var s = r.copy();
  return t.replace(s, i), a.Call.send(
    a.Eve.SHIFT_ADD_FUNCTION,
    [t, s],
    (function(l) {
    }).bind(this)
  ), s;
}), /**
 * 生成运算体/函数体
 * @param x
 * @param y
 * @param type
 * @returns {*}
 */
n(a, "createOperationBody", function(t, r, i, s, l, o) {
  var u = new a.OperationBody();
  u.isFunction = !!i, a.targetStoragePool.push(u), u.isWeight = s, u.isAdvance = l, u.funcType = o, (u.funcType == null || u.funcType == null) && (u.funcType = 0), u.x = t, u.y = r;
  var h = null;
  return a.Call.send(
    a.Eve.SHIFT_ADD_OPERATIONBODY,
    [t, r, i, u],
    (function(d) {
      h = d, s && h && h.openWeight(), l && h && h.openAdvance();
    }).bind(this)
  ), u;
}), /**
 * 生成书签
 * @param x
 * @param y
 * @param type
 * @returns {*}
 */
n(a, "createBookmark", function(t, r, i, s, l) {
  var o = new a.Bookmark();
  return o.x = t, o.y = r, o.width = i, o.id = ++EventManager.IDINDEX, o.width == null && (o.width = 256), o.height = s, o.height == null && (o.height = 256), o.text = l, a.targetStoragePool.push(o), a.Call.send(
    a.Eve.SHIFT_ADD_BOOKMARK,
    [o],
    (function(u) {
    }).bind(this)
  ), o;
}), /**
 * 生成符号体
 * @param lbody
 * @param rbody
 * @param symbol
 * @param fid
 * @returns {*}
 */
n(a, "createSymbolBody", function(t, r, i, s, l, o) {
  var u = new a.SymbolBody();
  return u.isWeight = l, u.isFunctionId = s, u.funcType = o, (u.funcType == null || u.funcType == null) && (u.funcType = 0), u.operator = i, u.isFunctionId == null && (u.isFunctionId = 1), t != null && u.addBody(t), r != null && u.addBody(r), a.targetStoragePool.push(u), a.Call.send(
    a.Eve.SHIFT_ADD_SYMBOLBODY,
    [t, r, i, s, u],
    null
  ), u;
}), /**
 * 运算层绑定运算体操作
 * @param body
 */
n(a, "operationBindBody", function(t) {
  t.isBindingOperation && a.editBody != null && (a.editBody.body = t);
}), /**
 * 添加运算体
 * @param parentBody
 * @param body
 * @param coord
 */
n(a, "addBody", function(t, r, i) {
  a.Call.send(a.Eve.ADD_OPERAND_DATA, [t, r, i], null);
}), /**
 * 字段菜单操作
 * @param body
 * @param operator
 */
n(a, "symbolicLink", function(t, r) {
  r != null && (r == "删除符号" || r == "删除运算体" || r == "导出公式" || r == "敌方标记" || (t.operator = r));
}), n(a, "loopGenerateBody", function(t, r, i) {
  for (var s = 0; s < r.length; s++) {
    const g = r[s];
    switch (g.type) {
      case "OperationBody":
        if (g.isFunction) {
          var l = a.createOperationBody(
            a.coordinate(r[s])[0],
            a.coordinate(r[s])[1],
            1,
            g.isWeight,
            g.isAdvance,
            g.funcType
          );
          l.isBindingOperation = a.getIsBoundOutput(r[s]), a.operationBindBody(l), a.addBody(t, l, !1);
          for (var o = 0; o < g.tree.length; o++) {
            const p = g.tree[o];
            if (p.type == 4) {
              var u = new a.VariableValue(
                p.name,
                null,
                p.type
              );
              u.TID = p.TID, u.TID == null && (u.TID = (/* @__PURE__ */ new Date()).getTime() + a.functionAddIndex, a.functionAddIndex++);
              var h = a.createFunctionBody(
                l,
                u
              );
              h.macros = a.amendMacros(p), h.enemyFlag = p.enemy, h.funcType = p.funcType, h.funcType == null && (h.funcType = 0), h.statistics = p.statistics, h.upDateValue = p.upDateValue, h.demoteValue = p.demoteValue, a.symbolicLink(h, p.operator), a.clickBody = h, a.Call.send(
                a.Eve.SHIFT_SHOW_VIEW,
                [h, p.operator, i],
                null
              );
            } else {
              var d = [];
              a.getLibraryBody(
                d,
                a.targetFolder.tree,
                a.getAbsoluteAddress(p)
              );
              var c = d[0], h = a.createVariableBody(
                l,
                c
              );
              h.enemyFlag = p.enemy, h.funcType = p.funcType, h.funcType == null && (h.funcType = 0), p.type == 11 && (h.selectedOutputInfo = p.selectedOutputInfo ? JSON.parse(p.selectedOutputInfo) : ""), h.statistics = p.statistics, h.upDateValue = p.upDateValue, h.demoteValue = p.demoteValue, a.symbolicLink(h, p.operator), a.Call.send(
                a.Eve.SHIFT_SHOW_VIEW,
                [h, p.operator, i],
                null
              );
            }
          }
          a.Call.send(
            a.Eve.SHIFT_SHOW_VIEW_ON,
            [l, i],
            null
          );
        } else {
          var l = a.createOperationBody(
            a.coordinate(r[s])[0],
            a.coordinate(r[s])[1],
            0,
            g.isWeight,
            g.isAdvance,
            g.funcType
          );
          l.isBindingOperation = a.getIsBoundOutput(r[s]), a.operationBindBody(l), a.addBody(t, l, !1);
          for (var o = 0; o < g.tree.length; o++) {
            const D = g.tree[o];
            if (D.type == 4) {
              var u = new a.VariableValue(
                D.name,
                null,
                D.type
              );
              u.TID = D.TID, u.TID == null && (u.TID = (/* @__PURE__ */ new Date()).getTime() + a.functionAddIndex, a.functionAddIndex++);
              var h = a.createFunctionBody(
                l,
                u
              );
              h.setMacros(a.amendMacros(D)), h.enemyFlag = D.enemy, h.funcType = D.funcType, h.funcType == null && (h.funcType = 0), h.statistics = D.statistics, h.upDateValue = D.upDateValue, h.demoteValue = D.demoteValue, a.symbolicLink(h, D.operator), a.Call.send(
                a.Eve.SHIFT_SHOW_VIEW,
                [h, D.operator, i],
                null
              );
            } else {
              var d = [];
              a.getLibraryBody(
                d,
                a.targetFolder.tree,
                a.getAbsoluteAddress(D)
              );
              var c = d[0], h = a.createVariableBody(
                l,
                c
              );
              h.enemyFlag = D.enemy, h.funcType = D.funcType, h.funcType == null && (h.funcType = 0), D.type == 11 && (h.selectedOutputInfo = D.selectedOutputInfo ? JSON.parse(D.selectedOutputInfo) : ""), h.statistics = D.statistics, h.upDateValue = D.upDateValue, h.demoteValue = D.demoteValue, a.symbolicLink(h, D.operator), a.Call.send(
                a.Eve.SHIFT_SHOW_VIEW,
                [h, D.operator, i],
                null
              );
            }
          }
          a.Call.send(
            a.Eve.SHIFT_SHOW_VIEW_ON,
            [l, i],
            null
          );
        }
        break;
      case "SymbolBody":
        var f = a.createSymbolBody(
          null,
          null,
          g.operator,
          g.isFunctionId,
          g.isWeight,
          g.funcType
        );
        f.isBindingOperation = a.getIsBoundOutput(r[s]), a.operationBindBody(f), f.view != null && (f.view.setX(a.coordinate(r[s])[0]), f.view.setY(a.coordinate(r[s])[1])), a.loopGenerateBody(f, g.tree, i), a.addBody(t, f, !1), a.Call.send(
          a.Eve.SHIFT_SHOW_VIEW_ON,
          [f, i],
          null
        );
        break;
    }
  }
}), n(a, "saveFXTree", function(t, r) {
  if (t != null)
    for (var i = 0; i < t.length; i++) {
      const l = t[i];
      if (l.type == 4) {
        var s = {
          TID: l.TID,
          name: l.name,
          code: l.macros
        };
        r.push(s);
      } else
        a.saveFXTree(l.tree, r);
    }
}), n(a, "recursiveStorage", function(t, r) {
  if (t.operationArray != null)
    for (var i = 0; i < t.operationArray.length; i++) {
      const o = t.operationArray[i];
      if (o.tree != null)
        for (var s = 0; s < o.tree.length; s++) {
          const u = o.tree[s];
          if (u.type == 4) {
            var l = {
              TID: u.TID,
              name: u.name,
              code: u.macros
            };
            r.push(l);
          } else
            a.saveFXTree(u.tree, r);
        }
      o.operationArray != null && a.recursiveStorage(o, r);
    }
}), /**
 * 初始化系统
 * 启动 FX 引擎核心功能
 */
n(a, "init", function() {
  try {
    a.isStart === !1 && (a.isStart = !0, a.code = !0, new a.FXCentre());
  } catch (t) {
    console.error("Error initializing FX system:", t), a.isStart = !1, a.code = !1;
  }
}), a), globalThis_2 = /* @__PURE__ */ function() {
  return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
}();
globalThis_2.fx = fx;
globalThis_2.seer = fx;
const L = class L {
  constructor() {
    /** Fx配置数据 */
    n(this, "_fxData");
    /** Fx玩家实例 */
    n(this, "_fxPlayer");
    /** 玩家列表 */
    n(this, "playerList", []);
  }
  /**
   * 获取单例实例
   * @returns {FxUtil} FxUtil实例
   */
  static getInstance() {
    return this._instance || (this._instance = new L()), this._instance;
  }
  /**
   * 获取玩家实例
   * 从配置数据中创建一个新的玩家实例，设置基础属性和参数
   * @returns {any} 配置好的玩家实例
   */
  getPlayerInstance() {
    let t = this._fxData[0], r = new Player();
    r.name = t.name, console.log(r.name);
    let i = r.getBillboard();
    return console.log(i), r.parameterInfoArray = t.parameterInfoArray, r;
  }
  /**
   * 根据敌人ID获取敌人实例
   * @param {number} enemyId - 敌人ID
   * @returns {any} 配置好的敌人实例
   */
  getEnemyInstance(t) {
    let r = this._fxData[t], i = new Player();
    return i.name = r.name, i.parameterInfoArray = r.parameterInfoArray, i;
  }
  /**
   * 根据角色名称获取实例
   * 通过角色名称查找对应的配置数据，创建并返回配置好的实例
   * @param {string} name - 角色名称
   * @returns {any} 配置好的角色实例，如果未找到则返回null
   */
  getInstanceByName(t) {
    let r = this._fxData.find((s) => s.name === t);
    if (!r)
      return console.warn(`未找到名称为 "${t}" 的角色配置`), null;
    let i = new Player();
    return i.name = r.name, i.parameterInfoArray = r.parameterInfoArray, i;
  }
  /**
   * 加载配置数据
   * 初始化Fx系统，解析配置数据，创建玩家列表
   * @param {any} myData - 配置数据
   */
  loadConfig(t) {
    new FXCentre();
    var r = t, i = typeof r == "string" ? JSON.parse(r) : r;
    i.stage.operationArray;
    var s = i.library.operationArray;
    fx.createLibraryBody(s, !0), this._fxPlayer = Player, this.playerList = [];
    let l = new fx.CallCenter();
    l.addEventListener(EventManager.SHIFT_ADD_BOARD, (h) => {
      let d = new BillboardLayer(h.name);
      d.monitored = h.monitored;
      let c = d;
      for (var f = 0; f < h.operationArray.length; f++) {
        var g = [];
        fx.getLibraryBody(
          g,
          fx.targetFolder.tree,
          h.operationArray[f].site
        ), fx.clickBody = g[0], c.pushOperationLayer(), fx.clickBody = null;
      }
      for (var f = 0; f < h.metadataArray.length; f++) {
        var g = [];
        fx.getLibraryBody(
          g,
          fx.targetFolder.tree,
          h.metadataArray[f].site
        ), fx.clickBody = g[0];
        let D = h.metadataArray[f];
        c.pushMetadata(
          D.componentType,
          D.componentMinValue,
          D.componentMaxValue,
          D.componentIntervalValue
        ), fx.clickBody = null;
      }
      fx.Call.send(fx.Eve.ADD_DATABASE_DATA, [
        c,
        fx.selectBody,
        h.index
      ]), fx.Call.send(fx.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES, [
        c,
        fx.selectBody
      ]);
    }), l.addEventListener(EventManager.SHIFT_ADD_CHARTS, (h) => {
      var d = new ChartsLayer(h.name);
      let c = d;
      for (var f = 0; f < h.operationlayer.length; f++) {
        var g = [];
        fx.getLibraryBody(
          g,
          fx.targetFolder.tree,
          h.operationlayer[f]
        ), c.operationArray.push(g[0].copy());
      }
      var g = [];
      c.minValue = h.minValue, c.intervalValue = h.intervalValue, c.maxValue = h.maxValue, h.metadataArray || (h.metadataArray = []), h.metadata && (h.metadataArray = [
        {
          site: h.metadata,
          intervalValue: c.intervalValue,
          minValue: c.minValue
        }
      ], h.metadata = null);
      for (var f = 0; f < h.metadataArray.length; f++) {
        var g = [], p = h.metadataArray[f];
        fx.getLibraryBody(g, fx.targetFolder.tree, p.site);
        var v = g[0].copy();
        v.intervalValue = p.intervalValue || 1, v.minValue = p.minValue || 1, c.metadataArray.push(v), c.metadata = v;
      }
      Call.send(fx.Eve.ADD_DATABASE_DATA, [
        c,
        fx.selectBody,
        h.index
      ]), fx.Call.send(fx.Eve.SHIFT_REFRESH_LIBRARY_COORDINATES, [
        c,
        fx.selectBody
      ]), fx.clickBody = null;
    }), fx.parseLibraryBody(s, !0), fx.recursionSyncBody(fx.targetFolder.tree);
    let o = i.entity.operationArray;
    this._fxData = o;
    let u = this.createPlayersFromEntityArray(o);
    console.log("-------------------"), u.forEach((h) => {
      let d = h.getFormula("攻击"), c = h.getFormula("生命"), f = h.getFormula("防御");
      console.log("name", h.name), console.log("attack", d), console.log("hp", c), console.log("defense", f);
    }), this.playerList = u;
  }
  /**
   * 根据职业和等级获取数据
   * @param {number} occu - 职业类型
   * @param {number} level - 等级
   * @returns {object} 包含攻击力、生命值、防御力的对象
   */
  getDataByOccuAndLevel(t, r) {
    this._fxPlayer.changePlayerLevelAndOccupation(r, t);
    let i = this._fxPlayer.getFormula("攻击1"), s = this._fxPlayer.getFormula("生命"), l = this._fxPlayer.getFormula("防御");
    return { attack: i, hp: s, defense: l };
  }
  /**
   * 根据名称、职业和等级获取实例数据
   * @param {string} name - 玩家名称
   * @param {number} occu - 职业类型
   * @param {number} level - 等级
   * @returns {object} 包含攻击力、生命值、防御力的对象
   */
  getInstanceDataByNameAndOccuAndLevel(t, r, i) {
    let s = this.playerList.find((h) => h.name === t);
    if (!s)
      throw new Error(`未找到名称为 "${t}" 的玩家`);
    s.changeLevelAndOccupation(i, r);
    let l = s.getFormula("攻击"), o = s.getFormula("生命"), u = s.getFormula("防御");
    return { attack: l, hp: o, defense: u };
  }
  /**
   * 根据实体数组创建玩家实例列表
   * 遍历实体数组，为每个实体调用getInstanceByName创建对应的玩家实例
   * @param {any[]} entityArray - 实体配置数组
   * @returns {Player[]} 创建的玩家实例数组
   */
  createPlayersFromEntityArray(t) {
    let r = [];
    for (var i = 0; i < t.length; i++) {
      let s = t[i], l = this.getInstanceByName(s.name);
      l ? r.push(l) : console.warn(`创建玩家实例失败: ${s.name}`);
    }
    return r;
  }
  /**
   * 根据路径获取表格数据
   * 通过点分割的路径字符串，在目标文件夹树中查找对应的表格数据
   * @param {string} path - 点分割的路径字符串（如: "folder1.folder2.sheet"）
   * @returns {any} 表格的原始数据
   */
  getSheetDataByPath(t) {
    var l;
    let r = t.split("."), i = fx.targetFolder, s;
    for (let o = 0; o < r.length; o++) {
      let u;
      if (i.isFolder) {
        if (u = i.tree.find((h) => h.name == r[o]), !u)
          throw new Error("getSheetDataByPath - 路径未找到: " + r[o]);
      } else
        s = i;
      i = u, o == r.length - 1 && (s = i);
    }
    return (l = s == null ? void 0 : s.sheetData) == null ? void 0 : l.originData;
  }
};
n(L, "_instance");
let FxUtil = L;
window.FxUtil = FxUtil;
class BattleLogger {
  constructor() {
    n(this, "logs", []);
    n(this, "battleData", []);
  }
  /**
   * 添加日志信息
   * @param message 日志消息
   */
  addLog(t) {
    const i = `[${(/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN")}] ${t}`;
    this.logs.push(i), console.log(i);
  }
  /**
   * 记录回合数据
   * @param round 回合数
   * @param data 回合数据
   */
  addRoundData(t, r) {
    this.battleData.push({
      round: t,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...r
    });
  }
  /**
   * 获取所有日志
   */
  getLogs() {
    return [...this.logs];
  }
  /**
   * 获取战斗数据
   */
  getBattleData() {
    return [...this.battleData];
  }
  /**
   * 清空日志
   */
  clear() {
    this.logs = [], this.battleData = [];
  }
  /**
   * 生成战斗报告
   */
  generateReport() {
    let t = `
========== 战斗报告 ==========
`;
    return t += this.logs.join(`
`), t += `

========== 战斗数据统计 ==========
`, t += JSON.stringify(this.battleData, null, 2), t += `
================================
`, t;
  }
}
class BattleEntity {
  // 职业
  constructor(t, r, i, s, l = 1, o = 1) {
    n(this, "name");
    // 角色名称
    n(this, "maxHp");
    // 最大生命值
    n(this, "currentHp");
    // 当前生命值
    n(this, "attack");
    // 攻击力
    n(this, "defense");
    // 防御力
    n(this, "level");
    // 等级
    n(this, "occupation");
    this.name = t, this.maxHp = r, this.currentHp = r, this.attack = i, this.defense = s, this.level = l, this.occupation = o;
  }
  /**
   * 判断角色是否存活
   */
  isAlive() {
    return this.currentHp > 0;
  }
  /**
   * 受到伤害
   * @param damage 伤害值
   * @returns 实际受到的伤害
   */
  takeDamage(t) {
    const r = Math.max(1, t - this.defense);
    return this.currentHp = Math.max(0, this.currentHp - r), r;
  }
  /**
   * 获取角色状态信息
   */
  getStatus() {
    return `${this.name} [Lv.${this.level}] HP: ${this.currentHp}/${this.maxHp} | 攻击: ${this.attack} | 防御: ${this.defense}`;
  }
  /**
   * 获取血量百分比
   */
  getHpPercentage() {
    return this.currentHp / this.maxHp * 100;
  }
}
class BattleSimulator {
  // 最大回合数，防止无限循环
  constructor(t, r, i) {
    n(this, "logger");
    n(this, "hero");
    n(this, "enemy");
    n(this, "round", 0);
    n(this, "maxRounds", 100);
    this.hero = t, this.enemy = r, this.logger = i;
  }
  /**
   * 计算伤害
   * @param attacker 攻击者
   * @param defender 防御者
   * @returns 伤害值
   */
  calculateDamage(t, r) {
    let i = t.attack - r.defense;
    const s = 0.8 + Math.random() * 0.4;
    return i = Math.floor(i * s), Math.max(1, i);
  }
  /**
   * 执行一次攻击
   * @param attacker 攻击者
   * @param defender 防御者
   * @returns 实际造成的伤害
   */
  executeAttack(t, r) {
    const i = this.calculateDamage(t, r), s = r.takeDamage(i);
    return this.logger.addLog(
      `  ${t.name} 攻击 ${r.name}，造成 ${s} 点伤害！（${r.name} 剩余血量: ${r.currentHp}/${r.maxHp}）`
    ), s;
  }
  /**
   * 战斗一回合
   * @returns 战斗是否结束
   */
  battleRound() {
    this.round++, this.logger.addLog(`
----- 第 ${this.round} 回合 -----`), this.logger.addLog(`${this.hero.getStatus()}`), this.logger.addLog(`${this.enemy.getStatus()}`);
    const t = {
      heroHp: this.hero.currentHp,
      heroHpPercent: this.hero.getHpPercentage(),
      enemyHp: this.enemy.currentHp,
      enemyHpPercent: this.enemy.getHpPercentage()
    }, r = this.executeAttack(this.hero, this.enemy), i = () => {
      t.enemyHp = this.enemy.currentHp, t.enemyHpPercent = this.enemy.getHpPercentage(), t.heroHp = this.hero.currentHp, t.heroHpPercent = this.hero.getHpPercentage();
    };
    if (!this.enemy.isAlive())
      return i(), this.logger.addLog(`
🎉 ${this.enemy.name} 被击败了！`), this.logger.addRoundData(this.round, {
        ...t,
        heroDamageDealt: r,
        enemyDamageDealt: 0,
        winner: this.hero.name,
        battleEnd: !0
      }), !0;
    const s = this.executeAttack(this.enemy, this.hero);
    return this.hero.isAlive() ? (i(), this.logger.addRoundData(this.round, {
      ...t,
      heroDamageDealt: r,
      enemyDamageDealt: s,
      battleEnd: !1
    }), !1) : (this.logger.addLog(`
💀 ${this.hero.name} 被击败了！`), i(), this.logger.addRoundData(this.round, {
      ...t,
      heroDamageDealt: r,
      enemyDamageDealt: s,
      winner: this.enemy.name,
      battleEnd: !0
    }), !0);
  }
  /**
   * 开始战斗
   * @returns 战斗结果
   */
  startBattle() {
    for (this.logger.addLog(`
========================================`), this.logger.addLog("⚔️  战斗开始！"), this.logger.addLog("========================================"), this.logger.addLog(`${this.hero.getStatus()}`), this.logger.addLog("VS"), this.logger.addLog(`${this.enemy.getStatus()}`), this.logger.addLog(`========================================
`); this.round < this.maxRounds && !this.battleRound(); )
      ;
    this.round >= this.maxRounds && this.logger.addLog(`
⏱️  战斗超时，平局！`);
    const t = this.hero.isAlive() ? this.hero.name : this.enemy.isAlive() ? this.enemy.name : "平局";
    return this.logger.addLog(`
========================================`), this.logger.addLog("📊 战斗结束统计"), this.logger.addLog("========================================"), this.logger.addLog(`胜利者: ${t}`), this.logger.addLog(`总回合数: ${this.round}`), this.logger.addLog(`${this.hero.name} 最终状态: ${this.hero.getStatus()}`), this.logger.addLog(`${this.enemy.name} 最终状态: ${this.enemy.getStatus()}`), this.logger.addLog(`========================================
`), {
      winner: t,
      rounds: this.round,
      battleData: this.logger.getBattleData()
    };
  }
}
let fxInit = !1;
async function init() {
  if (fxInit)
    return;
  const e = FxUtil.getInstance(), r = await (await fetch("./assets/fx.json")).json();
  e.loadConfig(r), fxInit = !0;
}
async function exampleMultipleBattles() {
  console.log(`

========================================`), console.log("示例2: 多场战斗对比测试"), console.log(`========================================
`), await init();
  const e = FxUtil.getInstance(), t = [], r = [
    { heroLevel: 5, enemyLevel: 5, name: "势均力敌" },
    { heroLevel: 10, enemyLevel: 5, name: "主角优势" },
    { heroLevel: 5, enemyLevel: 10, name: "敌人优势" },
    { heroLevel: 15, enemyLevel: 15, name: "高等级对决" },
    { heroLevel: 1, enemyLevel: 1, name: "新手对决" }
  ];
  for (const i of r) {
    console.log(`
🏆 战斗场景: ${i.name}`), console.log(`主角等级: ${i.heroLevel} | 敌人等级: ${i.enemyLevel}`);
    const s = new BattleLogger(), l = e.getInstanceDataByNameAndOccuAndLevel("主角1", 1, i.heroLevel), o = new BattleEntity(
      "勇者",
      l.hp,
      l.attack,
      l.defense,
      i.heroLevel,
      1
    ), u = e.getInstanceDataByNameAndOccuAndLevel("怪物1", 2, i.enemyLevel), h = new BattleEntity(
      "巨龙",
      u.hp,
      u.attack,
      u.defense,
      i.enemyLevel,
      1
    ), c = new BattleSimulator(o, h, s).startBattle();
    console.log(`[调试] ${i.name} 战斗结束`), console.log("[调试] result.battleData 存在?", !!c.battleData), console.log("[调试] result.battleData 长度:", c.battleData ? c.battleData.length : "undefined"), console.log("[调试] result.battleData 内容:", c.battleData), t.push({
      场景: i.name,
      主角等级: i.heroLevel,
      敌人等级: i.enemyLevel,
      胜利者: c.winner,
      回合数: c.rounds,
      主角最终HP: o.currentHp,
      敌人最终HP: h.currentHp,
      // 新增：保存详细的战斗数据
      battleData: c.battleData,
      heroName: "勇者",
      enemyName: "巨龙"
    });
  }
  return console.log(`

📊 多场战斗统计结果:`), console.table(t), console.log("[调试] 返回results前的最终检查:"), t.forEach((i, s) => {
    console.log(`  结果 ${s}: 场景="${i.场景}", battleData长度=${i.battleData ? i.battleData.length : "undefined"}`);
  }), t;
}
async function generatePVEData(e, t = 50) {
  var s;
  const r = [];
  await init();
  const i = FxUtil.getInstance();
  for (let l = 1; l <= t; l++) {
    await new Promise((o) => {
      requestAnimationFrame(() => o(!0));
    });
    try {
      const o = new BattleLogger(), u = i.getInstanceDataByNameAndOccuAndLevel("主角1", 1, l), h = new BattleEntity(
        "勇者",
        u.hp,
        u.attack,
        u.defense,
        l,
        1
      ), d = i.getInstanceDataByNameAndOccuAndLevel("怪物1", 1, l), c = new BattleEntity(
        "巨龙",
        d.hp,
        d.attack,
        d.defense,
        l,
        1
      );
      console.log("进行战斗", l), console.log("hero", h), console.log("enemy", c);
      const g = new BattleSimulator(h, c, o).startBattle();
      let p = 0, v = 0;
      if (g.battleData && g.battleData.length > 0)
        for (const m of g.battleData)
          m.heroDamageDealt !== void 0 && (p += m.heroDamageDealt, v++);
      const D = v > 0 ? p / v : 0, y = {
        level: l,
        hp: h.currentHp,
        // 主角剩余的血量
        damage: D,
        // 战斗中主角输出的伤害平均值
        rounds: g.rounds,
        // 实际战斗回合数
        battleData: g.battleData,
        // 完整的战斗数据（每回合的详细数据）
        heroName: "勇者",
        // 主角名称
        enemyName: "巨龙"
        // 敌人名称
      };
      (l === 1 || l === 10 || l === 50) && console.log(`[调试] 等级${l}数据:`, {
        level: y.level,
        rounds: y.rounds,
        battleDataLength: (s = y.battleData) == null ? void 0 : s.length,
        battleDataExists: !!y.battleData
      }), r.push(y), e && e(r, l, t), l % 10 === 0 && console.log(`PVE数据生成进度: ${l}/${t}`);
    } catch (o) {
      console.error(`等级${l}战斗模拟失败:`, o);
      const u = {
        level: l,
        hp: 100,
        damage: 20,
        rounds: 10,
        battleData: [],
        // 空数组
        heroName: "勇者",
        enemyName: "巨龙"
      };
      r.push(u), e && e(r, l, t);
    }
  }
  return console.log("PVE数据生成完成，共", r.length, "个等级"), r;
}
async function runAllExamples() {
  console.log(`

`), console.log("╔════════════════════════════════════════╗"), console.log("║   Seer Engine 多场战斗对比演示程序     ║"), console.log("║   Multiple Battles Comparison Demo      ║"), console.log("╚════════════════════════════════════════╝"), console.log(`
`), await init();
  try {
    await exampleMultipleBattles(), console.log(`
✅ 多场战斗对比示例运行完成！`), console.log(`查看控制台以获取详细的战斗日志和数据分析。
`);
  } catch (e) {
    console.error("❌ 运行示例时出错:", e);
  }
}
typeof window < "u" && (window.battleDemo = {
  runAllExamples,
  exampleMultipleBattles,
  generatePVEData
}, console.log("💡 使用方法:"), console.log("  - battleDemo.runAllExamples() - 运行多场战斗对比示例"), console.log("  - battleDemo.exampleMultipleBattles() - 多场对比"), console.log("  - battleDemo.generatePVEData() - 生成PVE测试数据"));
export {
  BattleEntity,
  BattleLogger,
  BattleSimulator,
  exampleMultipleBattles,
  generatePVEData,
  runAllExamples
};
