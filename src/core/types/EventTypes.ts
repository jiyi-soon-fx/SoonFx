/**
 * 事件类型定义
 * 定义了系统中所有事件相关的类型，包括事件分类、优先级、数据结构和工具方法
 */

/**
 * 事件类型枚举
 * 定义了系统中所有可能的事件类型，用于分类和管理不同类型的事件
 * @enum {string}
 */
export enum EventType {
    /** 系统事件 */
    System = 'system',
    /** 用户事件 */
    User = 'user',
    /** 游戏事件 */
    Game = 'game',
    /** 数据事件 */
    Data = 'data',
    /** 通信事件 */
    Communication = 'communication',
    /** 错误事件 */
    Error = 'error',
}

/**
 * 系统事件子类型枚举
 * 定义了系统相关的事件子类型，包括启动、关闭、错误等系统级事件
 * @enum {string}
 */
export enum SystemEventType {
    /** 系统启动 */
    Startup = 'startup',
    /** 系统关闭 */
    Shutdown = 'shutdown',
    /** 系统错误 */
    Error = 'error',
    /** 内存警告 */
    MemoryWarning = 'memory_warning',
    /** 性能警告 */
    PerformanceWarning = 'performance_warning',
}

/**
 * 用户事件子类型枚举
 * 定义了用户交互相关的事件子类型，包括点击、拖拽、键盘输入等用户操作
 * @enum {string}
 */
export enum UserEventType {
    /** 点击事件 */
    Click = 'click',
    /** 双击事件 */
    DoubleClick = 'double_click',
    /** 右键点击 */
    RightClick = 'right_click',
    /** 拖拽事件 */
    Drag = 'drag',
    /** 悬停事件 */
    Hover = 'hover',
    /** 键盘输入 */
    KeyInput = 'key_input',
    /** 鼠标移动 */
    MouseMove = 'mouse_move',
}

/**
 * 游戏事件子类型枚举
 * 定义了游戏逻辑相关的事件子类型，包括战斗、升级、物品获得等游戏内事件
 * @enum {string}
 */
export enum GameEventType {
    /** 战斗开始 */
    BattleStart = 'battle_start',
    /** 战斗结束 */
    BattleEnd = 'battle_end',
    /** 角色升级 */
    LevelUp = 'level_up',
    /** 获得物品 */
    ItemObtained = 'item_obtained',
    /** 技能使用 */
    SkillUsed = 'skill_used',
    /** 任务完成 */
    QuestCompleted = 'quest_completed',
}

/**
 * 数据事件子类型枚举
 * 定义了数据操作相关的事件子类型，包括创建、更新、删除、加载等数据操作
 * @enum {string}
 */
export enum DataEventType {
    /** 数据创建 */
    Created = 'created',
    /** 数据更新 */
    Updated = 'updated',
    /** 数据删除 */
    Deleted = 'deleted',
    /** 数据加载 */
    Loaded = 'loaded',
    /** 数据保存 */
    Saved = 'saved',
    /** 数据同步 */
    Synced = 'synced',
}

/**
 * 通信事件子类型枚举
 * 定义了通信相关的事件子类型，包括消息发送、接收、连接管理等网络通信事件
 * @enum {string}
 */
export enum CommunicationEventType {
    /** 消息发送 */
    MessageSent = 'message_sent',
    /** 消息接收 */
    MessageReceived = 'message_received',
    /** 连接建立 */
    Connected = 'connected',
    /** 连接断开 */
    Disconnected = 'disconnected',
    /** 网络错误 */
    NetworkError = 'network_error',
}

/**
 * 事件优先级枚举
 * 定义了事件处理的优先级，用于控制事件处理的顺序和重要性
 * @enum {number}
 */
export enum EventPriority {
    /** 低优先级 */
    Low = 1,
    /** 普通优先级 */
    Normal = 2,
    /** 高优先级 */
    High = 3,
    /** 紧急优先级 */
    Critical = 4,
}

/**
 * 事件数据接口
 * 定义事件携带的数据结构，包含事件的完整信息和元数据
 * @interface EventData
 */
export interface EventData {
    /** 事件ID */
    id: string;
    /** 事件类型 */
    type: EventType;
    /** 事件子类型 */
    subType: string;
    /** 事件时间戳 */
    timestamp: number;
    /** 事件数据 */
    data: Record<string, any>;
    /** 事件来源 */
    source?: string;
    /** 事件目标 */
    target?: string;
    /** 事件优先级 */
    priority?: EventPriority;
}

/**
 * 事件监听器接口
 * 定义事件监听器的结构，包含监听器配置和回调函数
 * @interface EventListener
 */
export interface EventListener {
    /** 监听器ID */
    id: string;
    /** 事件类型 */
    eventType: EventType;
    /** 事件子类型 */
    subType?: string;
    /** 回调函数 */
    callback: (event: EventData) => void;
    /** 优先级 */
    priority?: EventPriority;
    /** 是否只执行一次 */
    once?: boolean;
    /** 是否启用 */
    enabled?: boolean;
}

/**
 * 事件管理器接口
 * 定义事件管理器的基本功能，包括监听器管理和事件触发
 * @interface EventManager
 */
export interface EventManager {
    /** 添加事件监听器 */
    addListener(listener: EventListener): void;
    /** 移除事件监听器 */
    removeListener(listenerId: string): void;
    /** 触发事件 */
    emit(event: EventData): void;
    /** 移除所有监听器 */
    removeAllListeners(): void;
    /** 获取监听器数量 */
    getListenerCount(eventType?: EventType): number;
}

/**
 * 事件过滤器接口
 * 定义事件过滤的条件，用于筛选和处理特定的事件
 * @interface EventFilter
 */
export interface EventFilter {
    /** 事件类型 */
    eventType?: EventType;
    /** 事件子类型 */
    subType?: string;
    /** 事件来源 */
    source?: string;
    /** 事件目标 */
    target?: string;
    /** 优先级范围 */
    priorityRange?: {
        min: EventPriority;
        max: EventPriority;
    };
    /** 时间范围 */
    timeRange?: {
        start: number;
        end: number;
    };
}

/**
 * 事件工具类
 * 提供事件相关的工具方法，包括事件创建、ID生成、过滤等功能
 * @class EventUtils
 */
export class EventUtils {
    /**
     * 创建事件数据
     * @param type 事件类型
     * @param subType 事件子类型
     * @param data 事件数据
     * @param options 选项
     * @returns 事件数据对象
     */
    static createEventData(
        type: EventType,
        subType: string,
        data: Record<string, any> = {},
        options: {
            source?: string;
            target?: string;
            priority?: EventPriority;
        } = {}
    ): EventData {
        return {
            id: this.generateEventId(),
            type,
            subType,
            timestamp: Date.now(),
            data,
            ...options,
        };
    }

    /**
     * 生成事件ID
     * @returns 唯一的事件ID
     */
    static generateEventId(): string {
        return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 检查事件是否匹配过滤器
     * @param event 事件数据
     * @param filter 过滤器
     * @returns 是否匹配
     */
    static matchesFilter(event: EventData, filter: EventFilter): boolean {
        if (filter.eventType && event.type !== filter.eventType) {
            return false;
        }

        if (filter.subType && event.subType !== filter.subType) {
            return false;
        }

        if (filter.source && event.source !== filter.source) {
            return false;
        }

        if (filter.target && event.target !== filter.target) {
            return false;
        }

        if (filter.priorityRange) {
            const priority = event.priority || EventPriority.Normal;
            if (priority < filter.priorityRange.min || priority > filter.priorityRange.max) {
                return false;
            }
        }

        if (filter.timeRange) {
            if (event.timestamp < filter.timeRange.start || event.timestamp > filter.timeRange.end) {
                return false;
            }
        }

        return true;
    }

    /**
     * 获取事件类型显示名称
     * @param eventType 事件类型
     * @returns 显示名称
     */
    static getEventTypeDisplayName(eventType: EventType): string {
        const nameMap: Record<EventType, string> = {
            [EventType.System]: '系统事件',
            [EventType.User]: '用户事件',
            [EventType.Game]: '游戏事件',
            [EventType.Data]: '数据事件',
            [EventType.Communication]: '通信事件',
            [EventType.Error]: '错误事件',
        };
        return nameMap[eventType] || '未知事件';
    }

    /**
     * 获取优先级显示名称
     * @param priority 优先级
     * @returns 显示名称
     */
    static getPriorityDisplayName(priority: EventPriority): string {
        const nameMap: Record<EventPriority, string> = {
            [EventPriority.Low]: '低优先级',
            [EventPriority.Normal]: '普通优先级',
            [EventPriority.High]: '高优先级',
            [EventPriority.Critical]: '紧急优先级',
        };
        return nameMap[priority] || '未知优先级';
    }
}



