# Requirements Document

## Introduction

药代拜访医生语音备忘录Agent是一个基于AWS的智能系统，允许药代通过语音输入的方式记录和管理医生拜访会议纪要。系统使用AWS Transcribe进行语音识别，通过LLM处理自然语言并将其转换为结构化数据存储。Agent基于Strands Agent框架构建，部署在AWS EC2上的Docker容器中。

## Requirements

### Requirement 1

**User Story:** 作为药代，我希望能够通过点击麦克风按钮进行语音输入记录医生拜访信息，这样我就可以在拜访后快速记录重要信息而不需要手动输入。

#### Acceptance Criteria

1. WHEN 用户点击麦克风按钮 THEN 系统 SHALL 开始录音并显示录音状态
2. WHEN 用户完成语音输入 THEN 系统 SHALL 使用AWS Transcribe将语音转换为文本并流式显示在文本输入框中
3. WHEN 用户点击发送按钮 THEN 系统 SHALL 将转录文本显示在蓝色气泡中并使用LLM分析文本内容识别用户意图
4. WHEN 系统识别到拜访记录意图 THEN 系统 SHALL 提取结构化信息包括拜访时间、医生姓名、讨论的药品名称和医生治疗观念
5. WHEN 系统完成信息提取 THEN 系统 SHALL 以灰色气泡形式回复确认提取的信息数量，并在下方显示结构化的记录卡片

### Requirement 2

**User Story:** 作为药代，我希望能够在一次语音交互中处理多个会议纪要或多个操作意图，这样我就可以高效地批量处理拜访记录。

#### Acceptance Criteria

1. WHEN 用户在一次语音输入中提及多个医生拜访 THEN 系统 SHALL 识别并分别处理每个拜访记录
2. WHEN 用户在一次输入中包含增删改查多种操作 THEN 系统 SHALL 按顺序处理每个操作意图
3. WHEN 系统处理多个意图时 THEN 系统 SHALL 为每个操作提供单独的确认和结果反馈
4. WHEN 处理批量操作时 THEN 系统 SHALL 确保数据一致性和操作的原子性

### Requirement 3

**User Story:** 作为药代，我希望能够查看、修改和删除已存储的拜访记录，这样我就可以管理和维护准确的拜访历史。

#### Acceptance Criteria

1. WHEN 系统存储拜访记录后 THEN 系统 SHALL 在主界面以卡片形式展示记录，包含时间、医生姓名、药品标签和治疗观念标签
2. WHEN 用户点击记录卡片 THEN 系统 SHALL 展开显示详细的医生治疗观念描述和详细记录
3. WHEN 用户点击编辑按钮 THEN 系统 SHALL 允许修改记录的各个字段
4. WHEN 用户点击删除按钮 THEN 系统 SHALL 删除指定记录并从界面移除
5. WHEN 用户通过语音查询记录时 THEN 系统 SHALL 根据指定条件返回匹配的记录

### Requirement 4

**User Story:** 作为药代，我希望系统能够智能识别医生对药品的治疗观念层级，这样我就可以获得标准化的医生态度分析。

#### Acceptance Criteria

1. WHEN 系统提取医生治疗观念信息时 THEN 系统 SHALL 将医生的观念描述与预定义的治疗观念层级进行匹配
2. WHEN 找到最相近的治疗观念层级时 THEN 系统 SHALL 将匹配结果作为结构化字段输出
3. WHEN 无法找到合适匹配时 THEN 系统 SHALL 提供原始描述文本并标记为未分类
4. WHEN 治疗观念匹配完成时 THEN 系统 SHALL 显示匹配的层级和置信度供用户确认

### Requirement 5

**User Story:** 作为系统管理员，我希望系统能够稳定运行在AWS基础设施上，这样我就可以确保服务的可用性和可扩展性。

#### Acceptance Criteria

1. WHEN 系统部署时 THEN 系统 SHALL 运行在AWS EC2实例的Docker容器中
2. WHEN 处理语音输入时 THEN 系统 SHALL 使用AWS Transcribe服务进行语音识别
3. WHEN 系统启动时 THEN 系统 SHALL 基于Strands Agent框架初始化所有必要组件
4. WHEN 系统运行时 THEN 系统 SHALL 提供健康检查端点和日志记录功能

### Requirement 6

**User Story:** 作为药代，我希望系统能够准确存储和检索结构化的拜访数据，这样我就可以进行有效的数据分析和报告。

#### Acceptance Criteria

1. WHEN 系统存储拜访记录时 THEN 系统 SHALL 包含拜访时间、医生姓名、讨论药品名称和医生治疗观念层级字段
2. WHEN 存储数据时 THEN 系统 SHALL 验证数据完整性和格式正确性
3. WHEN 数据存储完成时 THEN 系统 SHALL 返回唯一的记录标识符
4. WHEN 系统检索数据时 THEN 系统 SHALL 支持按任意字段组合进行查询和过滤
### Require
ment 7

**User Story:** 作为药代，我希望系统能够提供直观的移动端界面，这样我就可以方便地在手机上管理拜访记录。

#### Acceptance Criteria

1. WHEN 用户打开应用 THEN 系统 SHALL 显示"拜访备忘录"标题和"智能语音记录助手"副标题
2. WHEN 系统显示拜访记录时 THEN 系统 SHALL 以时间倒序排列，每条记录显示为可展开的卡片
3. WHEN 记录卡片收起时 THEN 系统 SHALL 显示时间、医生姓名、药品标签（紫色）和治疗观念标签（绿色）
4. WHEN 记录卡片展开时 THEN 系统 SHALL 显示完整的医生治疗观念描述和详细记录信息
5. WHEN 用户需要操作记录时 THEN 系统 SHALL 在每条记录右下角提供编辑和删除按钮
6. WHEN 用户需要添加新记录时 THEN 系统 SHALL 在底部提供麦克风按钮和"点击麦克风开始录音"提示