import "@soonfx/fx";
import FxUtil from "./FxUtil";

/**
 * 战斗日志类 - 负责记录战斗过程中的所有日志和数据
 */
class BattleLogger {
    private logs: string[] = [];
    private battleData: any[] = [];

    /**
     * 添加日志信息
     * @param message 日志消息
     */
    addLog(message: string) {
        const timestamp = new Date().toLocaleTimeString('zh-CN');
        const logMessage = `[${timestamp}] ${message}`;
        this.logs.push(logMessage);
        console.log(logMessage);
    }

    /**
     * 记录回合数据
     * @param round 回合数
     * @param data 回合数据
     */
    addRoundData(round: number, data: any) {
        this.battleData.push({
            round,
            timestamp: new Date().toISOString(),
            ...data
        });
    }

    /**
     * 获取所有日志
     */
    getLogs(): string[] {
        return [...this.logs];
    }

    /**
     * 获取战斗数据
     */
    getBattleData(): any[] {
        return [...this.battleData];
    }

    /**
     * 清空日志
     */
    clear() {
        this.logs = [];
        this.battleData = [];
    }

    /**
     * 生成战斗报告
     */
    generateReport(): string {
        let report = '\n========== 战斗报告 ==========\n';
        report += this.logs.join('\n');
        report += '\n\n========== 战斗数据统计 ==========\n';
        report += JSON.stringify(this.battleData, null, 2);
        report += '\n================================\n';
        return report;
    }
}

/**
 * 战斗实体类 - 表示战斗中的一个角色（主角或敌人）
 */
class BattleEntity {
    name: string;           // 角色名称
    maxHp: number;          // 最大生命值
    currentHp: number;      // 当前生命值
    attack: number;         // 攻击力
    defense: number;        // 防御力
    level: number;          // 等级
    occupation: number;     // 职业

    constructor(
        name: string,
        hp: number,
        attack: number,
        defense: number,
        level: number = 1,
        occupation: number = 1
    ) {
        this.name = name;
        this.maxHp = hp;
        this.currentHp = hp;
        this.attack = attack;
        this.defense = defense;
        this.level = level;
        this.occupation = occupation;
    }

    /**
     * 判断角色是否存活
     */
    isAlive(): boolean {
        return this.currentHp > 0;
    }

    /**
     * 受到伤害
     * @param damage 伤害值
     * @returns 实际受到的伤害
     */
    takeDamage(damage: number): number {
        const actualDamage = Math.max(1, damage - this.defense); // 最少造成1点伤害
        this.currentHp = Math.max(0, this.currentHp - actualDamage);
        return actualDamage;
    }

    /**
     * 获取角色状态信息
     */
    getStatus(): string {
        return `${this.name} [Lv.${this.level}] HP: ${this.currentHp}/${this.maxHp} | 攻击: ${this.attack} | 防御: ${this.defense}`;
    }

    /**
     * 获取血量百分比
     */
    getHpPercentage(): number {
        return (this.currentHp / this.maxHp) * 100;
    }
}

/**
 * 战斗模拟器 - 模拟两个角色之间的战斗
 */
class BattleSimulator {
    private logger: BattleLogger;
    private hero: BattleEntity;
    private enemy: BattleEntity;
    private round: number = 0;
    private maxRounds: number = 100; // 最大回合数，防止无限循环

    constructor(hero: BattleEntity, enemy: BattleEntity, logger: BattleLogger) {
        this.hero = hero;
        this.enemy = enemy;
        this.logger = logger;
    }

    /**
     * 计算伤害
     * @param attacker 攻击者
     * @param defender 防御者
     * @returns 伤害值
     */
    private calculateDamage(attacker: BattleEntity, defender: BattleEntity): number {
        // 基础伤害 = 攻击力 - 防御力
        let damage = attacker.attack - defender.defense;

        // 添加一些随机性（80% - 120%）
        const randomFactor = 0.8 + Math.random() * 0.4;
        damage = Math.floor(damage * randomFactor);

        // 最少造成1点伤害
        return Math.max(1, damage);
    }

    /**
     * 执行一次攻击
     * @param attacker 攻击者
     * @param defender 防御者
     * @returns 实际造成的伤害
     */
    private executeAttack(attacker: BattleEntity, defender: BattleEntity): number {
        const damage = this.calculateDamage(attacker, defender);
        const actualDamage = defender.takeDamage(damage);

        this.logger.addLog(
            `  ${attacker.name} 攻击 ${defender.name}，造成 ${actualDamage} 点伤害！` +
            `（${defender.name} 剩余血量: ${defender.currentHp}/${defender.maxHp}）`
        );

        return actualDamage;
    }

    /**
     * 战斗一回合
     * @returns 战斗是否结束
     */
    private battleRound(): boolean {
        this.round++;
        this.logger.addLog(`\n----- 第 ${this.round} 回合 -----`);
        this.logger.addLog(`${this.hero.getStatus()}`);
        this.logger.addLog(`${this.enemy.getStatus()}`);

        // 记录回合开始时的数据
        const roundStartData = {
            heroHp: this.hero.currentHp,
            heroHpPercent: this.hero.getHpPercentage(),
            enemyHp: this.enemy.currentHp,
            enemyHpPercent: this.enemy.getHpPercentage()
        };

        // 主角先攻击
        const heroDamage = this.executeAttack(this.hero, this.enemy);

        const updateBattleData = () => {
            roundStartData.enemyHp = this.enemy.currentHp;
            roundStartData.enemyHpPercent = this.enemy.getHpPercentage();
            roundStartData.heroHp = this.hero.currentHp;
            roundStartData.heroHpPercent = this.hero.getHpPercentage();
        }
        // 检查敌人是否被击败
        if (!this.enemy.isAlive()) {
            updateBattleData();
            this.logger.addLog(`\n🎉 ${this.enemy.name} 被击败了！`);
            this.logger.addRoundData(this.round, {
                ...roundStartData,
                heroDamageDealt: heroDamage,
                enemyDamageDealt: 0,
                winner: this.hero.name,
                battleEnd: true
            });
            return true;
        }

        // 敌人反击
        const enemyDamage = this.executeAttack(this.enemy, this.hero);

        // 检查主角是否被击败
        if (!this.hero.isAlive()) {
            this.logger.addLog(`\n💀 ${this.hero.name} 被击败了！`);
            updateBattleData();
            this.logger.addRoundData(this.round, {
                ...roundStartData,
                heroDamageDealt: heroDamage,
                enemyDamageDealt: enemyDamage,
                winner: this.enemy.name,
                battleEnd: true
            });
            return true;
        }

        updateBattleData();
        // 记录回合数据
        this.logger.addRoundData(this.round, {
            ...roundStartData,
            heroDamageDealt: heroDamage,
            enemyDamageDealt: enemyDamage,
            battleEnd: false
        });

        return false;
    }

    /**
     * 开始战斗
     * @returns 战斗结果
     */
    public startBattle(): { winner: string, rounds: number, battleData: any[] } {
        this.logger.addLog('\n========================================');
        this.logger.addLog('⚔️  战斗开始！');
        this.logger.addLog('========================================');
        this.logger.addLog(`${this.hero.getStatus()}`);
        this.logger.addLog(`VS`);
        this.logger.addLog(`${this.enemy.getStatus()}`);
        this.logger.addLog('========================================\n');

        // 战斗循环
        while (this.round < this.maxRounds) {
            const battleEnded = this.battleRound();

            if (battleEnded) {
                break;
            }
        }

        // 检查是否达到最大回合数
        if (this.round >= this.maxRounds) {
            this.logger.addLog('\n⏱️  战斗超时，平局！');
        }

        // 生成战斗总结
        const winner = this.hero.isAlive() ? this.hero.name : (this.enemy.isAlive() ? this.enemy.name : '平局');

        this.logger.addLog('\n========================================');
        this.logger.addLog('📊 战斗结束统计');
        this.logger.addLog('========================================');
        this.logger.addLog(`胜利者: ${winner}`);
        this.logger.addLog(`总回合数: ${this.round}`);
        this.logger.addLog(`${this.hero.name} 最终状态: ${this.hero.getStatus()}`);
        this.logger.addLog(`${this.enemy.name} 最终状态: ${this.enemy.getStatus()}`);
        this.logger.addLog('========================================\n');

        // (window as any).battleData = this.logger.getBattleData()
        // debugger;
        return {
            winner,
            rounds: this.round,
            battleData: this.logger.getBattleData()
        };
    }
}

let fxInit = false;
async function init() {


    if (fxInit) {
        return;
    }
    // 加载配置
    const fxUtil = FxUtil.getInstance();
    const response = await fetch('./assets/fx.json');
    const seerConfig = await response.json();
    fxUtil.loadConfig(seerConfig);
    fxInit = true;

}


/**
 * 示例2: 多场战斗对比测试
 * 测试不同等级下的战斗结果
 */
async function exampleMultipleBattles() {
    console.log('\n\n========================================');
    console.log('示例2: 多场战斗对比测试');
    console.log('========================================\n');

    await init();
    const seerUtil = FxUtil.getInstance();
    const results = [];

    // 测试不同等级的战斗场景
    const testCases = [
        { heroLevel: 5, enemyLevel: 5, name: "势均力敌" },
        { heroLevel: 10, enemyLevel: 5, name: "主角优势" },
        { heroLevel: 5, enemyLevel: 10, name: "敌人优势" },
        { heroLevel: 15, enemyLevel: 15, name: "高等级对决" },
        { heroLevel: 1, enemyLevel: 1, name: "新手对决" },
    ];

    for (const testCase of testCases) {
        console.log(`\n🏆 战斗场景: ${testCase.name}`);
        console.log(`主角等级: ${testCase.heroLevel} | 敌人等级: ${testCase.enemyLevel}`);

        const logger = new BattleLogger();

        // 创建主角
        const heroData = seerUtil.getInstanceDataByNameAndOccuAndLevel("主角1", 1, testCase.heroLevel);
        const hero = new BattleEntity(
            "勇者",
            heroData.hp,
            heroData.attack,
            heroData.defense,
            testCase.heroLevel,
            1
        );

        // 创建敌人
        const enemyData = seerUtil.getInstanceDataByNameAndOccuAndLevel("怪物1", 2, testCase.enemyLevel);
        const enemy = new BattleEntity(
            "巨龙",
            enemyData.hp,
            enemyData.attack,
            enemyData.defense,
            testCase.enemyLevel,
            1
        );

        // 进行战斗
        const simulator = new BattleSimulator(hero, enemy, logger);
        const result = simulator.startBattle();

        // 调试：检查战斗数据
        console.log(`[调试] ${testCase.name} 战斗结束`);
        console.log(`[调试] result.battleData 存在?`, !!result.battleData);
        console.log(`[调试] result.battleData 长度:`, result.battleData ? result.battleData.length : 'undefined');
        console.log(`[调试] result.battleData 内容:`, result.battleData);

        // 收集结果（包含详细的战斗数据）
        results.push({
            场景: testCase.name,
            主角等级: testCase.heroLevel,
            敌人等级: testCase.enemyLevel,
            胜利者: result.winner,
            回合数: result.rounds,
            主角最终HP: hero.currentHp,
            敌人最终HP: enemy.currentHp,
            // 新增：保存详细的战斗数据
            battleData: result.battleData,
            heroName: "勇者",
            enemyName: "巨龙"
        });
    }

    console.log('\n\n📊 多场战斗统计结果:');
    console.table(results);

    // 调试：验证返回的数据包含battleData
    console.log('[调试] 返回results前的最终检查:');
    results.forEach((r, index) => {
        console.log(`  结果 ${index}: 场景="${r.场景}", battleData长度=${r.battleData ? r.battleData.length : 'undefined'}`);
    });

    return results;
}



/**
 * 生成指定范围的PVE测试数据（使用实际战斗数值）
 * 对指定范围的每个等级进行实际战斗模拟
 * @param onProgress 进度回调函数，每完成一个等级的战斗就调用一次
 * @param count 等级数量，默认50
 * @param startLevel 起始等级，默认1
 */
async function generatePVEDataRange(onProgress?: (data: any[], level: number, total: number) => void, count: number = 50, startLevel: number = 1) {
    const data = [];
    const maxLevel = startLevel + count - 1;

    await init();
    const seerUtil = FxUtil.getInstance();

    // 对每个等级进行实际战斗模拟
    for (let level = startLevel; level <= maxLevel; level++) {
        // 使用 setTimeout 模拟 sleep，避免浏览器卡死
        await new Promise(resolve => {
            requestAnimationFrame(() => resolve(true))
        });

        try {
            // 创建战斗日志
            const logger = new BattleLogger();

            // 创建主角
            const heroData = seerUtil.getInstanceDataByNameAndOccuAndLevel("主角1", 1, level);
            const hero = new BattleEntity(
                "Hero",
                heroData.hp,
                heroData.attack,
                heroData.defense,
                level,
                1
            );

            // 创建敌人（同等级）
            const enemyData = seerUtil.getInstanceDataByNameAndOccuAndLevel("怪物1", 1, level);
            const enemy = new BattleEntity(
                "Enemy",
                enemyData.hp,
                enemyData.attack,
                enemyData.defense,
                level,
                1
            );

            // 进行战斗
            const simulator = new BattleSimulator(hero, enemy, logger);
            const result = simulator.startBattle();

            // 计算主角输出的平均伤害
            let totalHeroDamage = 0;
            let damageCount = 0;
            if (result.battleData && result.battleData.length > 0) {
                for (const roundData of result.battleData) {
                    if (roundData.heroDamageDealt !== undefined) {
                        totalHeroDamage += roundData.heroDamageDealt;
                        damageCount++;
                    }
                }
            }
            const averageHeroDamage = damageCount > 0 ? totalHeroDamage / damageCount : 0;

            // 收集数据
            const newData = {
                level: level,
                hp: hero.currentHp,
                damage: averageHeroDamage,
                rounds: result.rounds,
                battleData: result.battleData,
                heroName: "Hero",
                enemyName: "Enemy"
            };

            data.push(newData);

            // 调用进度回调函数，实现渐进式更新
            if (onProgress) {
                onProgress(data, level, maxLevel);
            }

        } catch (error) {
            console.error(`Level ${level} battle simulation failed:`, error);
            // 如果战斗失败，使用默认数据
            const defaultData = {
                level: level,
                hp: 100,
                damage: 20,
                rounds: 10,
                battleData: [],
                heroName: "Hero",
                enemyName: "Enemy"
            };
            data.push(defaultData);

            if (onProgress) {
                onProgress(data, level, maxLevel);
            }
        }
    }

    console.log(`PVE data generation complete: ${data.length} levels`);
    return data;
}

/**
 * 生成PVE测试数据（使用实际战斗数值）
 * 对每个等级（1-50）进行实际战斗模拟
 * @param onProgress 进度回调函数，每完成一个等级的战斗就调用一次
 * @param maxLevel 最大等级，默认50
 */
async function generatePVEData(onProgress?: (data: any[], level: number, total: number) => void, maxLevel: number = 50) {
    const data = [];

    await init();
    const seerUtil = FxUtil.getInstance();

    // 对每个等级进行实际战斗模拟
    for (let level = 1; level <= maxLevel; level++) {
        // 使用 setTimeout 模拟 sleep，避免浏览器卡死
        await new Promise(resolve => {
            // setTimeout(resolve, 50)
            requestAnimationFrame(() => resolve(true))
        });

        try {
            // 创建战斗日志
            const logger = new BattleLogger();

            // 创建主角
            const heroData = seerUtil.getInstanceDataByNameAndOccuAndLevel("主角1", 1, level);
            const hero = new BattleEntity(
                "Hero",
                heroData.hp,
                heroData.attack,
                heroData.defense,
                level,
                1
            );

            // 创建敌人（同等级）
            const enemyData = seerUtil.getInstanceDataByNameAndOccuAndLevel("怪物1", 1, level);
            const enemy = new BattleEntity(
                "Enemy",
                enemyData.hp,
                enemyData.attack,
                enemyData.defense,
                level,
                1
            );

            // 进行战斗
            const simulator = new BattleSimulator(hero, enemy, logger);
            const result = simulator.startBattle();

            // 计算主角输出的平均伤害
            let totalHeroDamage = 0;
            let damageCount = 0;
            if (result.battleData && result.battleData.length > 0) {
                for (const roundData of result.battleData) {
                    if (roundData.heroDamageDealt !== undefined) {
                        totalHeroDamage += roundData.heroDamageDealt;
                        damageCount++;
                    }
                }
            }
            const averageHeroDamage = damageCount > 0 ? totalHeroDamage / damageCount : 0;

            // 收集数据
            const newData = {
                level: level,
                hp: hero.currentHp,  // 主角剩余的血量
                damage: averageHeroDamage,  // 战斗中主角输出的伤害平均值
                rounds: result.rounds,  // 实际战斗回合数
                battleData: result.battleData,  // 完整的战斗数据（每回合的详细数据）
                heroName: "Hero",  // 主角名称
                enemyName: "Enemy"  // 敌人名称
            };

            // 调试日志
            if (level === 1 || level === 10 || level === 50) {
                console.log(`[调试] 等级${level}数据:`, {
                    level: newData.level,
                    rounds: newData.rounds,
                    battleDataLength: newData.battleData?.length,
                    battleDataExists: !!newData.battleData
                });
            }

            data.push(newData);

            // 调用进度回调函数，实现渐进式更新
            // 注意：这里不做深拷贝，直接传递引用，因为我们不会修改历史数据
            if (onProgress) {
                onProgress(data, level, maxLevel);
            }

            // 输出进度
            if (level % 10 === 0) {
                console.log(`PVE数据生成进度: ${level}/${maxLevel}`);
            }
        } catch (error) {
            console.error(`Level ${level} battle simulation failed:`, error);
            // 如果战斗失败，使用默认数据
            const defaultData = {
                level: level,
                hp: 100,
                damage: 20,
                rounds: 10,
                battleData: [],  // 空数组
                heroName: "Hero",
                enemyName: "Enemy"
            };
            data.push(defaultData);

            // 调用进度回调函数
            if (onProgress) {
                onProgress(data, level, maxLevel);
            }
        }
    }

    console.log(`PVE data generation complete: ${data.length} levels`);
    return data;
}

/**
 * 主函数 - 运行多场战斗对比示例
 */
async function runAllExamples() {
    console.log('\n\n');
    console.log('╔════════════════════════════════════════╗');
    console.log('║   Seer Engine 多场战斗对比演示程序     ║');
    console.log('║   Multiple Battles Comparison Demo      ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('\n');

    await init();
    try {
        // 多场战斗对比
        await exampleMultipleBattles();

        console.log('\n✅ 多场战斗对比示例运行完成！');
        console.log('查看控制台以获取详细的战斗日志和数据分析。\n');

    } catch (error) {
        console.error('❌ 运行示例时出错:', error);
    }
}

// 导出所有功能，方便外部调用
export {
    BattleLogger,
    BattleEntity,
    BattleSimulator,
    exampleMultipleBattles,
    runAllExamples,
    generatePVEData,
    generatePVEDataRange
};

// 如果直接运行此文件，则执行多场战斗对比示例
if (typeof window !== 'undefined') {
    // 浏览器环境
    (window as any).battleDemo = {
        runAllExamples,
        exampleMultipleBattles,
        generatePVEData,
        generatePVEDataRange
    };

    console.log('💡 Usage:');
    console.log('  - battleDemo.runAllExamples() - Run multiple battle comparison examples');
    console.log('  - battleDemo.exampleMultipleBattles() - Multiple battle comparison');
    console.log('  - battleDemo.generatePVEData() - Generate PVE test data');
    console.log('  - battleDemo.generatePVEDataRange() - Generate PVE data for specific level range');
}

