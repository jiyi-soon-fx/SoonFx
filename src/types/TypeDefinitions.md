# 类型定义文档

## 📋 项目概述

本文档记录了 Fx 引擎中 any 类型替换的进展和类型定义。

## 🎯 目标

将项目中的 any 类型替换为具体的类型定义，提高代码的类型安全性和可维护性。

## 📊 进展统计

### 已完成文件（6个）

| 文件 | any类型数 | 状态 | 完成时间 | 类型替换详情 |
|------|-----------|------|----------|-------------|
| Message.ts | 2 | ✅ 完成 | 2024-01-XX | 使用 UserData, MessageType, Nullable |
| Call.ts | 2 | ✅ 完成 | 2024-01-XX | 使用 MessageData, Callback |
| Bookmark.ts | 2 | ✅ 完成 | 2024-01-XX | 使用 ViewElement, BaseEntity |
| MessageList.ts | 1 | ✅ 完成 | 2024-01-XX | 使用 CallCenter[] |
| CallCenter.ts | 4 | ✅ 完成 | 2024-01-XX | 使用 EventList, MessageData |
| SheetData.ts | 3 | ✅ 完成 | 2024-01-XX | 使用 OriginData, CellData 等 |

**小计：14个 any 类型已替换，0个 any 类型残留**

### 待处理文件（14个）

| 文件 | any类型数 | 优先级 | 预计工作量 |
|------|-----------|--------|------------|
| System.ts | 119 | 🔥 高 | 8-10小时 |
| VariableValue.ts | 47 | 🔥 高 | 4-6小时 |
| Player.ts | 16 | 🔥 高 | 2-3小时 |
| BasicBody.ts | 10 | 🟡 中 | 2-3小时 |
| FormulaData.ts | 3 | 🟡 中 | 1小时 |
| BillboardLayer.ts | 3 | 🟡 中 | 1小时 |
| SeerCentre.ts | 5 | 🟡 中 | 1-2小时 |
| Folder.ts | 8 | 🟡 中 | 1-2小时 |
| MetadataData.ts | 4 | 🟡 中 | 1小时 |
| OperationLayerData.ts | 3 | 🟡 中 | 1小时 |
| ChartsLayer.ts | 3 | 🟡 中 | 1小时 |
| SymbolBody.ts | 1 | 🟢 低 | 30分钟 |
| MessageTypes.ts | 2 | 🟢 低 | 30分钟 |
| index.ts | 1 | 🟢 低 | 30分钟 |

**总计：277个 any 类型待处理**

## 🔧 类型定义规范

### 基础类型替换规则

1. **any → unknown**: 当不确定具体类型时
2. **any → Record<string, unknown>**: 对象类型
3. **any[] → 具体类型[]**: 数组类型
4. **any | null → 具体类型 | null**: 可空类型

### 已定义的类型

#### 消息系统类型
```typescript
// Message.ts
export class Message {
  userData: Record<string, unknown> | null = null;
  type: string | null = null;
}

// Call.ts
static send(
  type: string,
  message: Record<string, unknown>,
  fun?: ((type: string, value: unknown) => void) | null
): void

// CallCenter.ts
eventsList: Record<string, Function> | null = null;
execute(type: string, message: Record<string, unknown>): unknown
```

#### 数据模型类型
```typescript
// Bookmark.ts
export class Bookmark {
  view: HTMLElement | null = null;
  bookmarkView: HTMLElement | null = null;
}

// SheetData.ts
interface SheetInfo {
  uniqueInfo?: {
    row: number;
    col: number;
  };
  data?: Map<string, CellData>;
}

interface CellData {
  v: number | string;
  type?: string;
  f?: string;
  getValue?: (sheets: SheetInfo[]) => number | string;
}
```

## 📈 下一步计划

### 阶段1：中等复杂度文件（预计2-3天）
1. **FormulaData.ts** - 3个any类型
2. **BillboardLayer.ts** - 3个any类型  
3. **ChartsLayer.ts** - 3个any类型
4. **OperationLayerData.ts** - 3个any类型

### 阶段2：复杂文件（预计1-2周）
1. **BasicBody.ts** - 10个any类型
2. **Folder.ts** - 8个any类型
3. **Player.ts** - 16个any类型

### 阶段3：核心系统（预计2-3周）
1. **VariableValue.ts** - 47个any类型
2. **System.ts** - 119个any类型

## 🎯 质量保证

### 类型检查
- 使用 TypeScript 严格模式
- 定期运行类型检查
- 确保所有替换后的类型正确

### 测试验证
- 确保类型替换后功能正常
- 验证接口兼容性
- 检查性能影响

## 📝 注意事项

1. **渐进式替换**: 不要一次性替换所有any类型
2. **向后兼容**: 确保API接口不破坏现有功能
3. **文档更新**: 及时更新相关文档
4. **团队沟通**: 与团队分享类型定义规范

## 🔄 更新日志

- **2024-01-XX**: 完成6个小文件的类型替换
- **2024-01-XX**: 创建类型定义文档
- **2024-01-XX**: 制定详细实施计划
