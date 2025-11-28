import { ChartController } from "./ChartController";
import { i18n } from "../i18n/I18nService";

const SCENARIO_KEYS: { [key: string]: { title: string, desc: string } } = {
    'pve-growth': {
        title: 'story.pveGrowth.title',
        desc: 'story.pveGrowth.desc'
    },
    'newbie': {
        title: 'story.newbie.title',
        desc: 'story.newbie.desc'
    },
    'mid-game': {
        title: 'story.midGame.title',
        desc: 'story.midGame.desc'
    },
    'custom-battle': {
        title: 'story.custom.title',
        desc: 'story.custom.desc'
    }
};

export class DemoApp {
    private chartController: ChartController;
    private currentScenario: string = 'pve-growth';
    private pveBattleData: any[] | null = null;
    private currentLevel: number | null = null;
    private isRunning: boolean = false;

    // Preset configurations
    private static readonly PRESETS: { [key: string]: { hero: any, enemy: any } } = {
        balanced: {
            hero: { level: 10, hp: 1000, atk: 100, def: 20 },
            enemy: { level: 10, hp: 1000, atk: 100, def: 20 }
        },
        heroStrong: {
            hero: { level: 15, hp: 1500, atk: 150, def: 30 },
            enemy: { level: 10, hp: 800, atk: 80, def: 15 }
        },
        enemyStrong: {
            hero: { level: 10, hp: 800, atk: 80, def: 15 },
            enemy: { level: 15, hp: 1500, atk: 150, def: 30 }
        },
        tank: {
            hero: { level: 10, hp: 2000, atk: 60, def: 50 },
            enemy: { level: 10, hp: 800, atk: 120, def: 10 }
        },
        glass: {
            hero: { level: 10, hp: 500, atk: 200, def: 5 },
            enemy: { level: 10, hp: 1200, atk: 80, def: 25 }
        }
    };

    constructor() {
        this.chartController = new ChartController((index) => this.showBattleDetail(index));
    }

    public async init() {
        console.log('Battle simulation system initialized');
        
        // Initialize i18n first
        i18n.updatePage();
        
        this.bindEvents();
        this.redirectConsole();

        await this.chartController.initCharts();
        
        // Auto-run default scenario
        await this.selectScenario('pve-growth');

        // Subscribe to language changes
        i18n.subscribe(() => {
            this.updateStoryHeader(this.currentScenario);
            // Re-render status if needed
            // Re-render charts if needed (charts usually have their own titles, might need update)
            // For simplicity, we might re-run scenario or just update text
            if (this.pveBattleData && this.currentLevel !== null) {
                 // Try to refresh current detail view text
                 // This is a bit complex because logs are appended. 
                 // We'll just update the static parts.
            }
        });
    }

    private bindEvents() {
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const scenario = target.dataset.scenario;
                if (scenario) {
                    this.selectScenario(scenario);
                }
            });
        });

        const startCustomBtn = document.getElementById('startCustomBattle');
        if (startCustomBtn) {
            startCustomBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Start Custom Battle clicked');
                if (!this.isRunning) {
                    this.runCustomBattle();
                }
            });
        }

        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const presetKey = target.dataset.preset;
                if (presetKey && DemoApp.PRESETS[presetKey]) {
                    this.applyPreset(presetKey);
                    // Update active state
                    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                    target.classList.add('active');
                }
            });
        });

        const langSwitch = document.getElementById('langSwitch');
        if (langSwitch) {
            langSwitch.addEventListener('click', () => {
                i18n.toggleLocale();
            });
        }
    }

    private redirectConsole() {
        const originalLog = console.log;
        console.log = (...args: any[]) => {
            originalLog.apply(console, args);
            // Only log to output if it's a string message, to avoid cluttering with objects
            // or you can implement a smarter filter
            const outputEl = document.getElementById('output');
            if (outputEl) {
                // Optional: Uncomment if you want to stream logs to the div
                // const message = args.map(arg => 
                //     typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                // ).join(' ');
                // outputEl.textContent += message + '\n';
                // outputEl.scrollTop = outputEl.scrollHeight;
            }
        };
    }

    private updateStoryHeader(scenario: string) {
        const keys = SCENARIO_KEYS[scenario];
        if (keys) {
            const titleEl = document.getElementById('storyTitle');
            const descEl = document.getElementById('storyDesc');
            if (titleEl) titleEl.textContent = i18n.t(keys.title);
            if (descEl) descEl.textContent = i18n.t(keys.desc);
        }
    }

    public async selectScenario(scenario: string) {
        // Update active button
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.classList.remove('active');
            const target = btn as HTMLElement;
            if (target.dataset.scenario === scenario) {
                btn.classList.add('active');
            }
        });

        this.currentScenario = scenario;
        this.updateStoryHeader(scenario);

        // Clear previous data
        this.clearOutput();
        this.chartController.clearCharts();

        // Show placeholders
        document.getElementById('hpPlaceholder')?.classList.remove('hidden');
        document.getElementById('damagePlaceholder')?.classList.remove('hidden');
        document.getElementById('roundsPlaceholder')?.classList.remove('hidden');

        // Toggle Config Panel
        const configPanel = document.getElementById('customConfigPanel');
        if (scenario === 'custom-battle') {
            if (configPanel) configPanel.style.display = 'block';
            // Hide placeholders for custom battle as we don't run auto-sim immediately
            document.getElementById('hpPlaceholder')?.classList.add('hidden');
            document.getElementById('damagePlaceholder')?.classList.add('hidden');
            document.getElementById('roundsPlaceholder')?.classList.add('hidden');
        } else {
            if (configPanel) configPanel.style.display = 'none';
            // Run simulation
            await this.runScenario(scenario);
        }
    }

    private async runScenario(scenario: string) {
        if (scenario === 'custom-battle') return; // Handled by manual button

        this.setStatus('loading', i18n.t('status.running', { scenario }));

        try {
            switch (scenario) {
                case 'pve-growth':
                    await this.showPVEGrowthCurve(50);
                    break;
                case 'newbie':
                    await this.showPVEGrowthCurve(10, 1);
                    break;
                case 'mid-game':
                    await this.showPVEGrowthCurve(30, 20);
                    break;
            }

            this.setStatus('success', i18n.t('status.success'));
        } catch (error: any) {
            console.error('Simulation error:', error);
            this.setStatus('error', i18n.t('status.error', { message: error.message }));
        }
    }

    private applyPreset(presetKey: string) {
        const preset = DemoApp.PRESETS[presetKey];
        if (!preset) return;

        const setValue = (id: string, value: number) => {
            const el = document.getElementById(id) as HTMLInputElement;
            if (el) el.value = String(value);
        };

        setValue('heroLevel', preset.hero.level);
        setValue('heroHp', preset.hero.hp);
        setValue('heroAtk', preset.hero.atk);
        setValue('heroDef', preset.hero.def);

        setValue('enemyLevel', preset.enemy.level);
        setValue('enemyHp', preset.enemy.hp);
        setValue('enemyAtk', preset.enemy.atk);
        setValue('enemyDef', preset.enemy.def);
    }

    private async runCustomBattle() {
        console.log('runCustomBattle called, isRunning:', this.isRunning);
        if (this.isRunning) return;
        
        const getValue = (id: string) => {
            const el = document.getElementById(id) as HTMLInputElement;
            const val = parseInt(el?.value) || 0;
            const min = parseInt(el?.min) || 0;
            const max = parseInt(el?.max) || 999999;
            return Math.max(min, Math.min(max, val));
        };

        const heroLevel = getValue('heroLevel');
        const heroHp = getValue('heroHp');
        const heroAtk = getValue('heroAtk');
        const heroDef = getValue('heroDef');

        const enemyLevel = getValue('enemyLevel');
        const enemyHp = getValue('enemyHp');
        const enemyAtk = getValue('enemyAtk');
        const enemyDef = getValue('enemyDef');
        const simCount = Math.max(1, Math.min(1000, getValue('simCount') || 1));

        console.log('Custom Battle Config:', { heroLevel, heroHp, heroAtk, heroDef, enemyLevel, enemyHp, enemyAtk, enemyDef, simCount });

        // Validation
        if (heroHp <= 0 || heroAtk <= 0 || enemyHp <= 0 || enemyAtk <= 0) {
            this.setStatus('error', 'Invalid stats: HP and Attack must be > 0');
            return;
        }

        this.isRunning = true;
        this.setStatus('loading', i18n.t('status.running', { scenario: 'Custom' }));
        this.clearOutput();

        // Show progress bar for batch simulations
        const progressContainer = document.getElementById('customProgress');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        if (simCount > 1 && progressContainer) {
            progressContainer.style.display = 'block';
        }

        try {
            const { BattleEntity } = await import('../core/BattleEntity');
            const { BattleSimulator } = await import('../core/BattleSimulator');
            const { BattleLogger } = await import('../core/BattleLogger');

            // Run simulations
            let wins = 0;
            let totalRounds = 0;
            let totalHeroHp = 0;
            let minRounds = Infinity;
            let maxRounds = 0;
            let lastResult: any = null;

            const batchSize = 50; // Process in batches for UI responsiveness
            
            for (let i = 0; i < simCount; i++) {
                // Yield to UI every batchSize iterations
                if (i > 0 && i % batchSize === 0) {
                    await new Promise(r => requestAnimationFrame(r));
                    // Update progress
                    if (progressBar && progressText) {
                        const percent = Math.round((i / simCount) * 100);
                        progressBar.style.width = `${percent}%`;
                        progressText.textContent = `${i} / ${simCount} (${percent}%)`;
                    }
                }

                // Only log the last one to avoid console spam
                const isLast = i === simCount - 1;
                const logger = new BattleLogger(!isLast); 

                const hero = new BattleEntity("Hero", heroHp, heroAtk, heroDef, heroLevel);
                const enemy = new BattleEntity("Enemy Boss", enemyHp, enemyAtk, enemyDef, enemyLevel);
                const simulator = new BattleSimulator(hero, enemy, logger);

                const result = simulator.startBattle();
                
                if (result.winner === "Hero") {
                    wins++;
                }
                totalRounds += result.rounds;
                minRounds = Math.min(minRounds, result.rounds);
                maxRounds = Math.max(maxRounds, result.rounds);
                // Find final hero hp
                const lastRound = result.battleData[result.battleData.length - 1];
                totalHeroHp += lastRound ? lastRound.heroHp : 0;

                if (isLast) {
                    lastResult = result;
                }
            }

            if (!lastResult) throw new Error("Simulation failed");

            // Hide progress bar
            if (progressContainer) {
                progressContainer.style.display = 'none';
                if (progressBar) progressBar.style.width = '0%';
            }

            // Display logic
            if (simCount > 1) {
                 const outputEl = document.getElementById('output');
                 if (outputEl) {
                     outputEl.textContent = '';
                     const winRate = ((wins / simCount) * 100).toFixed(1);
                     const avgRounds = (totalRounds / simCount).toFixed(1);
                     const avgHp = (totalHeroHp / simCount).toFixed(0);
                     const losses = simCount - wins;
                     
                     const report = `
${i18n.t('custom.report.title', { count: simCount })}
────────────────────────────────
${i18n.t('custom.report.winRate', { rate: winRate })}
${i18n.t('custom.report.losses', { count: losses })}
${i18n.t('custom.report.avgRounds', { rounds: avgRounds })}
${i18n.t('custom.report.minRounds', { rounds: minRounds })}
${i18n.t('custom.report.maxRounds', { rounds: maxRounds })}
${i18n.t('custom.report.avgHeroHp', { hp: avgHp })}
────────────────────────────────

${i18n.t('status.battleDetails.header', { level: heroLevel })}
${i18n.t('status.battleDetails.duration', { rounds: lastResult.rounds })}
${i18n.t('status.battleDetails.hp', { hp: Math.round(lastResult.battleData[lastResult.battleData.length - 1].heroHp) })}
`;
                     outputEl.textContent = report;
                 }
            } else {
                // Single run - standard display handled by showBattleDetail below (via fake pveBattleData)
            }
            
            // Construct a single data point for the detail view (using the LAST run)
            const battleDataPoint = {
                level: heroLevel,
                hp: lastResult.battleData[lastResult.battleData.length - 1].heroHp, 
                damage: lastResult.battleData.reduce((acc: number, r: any) => acc + r.heroDamageDealt, 0) / lastResult.rounds,
                rounds: lastResult.rounds,
                battleData: lastResult.battleData,
                heroName: "Hero",
                enemyName: "Enemy Boss"
            };

            // Hack: Update pveBattleData to contain this single battle so showBattleDetail works
            this.pveBattleData = [battleDataPoint];
            
            // 显示主图表（回合数据）- 必须在 showBattleDetail 之前调用
            this.chartController.updateChartsWithBattleRounds(
                lastResult.battleData, 
                battleDataPoint.heroName, 
                battleDataPoint.enemyName
            );
            
            // 显示详情图表（不调用 updateCharts，避免覆盖主图表）
            this.showCustomBattleDetail(battleDataPoint);
            
            this.setStatus('success', i18n.t('status.success'));

        } catch (e: any) {
             this.setStatus('error', e.message);
             // Hide progress bar on error
             if (progressContainer) progressContainer.style.display = 'none';
        } finally {
            this.isRunning = false;
        }
    }

    /**
     * 显示自定义战斗的详情图表（不更新主图表）
     */
    private showCustomBattleDetail(battle: any) {
        if (!battle.battleData || battle.battleData.length === 0) {
            console.error('No detailed battle data available');
            return;
        }

        this.currentLevel = battle.level;

        // 显示详情图表容器
        const detailContainer = document.getElementById('detailChartsContainer');
        if (detailContainer) detailContainer.style.display = 'block';

        // 创建详情图表
        this.chartController.createDetailCharts(battle.battleData, battle.heroName || 'Hero', battle.enemyName || 'Enemy');

        // 更新输出（如果不是批量模拟）
        const outputEl = document.getElementById('output');
        if (outputEl && !outputEl.textContent?.includes('────')) {
            outputEl.textContent = '';
            
            const details = `
${i18n.t('status.battleDetails.header', { level: battle.level })}
${i18n.t('status.battleDetails.duration', { rounds: battle.rounds })}
${i18n.t('status.battleDetails.hp', { hp: Math.round(battle.hp) })}
${i18n.t('status.battleDetails.damage', { damage: Math.round(battle.damage) })}
${i18n.t('status.battleDetails.footer')}
`;
            outputEl.textContent = details;
        }
    }

    private async showPVEGrowthCurve(maxLevel: number, startLevel: number = 1) {
        this.currentLevel = null;
        const detailContainer = document.getElementById('detailChartsContainer');
        if (detailContainer) detailContainer.style.display = 'none';

        // Use the imported generatePVEDataRange logic via our wrapper
        const { generatePVEDataRange } = await import('../core/SimulationService');

        const pveData = await generatePVEDataRange((data, level, total) => {
            this.chartController.updateCharts(data, this.currentLevel);
            this.pveBattleData = data;
            
            const percent = Math.round(level/total*100);
            this.setStatus('loading', i18n.t('status.simulating', { 
                current: level, 
                total: total,
                percent: percent
            }));

            // Auto-select first level when ready
            if (level === startLevel && data.length > 0) {
                setTimeout(() => {
                    if (data[0] && data[0].battleData) {
                        this.showBattleDetail(0);
                    }
                }, 500);
            }
        }, maxLevel - startLevel + 1, startLevel); // count, startLevel

        this.pveBattleData = pveData;
        console.log(`Growth curve generated with ${pveData.length} data points`);
    }

    private showBattleDetail(index: number) {
        if (!this.pveBattleData || !this.pveBattleData[index]) {
            console.error('Battle data not found for index:', index);
            return;
        }

        const battle = this.pveBattleData[index];
        
        if (!battle.battleData || battle.battleData.length === 0) {
            console.error('No detailed battle data available');
            return;
        }

        this.currentLevel = battle.level;
        this.chartController.updateCharts(this.pveBattleData, this.currentLevel);

        const detailContainer = document.getElementById('detailChartsContainer');
        if (detailContainer) detailContainer.style.display = 'block';

        this.chartController.createDetailCharts(battle.battleData, battle.heroName || 'Hero', battle.enemyName || 'Enemy');

        // Update output
        const outputEl = document.getElementById('output');
        if (outputEl) {
            outputEl.textContent = '';
            
            const details = `
${i18n.t('status.battleDetails.header', { level: battle.level })}
${i18n.t('status.battleDetails.duration', { rounds: battle.rounds })}
${i18n.t('status.battleDetails.hp', { hp: Math.round(battle.hp) })}
${i18n.t('status.battleDetails.damage', { damage: Math.round(battle.damage) })}
${i18n.t('status.battleDetails.footer')}
`;
            outputEl.textContent = details;
        }
    }

    private setStatus(type: string, message: string) {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.className = `status ${type}`;
            statusEl.textContent = message;
        }
    }

    private clearOutput() {
        const outputEl = document.getElementById('output');
        if (outputEl) {
            outputEl.textContent = '';
            // Reset placeholder via i18n
            outputEl.setAttribute('data-placeholder', i18n.t('charts.details.waiting'));
        }
        this.setStatus('', '');
    }
}
