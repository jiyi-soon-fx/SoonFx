/**
 * 游戏公式类型定义
 * 定义了游戏中各种公式计算相关的类型，包括公式分类、参数类型、计算上下文等
 */

/**
 * 游戏公式分类枚举
 * 定义了不同类型的游戏公式，用于组织和分类各种游戏计算逻辑
 * @enum {string}
 */
export enum GameFormulaCategory {
    /** 战斗公式 */
    Combat = 'combat',
    /** 属性公式 */
    Attribute = 'attribute',
    /** 成长公式 */
    Growth = 'growth',
    /** 技能公式 */
    Skill = 'skill',
    /** 装备公式 */
    Equipment = 'equipment',
}

/**
 * 公式参数类型枚举
 * 定义了公式中使用的参数类型，包括基础属性、装备属性、技能属性等
 * @enum {string}
 */
export enum FormulaParameterType {
    /** 基础属性 */
    BaseAttribute = 'base_attribute',
    /** 装备属性 */
    EquipmentAttribute = 'equipment_attribute',
    /** 技能属性 */
    SkillAttribute = 'skill_attribute',
    /** 临时属性 */
    TemporaryAttribute = 'temporary_attribute',
    /** 常量 */
    Constant = 'constant',
}

/**
 * 公式参数接口
 * 定义公式中单个参数的结构，包含参数的基本信息和配置
 * @interface FormulaParameter
 */
export interface FormulaParameter {
    /** 参数名称 */
    name: string;
    /** 参数类型 */
    type: FormulaParameterType;
    /** 参数值 */
    value: number;
    /** 参数描述 */
    description?: string;
    /** 是否为必需参数 */
    required?: boolean;
}

/**
 * 游戏公式接口
 * 定义游戏公式的基本结构，包含公式的完整信息和配置
 * @interface GameFormula
 */
export interface GameFormula {
    /** 公式ID */
    id: string;
    /** 公式名称 */
    name: string;
    /** 公式分类 */
    category: GameFormulaCategory;
    /** 公式表达式 */
    expression: string;
    /** 参数列表 */
    parameters: FormulaParameter[];
    /** 公式描述 */
    description?: string;
    /** 公式版本 */
    version?: string;
    /** 创建时间 */
    createdAt?: Date;
    /** 更新时间 */
    updatedAt?: Date;
}

/**
 * 战斗公式类型枚举
 * 定义了战斗相关的公式类型，包括伤害计算、命中率、闪避率等战斗机制
 * @enum {string}
 */
export enum CombatFormulaType {
    /** 物理伤害 */
    PhysicalDamage = 'physical_damage',
    /** 魔法伤害 */
    MagicDamage = 'magic_damage',
    /** 治疗量 */
    Healing = 'healing',
    /** 护甲减免 */
    ArmorReduction = 'armor_reduction',
    /** 暴击伤害 */
    CriticalDamage = 'critical_damage',
    /** 命中率 */
    HitRate = 'hit_rate',
    /** 闪避率 */
    DodgeRate = 'dodge_rate',
}

/**
 * 属性公式类型枚举
 * 定义了角色属性相关的公式类型，包括生命值、攻击力、防御力等角色属性
 * @enum {string}
 */
export enum AttributeFormulaType {
    /** 生命值 */
    Health = 'health',
    /** 魔法值 */
    Mana = 'mana',
    /** 攻击力 */
    Attack = 'attack',
    /** 防御力 */
    Defense = 'defense',
    /** 速度 */
    Speed = 'speed',
    /** 暴击率 */
    CriticalRate = 'critical_rate',
    /** 暴击伤害 */
    CriticalDamage = 'critical_damage',
}

/**
 * 公式计算上下文接口
 * 定义公式计算时需要的上下文信息，包含角色等级、属性值等计算所需的数据
 * @interface FormulaContext
 */
export interface FormulaContext {
    /** 角色等级 */
    level: number;
    /** 基础属性 */
    baseAttributes: Record<string, number>;
    /** 装备属性 */
    equipmentAttributes: Record<string, number>;
    /** 技能属性 */
    skillAttributes: Record<string, number>;
    /** 临时属性 */
    temporaryAttributes: Record<string, number>;
    /** 常量值 */
    constants: Record<string, number>;
}

/**
 * 公式计算结果接口
 * 定义公式计算的结果结构，包含计算结果、成功状态、错误信息等
 * @interface FormulaResult
 */
export interface FormulaResult {
    /** 计算结果 */
    value: number;
    /** 计算是否成功 */
    success: boolean;
    /** 错误信息 */
    error?: string;
    /** 计算时间 */
    calculationTime?: number;
    /** 使用的参数值 */
    usedParameters?: Record<string, number>;
}

/**
 * 游戏公式工具类
 * 提供公式相关的工具方法，包括参数验证、公式计算、表达式评估等功能
 * @class GameFormulaUtils
 */
export class GameFormulaUtils {
    /**
     * 验证公式参数
     * @param formula 公式对象
     * @param context 计算上下文
     * @returns 验证结果
     */
    static validateParameters(formula: GameFormula, context: FormulaContext): boolean {
        const requiredParams = formula.parameters.filter(p => p.required);

        for (const param of requiredParams) {
            if (!this.getParameterValue(param, context)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 获取参数值
     * @param parameter 参数对象
     * @param context 计算上下文
     * @returns 参数值
     */
    static getParameterValue(parameter: FormulaParameter, context: FormulaContext): number | undefined {
        switch (parameter.type) {
            case FormulaParameterType.BaseAttribute:
                return context.baseAttributes[parameter.name];
            case FormulaParameterType.EquipmentAttribute:
                return context.equipmentAttributes[parameter.name];
            case FormulaParameterType.SkillAttribute:
                return context.skillAttributes[parameter.name];
            case FormulaParameterType.TemporaryAttribute:
                return context.temporaryAttributes[parameter.name];
            case FormulaParameterType.Constant:
                return context.constants[parameter.name];
            default:
                return parameter.value;
        }
    }

    /**
     * 计算公式结果
     * @param formula 公式对象
     * @param context 计算上下文
     * @returns 计算结果
     */
    static calculateFormula(formula: GameFormula, context: FormulaContext): FormulaResult {
        const startTime = Date.now();

        try {
            // 验证参数
            if (!this.validateParameters(formula, context)) {
                return {
                    value: 0,
                    success: false,
                    error: '缺少必需参数',
                    calculationTime: Date.now() - startTime,
                };
            }

            // 获取参数值
            const parameterValues: Record<string, number> = {};
            for (const param of formula.parameters) {
                const value = this.getParameterValue(param, context);
                if (value !== undefined) {
                    parameterValues[param.name] = value;
                }
            }

            // 这里应该实现实际的公式计算逻辑
            // 目前返回模拟结果
            const result = this.evaluateExpression(formula.expression, parameterValues);

            return {
                value: result,
                success: true,
                calculationTime: Date.now() - startTime,
                usedParameters: parameterValues,
            };
        } catch (error) {
            return {
                value: 0,
                success: false,
                error: error instanceof Error ? error.message : '未知错误',
                calculationTime: Date.now() - startTime,
            };
        }
    }

    /**
     * 评估表达式（简化实现）
     * @param expression 表达式
     * @param parameters 参数值
     * @returns 计算结果
     */
    private static evaluateExpression(expression: string, parameters: Record<string, number>): number {
        // 这里应该实现安全的表达式计算
        // 目前返回模拟值
        return Object.values(parameters).reduce((sum, value) => sum + value, 0);
    }
}


