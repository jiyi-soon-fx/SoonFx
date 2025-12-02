import * as echarts from 'echarts';
import { i18n } from '../i18n/I18nService';

export class ChartController {
    private chartInstances: { [key: string]: echarts.ECharts } = {};
    private pveBattleData: any[] | null = null;
    private onPointClick: (index: number) => void;

    constructor(onPointClick: (index: number) => void) {
        this.onPointClick = onPointClick;
        
        // Handle window resize
        window.addEventListener('resize', () => {
            Object.values(this.chartInstances).forEach(chart => {
                chart.resize();
            });
        });

        // Subscribe to i18n changes to update charts
        i18n.subscribe(() => {
             // We can try to refresh the charts if data exists
             if (this.pveBattleData) {
                 // This logic is slightly imperfect as it doesn't know the current highlight index perfectly 
                 // without passing it in again, but we can store it if needed.
                 // For now, simply re-rendering with last known data is better than nothing.
                 // However, updating ECharts options with new titles is enough.
                 this.updateChartTitles();
             }
        });
    }

    public async initCharts(): Promise<void> {
        return Promise.resolve();
    }

    private updateChartTitles() {
        // This function updates the series names and titles if we had any
        // Since we create charts with specific names, we might need to re-set options.
        // For simplicity in this demo, we'll rely on the main loop calling updateCharts which is triggered by language toggle in DemoApp if we structured it that way.
        // But DemoApp doesn't trigger updateCharts on language toggle yet. 
        // Let's just make sure the next updateCharts call uses correct translations.
    }

    public updateCharts(data: any[], currentLevel: number | null) {
        if (!data || data.length === 0) return;

        this.pveBattleData = data;

        const levels = data.map(d => `Lv ${d.level}`);
        const hpValues = data.map(d => d.hp);
        const damageValues = data.map(d => d.damage);
        const roundsValues = data.map(d => d.rounds);

        const currentLevelIndex = currentLevel !== null ? 
            data.findIndex(d => d.level === currentLevel) : -1;

        // Update or create HP chart
        if (!this.chartInstances.hpChart) {
            document.getElementById('hpPlaceholder')?.classList.add('hidden');
            this.chartInstances.hpChart = this.createLineChart('hpChart', 'Health Points', 'rgb(75, 192, 192)');
        }
        // Update series name to localized
        this.updateChartData(this.chartInstances.hpChart, levels, hpValues, currentLevelIndex, 'rgb(75, 192, 192)', false, i18n.t('charts.hpByLevel'));

        // Update or create Damage chart
        if (!this.chartInstances.damageChart) {
            document.getElementById('damagePlaceholder')?.classList.add('hidden');
            this.chartInstances.damageChart = this.createLineChart('damageChart', 'Attack Damage', 'rgb(255, 99, 132)');
        }
        this.updateChartData(this.chartInstances.damageChart, levels, damageValues, currentLevelIndex, 'rgb(255, 99, 132)', false, i18n.t('charts.damageByLevel'));

        // Update or create Rounds chart
        if (!this.chartInstances.roundsChart) {
            document.getElementById('roundsPlaceholder')?.classList.add('hidden');
            this.chartInstances.roundsChart = this.createLineChart('roundsChart', 'Battle Duration', 'rgb(153, 102, 255)');
        }
        this.updateChartData(this.chartInstances.roundsChart, levels, roundsValues, currentLevelIndex, 'rgb(153, 102, 255)', true, i18n.t('charts.roundsByLevel'));
    }

    public clearCharts() {
        Object.values(this.chartInstances).forEach(chart => {
            chart.dispose();
        });
        this.chartInstances = {};
    }

    /**
     * 显示单场战斗的回合数据到主图表区域
     */
    public updateChartsWithBattleRounds(battleData: any[], heroName: string, enemyName: string) {
        if (!battleData || battleData.length === 0) return;

        const rounds = battleData.map(d => `R${d.round}`);
        const heroHpValues = battleData.map(d => d.heroHp);
        const enemyHpValues = battleData.map(d => d.enemyHp);
        const heroDamageValues = battleData.map(d => d.heroDamageDealt || 0);
        const enemyDamageValues = battleData.map(d => d.enemyDamageDealt || 0);
        const heroHpPercent = battleData.map(d => d.heroHpPercent || 0);
        const enemyHpPercent = battleData.map(d => d.enemyHpPercent || 0);

        // HP Chart - 显示双方血量变化
        document.getElementById('hpPlaceholder')?.classList.add('hidden');
        if (!this.chartInstances.hpChart) {
            this.chartInstances.hpChart = this.createLineChart('hpChart', 'HP', 'rgb(75, 192, 192)');
        }
        this.updateDualLineChart(this.chartInstances.hpChart, rounds, heroHpValues, enemyHpValues, heroName, enemyName, 'rgb(45, 105, 105)', 'rgb(255, 99, 132)');

        // Damage Chart - 显示双方每回合伤害
        document.getElementById('damagePlaceholder')?.classList.add('hidden');
        if (!this.chartInstances.damageChart) {
            this.chartInstances.damageChart = this.createLineChart('damageChart', 'Damage', 'rgb(255, 99, 132)');
        }
        this.updateDualBarChart(this.chartInstances.damageChart, rounds, heroDamageValues, enemyDamageValues, heroName, enemyName);


        // Rounds Chart - Custom Battle 模式下不显示 HP % Chart，因为它与 HP Chart 重复
        // 如果需要显示，可以在 DemoApp 中控制显隐，这里不再更新数据

    }

    private updateDualLineChart(chart: echarts.ECharts, labels: string[], data1: number[], data2: number[], name1: string, name2: string, color1: string, color2: string) {
        const currentOption = chart.getOption() as any;
        // 检查是否已经初始化为正确的双系列图表
        const isInitialized = currentOption && 
                              currentOption.series && 
                              currentOption.series.length === 2 &&
                              currentOption.series[0].name === name1 &&
                              currentOption.series[1].name === name2 &&
                              currentOption.series[0].type === 'line';

        if (!isInitialized) {
            const option: echarts.EChartsOption = {
                animation: true,
                animationDuration: 300,
                animationEasing: 'cubicOut',
                tooltip: {
                    trigger: 'axis',
                    confine: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    textStyle: { color: '#fff' }
                },
                legend: {
                    data: [name1, name2],
                    textStyle: { color: '#f1f5f9', fontSize: 10 },
                    top: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: labels,
                    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                    axisLabel: { color: '#94a3b8', fontSize: 10 }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                    axisLabel: { color: '#94a3b8' }
                },
                series: [
                    {
                        name: name1,
                        type: 'line',
                        data: data1,
                        smooth: 0.3,
                        lineStyle: { color: color1, width: 2 },
                        itemStyle: { color: color1 },
                        areaStyle: { color: color1.replace('rgb', 'rgba').replace(')', ', 0.2)') },
                        animation: true,
                        animationDuration: 300,
                        animationEasing: 'cubicOut'
                    },
                    {
                        name: name2,
                        type: 'line',
                        data: data2,
                        smooth: 0.3,
                        lineStyle: { color: color2, width: 2 },
                        itemStyle: { color: color2 },
                        areaStyle: { color: color2.replace('rgb', 'rgba').replace(')', ', 0.2)') },
                        animation: true,
                        animationDuration: 300,
                        animationEasing: 'cubicOut'
                    }
                ]
            };
            chart.setOption(option);
        } else {
            chart.setOption({
                xAxis: {
                    data: labels
                },
                series: [
                    {
                        data: data1
                    },
                    {
                        data: data2
                    }
                ]
            });
        }
    }

    private updateDualBarChart(chart: echarts.ECharts, labels: string[], data1: number[], data2: number[], name1: string, name2: string) {
        const currentOption = chart.getOption() as any;
        // 检查是否已经初始化为正确的双系列图表
        const isInitialized = currentOption && 
                              currentOption.series && 
                              currentOption.series.length === 2 &&
                              currentOption.series[0].name === name1 &&
                              currentOption.series[1].name === name2 &&
                              currentOption.series[0].type === 'bar';

        if (!isInitialized) {
            const option: echarts.EChartsOption = {
                animation: true,
                animationDuration: 300,
                animationEasing: 'cubicOut',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    confine: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    textStyle: { color: '#fff' }
                },
                legend: {
                    data: [name1, name2],
                    textStyle: { color: '#f1f5f9', fontSize: 10 },
                    top: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: labels,
                    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                    axisLabel: { color: '#94a3b8', fontSize: 10 }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                    axisLabel: { color: '#94a3b8' }
                },
                series: [
                    {
                        name: name1,
                        type: 'bar',
                        data: data1,
                        itemStyle: { color: 'rgba(75, 192, 192, 0.8)' },
                        animation: true,
                        animationDuration: 300,
                        animationEasing: 'cubicOut'
                    },
                    {
                        name: name2,
                        type: 'bar',
                        data: data2,
                        itemStyle: { color: 'rgba(255, 99, 132, 0.8)' },
                        animation: true,
                        animationDuration: 300,
                        animationEasing: 'cubicOut'
                    }
                ]
            };
            chart.setOption(option);
        } else {
            chart.setOption({
                xAxis: {
                    data: labels
                },
                series: [
                    {
                        data: data1
                    },
                    {
                        data: data2
                    }
                ]
            });
        }
    }

    public createDetailCharts(battleData: any[], heroName: string, enemyName: string) {
        this.createDetailHpChart(battleData, heroName, enemyName);
        this.createDetailDamageChart(battleData, heroName, enemyName);
    }

    private createLineChart(canvasId: string, seriesName: string, color: string): echarts.ECharts {
        const container = document.getElementById(canvasId);
        if (!container) throw new Error(`Canvas container ${canvasId} not found`);
        
        const chart = echarts.init(container as HTMLElement);
        
        chart.getZr().on('click', (params) => {
            if (!this.pveBattleData) return;

            const pointInPixel = [params.offsetX, params.offsetY];
            
            if (chart.containPixel({ seriesIndex: 0 }, pointInPixel)) {
                const pointInGrid = chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel);

                if (pointInGrid) {
                    const xIndex = pointInGrid[0];
                    if (xIndex >= 0 && xIndex < this.pveBattleData.length) {
                        this.onPointClick(xIndex);
                    }
                }
            }
        });

        return chart;
    }

    private updateChartData(chart: echarts.ECharts, labels: string[], data: number[], highlightIndex: number, color: string, isDynamicY: boolean = false, seriesName?: string) {
        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis',
                confine: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                textStyle: { color: '#fff' },
                borderColor: color
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: labels,
                axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                axisLabel: { color: '#94a3b8' }
            },
            yAxis: {
                type: 'value',
                scale: isDynamicY,
                minInterval: isDynamicY ? 1 : 0,
                splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                axisLabel: { color: '#94a3b8' }
            },
            series: [{
                name: seriesName || 'Value',
                type: 'line',
                data: data.map((val, idx) => {
                    return {
                        value: val,
                        itemStyle: {
                            color: idx === highlightIndex ? 'rgb(255, 200, 0)' : color,
                            borderColor: idx === highlightIndex ? 'rgb(255, 200, 0)' : color
                        },
                        symbolSize: idx === highlightIndex ? 8 : 3
                    }
                }),
                smooth: 0.3,
                lineStyle: { color: color, width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: color.replace('rgb', 'rgba').replace(')', ', 0.5)') },
                        { offset: 1, color: color.replace('rgb', 'rgba').replace(')', ', 0.0)') }
                    ])
                }
            }]
        };

        chart.setOption(option);
    }

    private createDetailHpChart(battleData: any[], heroName: string, enemyName: string) {
        const container = document.getElementById('detailHpChart');
        if (!container) return;

        if (this.chartInstances.detailHpChart) {
            this.chartInstances.detailHpChart.dispose();
        }

        const rounds = battleData.map(d => `R${d.round}`);
        const heroHp = battleData.map(d => d.heroHp);
        const enemyHp = battleData.map(d => d.enemyHp);

        const chart = echarts.init(container as HTMLElement);
        this.chartInstances.detailHpChart = chart;

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis',
                confine: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                textStyle: { color: '#fff' }
            },
            legend: {
                data: [`${heroName} HP`, `${enemyName} HP`],
                textStyle: { color: '#f1f5f9' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: rounds,
                axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                axisLabel: { color: '#94a3b8' }
            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                axisLabel: { color: '#94a3b8' }
            },
            series: [
                {
                    name: `${heroName} HP`,
                    type: 'line',
                    data: heroHp,
                    smooth: 0.3,
                    lineStyle: { color: 'rgb(75, 192, 192)' },
                    itemStyle: { color: 'rgb(75, 192, 192)' },
                    areaStyle: { color: 'rgba(75, 192, 192, 0.2)' }
                },
                {
                    name: `${enemyName} HP`,
                    type: 'line',
                    data: enemyHp,
                    smooth: 0.3,
                    lineStyle: { color: 'rgb(255, 99, 132)' },
                    itemStyle: { color: 'rgb(255, 99, 132)' },
                    areaStyle: { color: 'rgba(255, 99, 132, 0.2)' }
                }
            ]
        };

        chart.setOption(option);
    }

    private createDetailDamageChart(battleData: any[], heroName: string, enemyName: string) {
        const container = document.getElementById('detailDamageChart');
        if (!container) return;

        if (this.chartInstances.detailDamageChart) {
            this.chartInstances.detailDamageChart.dispose();
        }

        const totalHeroDamage = battleData.reduce((sum: number, d: any) => sum + (d.heroDamageDealt || 0), 0);
        const totalEnemyDamage = battleData.reduce((sum: number, d: any) => sum + (d.enemyDamageDealt || 0), 0);
        const avgHeroDamage = parseFloat((totalHeroDamage / battleData.length).toFixed(1));
        const avgEnemyDamage = parseFloat((totalEnemyDamage / battleData.length).toFixed(1));

        const chart = echarts.init(container as HTMLElement);
        this.chartInstances.detailDamageChart = chart;

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                confine: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                textStyle: { color: '#fff' }
            },
            legend: {
                data: [heroName, enemyName],
                textStyle: { color: '#f1f5f9' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Total Damage', 'Avg Damage/Round'],
                axisLine: { show: false },
                axisLabel: { color: '#94a3b8' }
            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                axisLabel: { color: '#94a3b8' }
            },
            series: [
                {
                    name: heroName,
                    type: 'bar',
                    data: [totalHeroDamage, avgHeroDamage],
                    itemStyle: { color: 'rgba(75, 192, 192, 0.8)' }
                },
                {
                    name: enemyName,
                    type: 'bar',
                    data: [totalEnemyDamage, avgEnemyDamage],
                    itemStyle: { color: 'rgba(255, 99, 132, 0.8)' }
                }
            ]
        };

        chart.setOption(option);
    }
}
