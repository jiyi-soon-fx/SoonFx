export const en = {
  meta: {
    title: "SoonFx Engine - Interactive Battle Demo",
  },
  header: {
    title: "⚔️ Interactive Battle Simulation",
    subtitle: "Real-time combat data visualization and analysis powered by SoonFx Engine",
    langSwitch: "中文"
  },
  scenarios: {
    title: "🎮 Battle Scenarios",
    pve: {
      label: "📈 Level Progression (1-50)",
      desc: "Watch how stats scale across levels"
    },
    newbie: {
      label: "🌱 Newbie Village (Lv 1-10)",
      desc: "First steps in the adventure"
    },
    midgame: {
      label: "⚔️ Mid-Game Challenge (Lv 20-30)",
      desc: "Intermediate difficulty battles"
    },
    tip: {
      label: "💡 Tip:",
      text: "Click on any data point in the charts to see detailed battle information for that level."
    }
  },
  charts: {
    hp: "❤️ Health Points (HP) by Level",
    damage: "💥 Attack Damage by Level",
    rounds: "⏱️ Battle Duration (Rounds) by Level",
    loading: "Running simulations...",
    details: {
      title: "📋 Battle Details",
      hpChange: "HP Change Over Rounds",
      damageStats: "Damage Statistics",
      waiting: "Waiting for simulation..."
    }
  },
  story: {
    pveGrowth: {
      title: "📊 Level Progression Analysis",
      desc: "Simulating 50 battles to show how character stats evolve from novice to master..."
    },
    newbie: {
      title: "🌱 The First Adventure",
      desc: "A young hero takes their first steps, facing level 1-10 slimes in the Newbie Village..."
    },
    midGame: {
      title: "⚔️ Rising Challenge",
      desc: "The hero has grown stronger (Lv 20-30) and now faces tougher enemies in the Dark Forest..."
    }
  },
  status: {
    running: "🔄 Running {scenario} simulation...",
    simulating: "🔄 Simulating battles... {current}/{total} ({percent}%)",
    success: "✅ Simulation complete! Click on any chart point to see detailed battle data.",
    error: "❌ Simulation failed: {message}",
    battleDetails: {
      header: "========== Level {level} Battle Details ==========",
      duration: "Battle Duration: {rounds} rounds",
      hp: "Hero Final HP: {hp}",
      damage: "Average Damage: {damage}",
      footer: "========================================"
    }
  }
};

export const zhCN = {
  meta: {
    title: "SoonFx 引擎 - 交互式战斗演示",
  },
  header: {
    title: "⚔️ 交互式战斗模拟",
    subtitle: "基于 SoonFx 引擎的实时战斗数据可视化与分析",
    langSwitch: "English"
  },
  scenarios: {
    title: "🎮 战斗场景",
    pve: {
      label: "📈 等级成长 (1-50)",
      desc: "观察属性如何随等级提升而变化"
    },
    newbie: {
      label: "🌱 新手村 (Lv 1-10)",
      desc: "冒险旅程的第一步"
    },
    midgame: {
      label: "⚔️ 中期挑战 (Lv 20-30)",
      desc: "面对更强大的敌人"
    },
    tip: {
      label: "💡 提示:",
      text: "点击图表中的任意数据点查看该等级的详细战斗信息。"
    }
  },
  charts: {
    hp: "❤️ 生命值 (HP) 随等级变化",
    damage: "💥 攻击伤害随等级变化",
    rounds: "⏱️ 战斗回合数随等级变化",
    loading: "正在运行模拟...",
    details: {
      title: "📋 战斗详情",
      hpChange: "回合生命值变化",
      damageStats: "伤害统计",
      waiting: "等待模拟..."
    }
  },
  story: {
    pveGrowth: {
      title: "📊 等级成长分析",
      desc: "模拟 50 场战斗，展示角色属性如何从新手成长为大师..."
    },
    newbie: {
      title: "🌱 初次冒险",
      desc: "年轻的英雄迈出了第一步，在新手村面对 1-10 级的史莱姆..."
    },
    midGame: {
      title: "⚔️ 挑战升级",
      desc: "英雄变强了 (Lv 20-30)，现在要在黑暗森林中面对更棘手的敌人..."
    }
  },
  status: {
    running: "🔄 正在运行 {scenario} 模拟...",
    simulating: "🔄 正在模拟战斗... {current}/{total} ({percent}%)",
    success: "✅ 模拟完成！点击图表上的任意点查看详细战斗数据。",
    error: "❌ 模拟失败: {message}",
    battleDetails: {
      header: "========== 等级 {level} 战斗详情 ==========",
      duration: "战斗持续: {rounds} 回合",
      hp: "英雄最终 HP: {hp}",
      damage: "平均伤害: {damage}",
      footer: "========================================"
    }
  }
};

