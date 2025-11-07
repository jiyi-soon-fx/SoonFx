/**
 * 通用类型定义
 * 用于替换项目中的 any 类型
 */

// ==================== 基础类型 ====================

/**
 * 通用对象类型
 */
export type GenericObject = Record<string, unknown>;

/**
 * 通用函数类型
 */
export type GenericFunction = (...args: unknown[]) => unknown;

/**
 * 可空类型
 */
export type Nullable<T> = T | null;

/**
 * 可选类型
 */
export type Optional<T> = T | undefined;

// ==================== 消息系统类型 ====================

/**
 * 消息类型枚举
 */
export enum MessageType {
    REQUEST = 'request',
    RESPONSE = 'response',
    NOTIFICATION = 'notification',
    ERROR = 'error',
    HEARTBEAT = 'heartbeat',
    BROADCAST = 'broadcast'
}

/**
 * 消息数据接口
 */
export interface MessageData {
    [key: string]: unknown;
}

/**
 * 用户数据接口
 */
export interface UserData {
    id?: string | number;
    name?: string;
    [key: string]: unknown;
}

// ==================== 数据模型类型 ====================


/**
 * 节点类型枚举
 */
export enum NodeType {
    VARIABLE = 0,
    MACRO = 1,
    SHEET = 2,
    CALCULATION_LAYER = 3,
    LOGICAL_NUMBER_LIST = 4,
    LOGICAL_SLIDER = 5,
    LOGICAL_LIST = 6,
    LOGICAL_BASIC = 7
}

/**
 * 基础实体接口
 */
export interface BaseEntity {
    id: number;
    name: string;
    type: string | number;
}

/**
 * 视图元素类型
 */
export type ViewElement = HTMLElement | null;

// ==================== 表格数据类型 ====================

/**
 * 表格信息接口
 */
export interface SheetInfo {
    uniqueInfo?: {
        row: number;
        col: number;
    };
    data?: Map<string, CellData>;
}

/**
 * 单元格数据接口
 */
export interface CellData {
    v: number | string;
    type?: string;
    f?: string;
    getValue?: (sheets: SheetInfo[]) => number | string;
}

/**
 * 原始数据接口
 */
export interface OriginData {
    sheets: SheetInfo[];
}

/**
 * 单元格输出接口
 */
export interface CellOutput {
    cellData?: CellData;
    source?: {
        getValue?: () => number | string;
    };
}

// ==================== 事件系统类型 ====================

/**
 * 事件监听器类型
 */
export type EventListener = (type: string, data: MessageData) => unknown;

/**
 * 事件列表类型
 */
export type EventList = Record<string, GenericFunction>;

// ==================== 游戏相关类型 ====================

/**
 * 玩家数据接口
 */
export interface PlayerData {
    name: string;
    hp: number;
    maxHp: number;
    [key: string]: unknown;
}

/**
 * 战斗实体接口
 */
export interface BattleEntity {
    id: number;
    name: string;
    hp: number;
    [key: string]: unknown;
}

/**
 * 敌对实体接口
 */
export interface EnemyEntity {
    id: number;
    name: string;
    hp: number;
    [key: string]: unknown;
}

// ==================== 工具类型 ====================

/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 非空类型
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 数组元素类型
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// ==================== 函数类型 ====================

/**
 * 构造函数类型
 */
export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * 异步函数类型
 */
export type AsyncFunction<T = unknown> = (...args: unknown[]) => Promise<T>;

/**
 * 回调函数类型
 */
export type Callback<T = unknown> = (data: T) => void;

// ==================== 导出所有类型 ====================
// 注意：所有类型已经在上面定义时直接导出，这里不需要重复导出
