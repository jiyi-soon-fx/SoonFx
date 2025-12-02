class n{constructor(t=!1){this.logs=[],this.battleData=[],this.silent=t}addLog(t){const s=`[${new Date().toLocaleTimeString("zh-CN")}] ${t}`;this.logs.push(s),this.silent||console.log(s)}addRoundData(t,e){this.battleData.push({round:t,timestamp:new Date().toISOString(),...e})}getLogs(){return[...this.logs]}getBattleData(){return[...this.battleData]}clear(){this.logs=[],this.battleData=[]}generateReport(){let t=`
========== 战斗报告 ==========
`;return t+=this.logs.join(`
`),t+=`

========== 战斗数据统计 ==========
`,t+=JSON.stringify(this.battleData,null,2),t+=`
================================
`,t}}export{n as BattleLogger};
