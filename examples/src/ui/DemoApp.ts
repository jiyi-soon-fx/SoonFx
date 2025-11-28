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
    }
};

export class DemoApp {
    private chartController: ChartController;
    private currentScenario: string = 'pve-growth';
    private pveBattleData: any[] | null = null;
    private currentLevel: number | null = null;

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

        // Run simulation
        await this.runScenario(scenario);
    }

    private async runScenario(scenario: string) {
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
