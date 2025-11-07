/**
 * 消息类型定义
 * 定义了系统中所有消息相关的类型，包括消息分类、状态、优先级和工具方法
 */

/**
 * 消息类型枚举
 * 定义了系统中所有可能的消息类型，用于分类和管理不同类型的消息
 * @enum {string}
 */
export enum MessageType {
    /** 请求消息 */
    Request = 'request',
    /** 响应消息 */
    Response = 'response',
    /** 通知消息 */
    Notification = 'notification',
    /** 错误消息 */
    Error = 'error',
    /** 心跳消息 */
    Heartbeat = 'heartbeat',
    /** 广播消息 */
    Broadcast = 'broadcast',
}

/**
 * 消息优先级枚举
 * 定义了消息处理的优先级，用于控制消息处理的顺序和重要性
 * @enum {number}
 */
export enum MessagePriority {
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
 * 消息状态枚举
 * 定义了消息的处理状态，用于跟踪消息的生命周期
 * @enum {string}
 */
export enum MessageStatus {
    /** 待发送 */
    Pending = 'pending',
    /** 已发送 */
    Sent = 'sent',
    /** 已接收 */
    Received = 'received',
    /** 处理中 */
    Processing = 'processing',
    /** 已完成 */
    Completed = 'completed',
    /** 失败 */
    Failed = 'failed',
    /** 已取消 */
    Cancelled = 'cancelled',
}

/**
 * 消息方向枚举
 * 定义了消息的传输方向，用于标识消息的流向
 * @enum {string}
 */
export enum MessageDirection {
    /** 发送 */
    Outgoing = 'outgoing',
    /** 接收 */
    Incoming = 'incoming',
    /** 双向 */
    Bidirectional = 'bidirectional',
}

/**
 * 消息内容类型枚举
 * 定义了消息内容的类型，包括文本、JSON、二进制、文件等不同格式
 * @enum {string}
 */
export enum MessageContentType {
    /** 文本 */
    Text = 'text',
    /** JSON */
    JSON = 'json',
    /** 二进制 */
    Binary = 'binary',
    /** 文件 */
    File = 'file',
    /** 图片 */
    Image = 'image',
    /** 音频 */
    Audio = 'audio',
    /** 视频 */
    Video = 'video',
}

/**
 * 消息头接口
 * 定义消息的头部信息，包含消息的元数据和配置信息
 * @interface MessageHeader
 */
export interface MessageHeader {
    /** 消息ID */
    id: string;
    /** 消息类型 */
    type: MessageType;
    /** 消息优先级 */
    priority: MessagePriority;
    /** 发送时间 */
    timestamp: number;
    /** 发送者 */
    sender: string;
    /** 接收者 */
    receiver?: string;
    /** 消息状态 */
    status: MessageStatus;
    /** 消息方向 */
    direction: MessageDirection;
    /** 内容类型 */
    contentType: MessageContentType;
    /** 消息大小 */
    size?: number;
    /** 过期时间 */
    expiresAt?: number;
    /** 重试次数 */
    retryCount?: number;
    /** 最大重试次数 */
    maxRetries?: number;
}

/**
 * 消息体接口
 * 定义消息的主体内容，包含消息的实际数据和元信息
 * @interface MessageBody
 */
export interface MessageBody {
    /** 消息内容 */
    content: any;
    /** 消息元数据 */
    metadata?: Record<string, any>;
    /** 消息标签 */
    tags?: string[];
    /** 消息分类 */
    category?: string;
    /** 消息版本 */
    version?: string;
}

/**
 * 消息接口
 * 定义完整的消息结构，包含消息头和消息体
 * @interface Message
 */
export interface Message {
    /** 消息头 */
    header: MessageHeader;
    /** 消息体 */
    body: MessageBody;
}

/**
 * 消息处理器接口
 * 定义消息处理器的基本功能，包含消息处理逻辑和配置
 * @interface MessageHandler
 */
export interface MessageHandler {
    /** 处理器ID */
    id: string;
    /** 支持的消息类型 */
    supportedTypes: MessageType[];
    /** 处理函数 */
    handle: (message: Message) => Promise<Message | void>;
    /** 优先级 */
    priority?: MessagePriority;
    /** 是否启用 */
    enabled?: boolean;
}

/**
 * 消息队列接口
 * 定义消息队列的基本功能，包含消息的入队、出队、查看等操作
 * @interface MessageQueue
 */
export interface MessageQueue {
    /** 队列名称 */
    name: string;
    /** 队列大小 */
    size: number;
    /** 最大大小 */
    maxSize: number;
    /** 是否已满 */
    isFull: boolean;
    /** 是否为空 */
    isEmpty: boolean;
    /** 添加消息 */
    enqueue(message: Message): boolean;
    /** 获取消息 */
    dequeue(): Message | undefined;
    /** 查看队列头部消息 */
    peek(): Message | undefined;
    /** 清空队列 */
    clear(): void;
}

/**
 * 消息路由接口
 * 定义消息路由的规则，用于控制消息的传输路径
 * @interface MessageRoute
 */
export interface MessageRoute {
    /** 路由ID */
    id: string;
    /** 源地址 */
    source: string;
    /** 目标地址 */
    target: string;
    /** 路由条件 */
    condition?: (message: Message) => boolean;
    /** 路由优先级 */
    priority?: number;
    /** 是否启用 */
    enabled?: boolean;
}

/**
 * 消息过滤器接口
 * 定义消息过滤的条件，用于筛选和处理特定的消息
 * @interface MessageFilter
 */
export interface MessageFilter {
    /** 消息类型 */
    messageType?: MessageType;
    /** 发送者 */
    sender?: string;
    /** 接收者 */
    receiver?: string;
    /** 优先级范围 */
    priorityRange?: {
        min: MessagePriority;
        max: MessagePriority;
    };
    /** 状态 */
    status?: MessageStatus;
    /** 内容类型 */
    contentType?: MessageContentType;
    /** 时间范围 */
    timeRange?: {
        start: number;
        end: number;
    };
    /** 标签 */
    tags?: string[];
}

/**
 * 消息工具类
 * 提供消息相关的工具方法，包括消息创建、ID生成、过滤、验证等功能
 * @class MessageUtils
 */
export class MessageUtils {
    /**
     * 创建消息
     * @param type 消息类型
     * @param content 消息内容
     * @param options 选项
     * @returns 消息对象
     */
    static createMessage(
        type: MessageType,
        content: any,
        options: {
            sender?: string;
            receiver?: string;
            priority?: MessagePriority;
            contentType?: MessageContentType;
            expiresAt?: number;
        } = {}
    ): Message {
        const header: MessageHeader = {
            id: this.generateMessageId(),
            type,
            priority: options.priority || MessagePriority.Normal,
            timestamp: Date.now(),
            sender: options.sender || 'system',
            receiver: options.receiver,
            status: MessageStatus.Pending,
            direction: MessageDirection.Outgoing,
            contentType: options.contentType || MessageContentType.JSON,
            retryCount: 0,
            maxRetries: 3,
            ...(options.expiresAt && { expiresAt: options.expiresAt }),
        };

        const body: MessageBody = {
            content,
        };

        return { header, body };
    }

    /**
     * 生成消息ID
     * @returns 唯一的消息ID
     */
    static generateMessageId(): string {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 检查消息是否匹配过滤器
     * @param message 消息对象
     * @param filter 过滤器
     * @returns 是否匹配
     */
    static matchesFilter(message: Message, filter: MessageFilter): boolean {
        if (filter.messageType && message.header.type !== filter.messageType) {
            return false;
        }

        if (filter.sender && message.header.sender !== filter.sender) {
            return false;
        }

        if (filter.receiver && message.header.receiver !== filter.receiver) {
            return false;
        }

        if (filter.priorityRange) {
            if (message.header.priority < filter.priorityRange.min ||
                message.header.priority > filter.priorityRange.max) {
                return false;
            }
        }

        if (filter.status && message.header.status !== filter.status) {
            return false;
        }

        if (filter.contentType && message.header.contentType !== filter.contentType) {
            return false;
        }

        if (filter.timeRange) {
            if (message.header.timestamp < filter.timeRange.start ||
                message.header.timestamp > filter.timeRange.end) {
                return false;
            }
        }

        if (filter.tags && message.body.tags) {
            const hasMatchingTag = filter.tags.some(tag =>
                message.body.tags!.includes(tag)
            );
            if (!hasMatchingTag) {
                return false;
            }
        }

        return true;
    }

    /**
     * 检查消息是否过期
     * @param message 消息对象
     * @returns 是否过期
     */
    static isExpired(message: Message): boolean {
        if (!message.header.expiresAt) {
            return false;
        }
        return Date.now() > message.header.expiresAt;
    }

    /**
     * 检查消息是否可以重试
     * @param message 消息对象
     * @returns 是否可以重试
     */
    static canRetry(message: Message): boolean {
        return (message.header.retryCount || 0) < (message.header.maxRetries || 3);
    }

    /**
     * 获取消息类型显示名称
     * @param messageType 消息类型
     * @returns 显示名称
     */
    static getMessageTypeDisplayName(messageType: MessageType): string {
        const nameMap: Record<MessageType, string> = {
            [MessageType.Request]: '请求消息',
            [MessageType.Response]: '响应消息',
            [MessageType.Notification]: '通知消息',
            [MessageType.Error]: '错误消息',
            [MessageType.Heartbeat]: '心跳消息',
            [MessageType.Broadcast]: '广播消息',
        };
        return nameMap[messageType] || '未知消息';
    }

    /**
     * 获取消息状态显示名称
     * @param status 消息状态
     * @returns 显示名称
     */
    static getMessageStatusDisplayName(status: MessageStatus): string {
        const nameMap: Record<MessageStatus, string> = {
            [MessageStatus.Pending]: '待发送',
            [MessageStatus.Sent]: '已发送',
            [MessageStatus.Received]: '已接收',
            [MessageStatus.Processing]: '处理中',
            [MessageStatus.Completed]: '已完成',
            [MessageStatus.Failed]: '失败',
            [MessageStatus.Cancelled]: '已取消',
        };
        return nameMap[status] || '未知状态';
    }
}


