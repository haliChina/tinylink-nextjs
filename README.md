<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="TinyLink — short URLs, redirect notice and click analytics">
</p>

<p align="center">
  <a href="https://tinylink.userhali.com"><strong>在线使用</strong></a> ·
  <a href="#工作流程">工作流程</a> ·
  <a href="#api">API</a> ·
  <a href="#安全边界">安全边界</a>
</p>

## Short links with a visible destination

TinyLink 是一个基于 Next.js 与 PostgreSQL 的短链接服务。它支持自定义短码、点击统计和链接删除，并在真正跳转前展示目标地址与 5 秒倒计时。

本仓库基于 [`navyatha2003/tinylink-nextjs`](https://github.com/navyatha2003/tinylink-nextjs) 修改，主要重做界面并增加跳转提示、安全规则和站点说明。

<p align="center">
  <img src="./assets/readme/logic.svg" width="100%" alt="TinyLink Dashboard、公开 API、PostgreSQL 与跳转检查之间的数据流">
</p>

## 工作流程

```text
目标 URL
  → URL 与短码校验
  → PostgreSQL 保存
  → /{code} 中转页
  → 显示目标地址并倒计时 5 秒
  → 用户继续或取消
  → 跳转并更新点击统计
```

## 功能

- 创建随机或自定义 6–8 位字母数字短码
- 重复短码返回 `409 Code exists`
- 短链接列表和删除
- 单链接点击次数、创建时间和最后点击时间
- 跳转前目标地址提示、立即继续和取消按钮
- HTTP/HTTPS、内网地址、危险协议和部分编码模式检查
- 中英文界面与帮助、条款、隐私和举报入口
- `/api/healthz` 健康检查

## 本地运行

```bash
git clone https://github.com/haliChina/tinylink-nextjs.git
cd tinylink-nextjs
npm install
cp .env.example .env.local
# 将 .env.local 中的 NEXT_PUBLIC_BASE_URL 改名为 SITE_URL
npm run dev
```

`.env.local` 至少需要：

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
SITE_URL=http://localhost:3000
```

源码读取 `SITE_URL` 或 `NEXT_PUBLIC_SITE_URL` 生成绝对站点链接；仓库当前 `.env.example` 中的 `NEXT_PUBLIC_BASE_URL` 没有被运行时代码使用，因此需要手动改名。

应用默认期望存在 `links` 表。可使用与当前查询字段兼容的结构：

```sql
CREATE TABLE IF NOT EXISTS links (
  code VARCHAR(8) PRIMARY KEY,
  url TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_clicked TIMESTAMPTZ
);
```

## API

### 健康检查

```http
GET /api/healthz
```

### 列出或创建链接

```http
GET  /api/links
POST /api/links
Content-Type: application/json
```

```json
{
  "url": "https://example.com/path",
  "code": "A8B3K2"
}
```

`code` 可省略。自定义值必须匹配 `[A-Za-z0-9]{6,8}`。

### 查询或删除链接

```http
GET    /api/links/:code
DELETE /api/links/:code
```

### 访问与统计

```text
/{code}       跳转提示页
/code/{code}  单链接统计页
```

## 安全边界

> [!WARNING]
> 当前代码没有为 Dashboard 和 `/api/links` 管理接口实现身份验证或授权。任何能访问部署的人都可能列出、创建和删除链接。不要把当前版本直接当作多用户或私有管理后台。

上线前建议：

- 为创建、列表、详情和删除 API 增加认证与对象级授权
- 增加服务端速率限制、请求体大小限制和审计日志
- 不向普通访客暴露完整目标 URL 列表
- 使用数据库约束处理并发短码冲突
- 配置域名信誉、反钓鱼与滥用举报处置流程

当前 URL 检查是规则过滤，不是完整的安全产品：

- 恶意域名列表仅含少量示例
- 可疑关键词只记录日志，不阻止跳转
- 没有实时域名信誉、内容扫描或 DNS 解析后的 SSRF 检查
- 5 秒提示页只能让目标更透明，不能证明目标站点安全

## 部署

适合部署到 Vercel，并使用 Neon 或其他支持 TLS 的 PostgreSQL：

1. 导入 GitHub 仓库。
2. 配置 `DATABASE_URL` 与 `SITE_URL`。
3. 创建 `links` 表。
4. 部署后将 `SITE_URL` 更新为正式域名。
5. 在公开开放前增加管理 API 鉴权。

## 技术栈

- Next.js 15 Pages Router
- React 18
- PostgreSQL / Neon
- `pg`、`validator`
- Tailwind CSS

## License

当前仓库未包含明确的许可证文件。保留上游来源说明，并在复制、修改或再分发前分别确认上游与本仓库改动的授权范围。
