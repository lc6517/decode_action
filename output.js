//Thu Mar 26 2026 00:55:17 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const qs = require("querystring"),
  axios = require("axios"),
  querystring = require("querystring"),
  {
    SocksProxyAgent
  } = require("socks-proxy-agent"),
  KS_SIGN_API_URL = process.env.ksjs_api || "你还没自定义接口你跑个蛋啊！",
  {
    getSig56,
    getSig68
  } = require("smallfawn");
console.log("💡 签名API地址设置为: " + KS_SIGN_API_URL);
function generateRandomInteractionMessage() {
  const _0x117999 = ["正在观看广告", "认真观看中...", "浏览广告内容", "模拟用户行为", "观看视频广告", "保持活跃状态", "广告浏览中", "正常观看时长"];
  return _0x117999[Math.floor(Math.random() * _0x117999.length)];
}
function getEnvNumber(_0x2b5fed, _0x335ada) {
  const _0x2a1982 = parseInt(process.env[_0x2b5fed], 10);
  return isNaN(_0x2a1982) ? _0x335ada : _0x2a1982;
}
const KSLOW_REWARD_THRESHOLD = getEnvNumber("KSLOW_REWARD_THRESHOLD", 1),
  KSROUNDS = getEnvNumber("KSROUNDS", 5),
  KSCOIN_LIMIT = getEnvNumber("KSCOIN_LIMIT", 500000),
  KSLOW_REWARD_LIMIT = getEnvNumber("KSLOW_REWARD_LIMIT", 1),
  KSFOLLOW_COUNT = getEnvNumber("KSFOLLOW_COUNT", 1),
  KSSEARCHFOLLOW_COUNT = getEnvNumber("KSSEARCHFOLLOW_COUNT", 1),
  KSLOOK_COUNT = getEnvNumber("KSLOOK_COUNT", 5),
  KSSEARCH_COUNT = getEnvNumber("KSSEARCH_COUNT", 5),
  KS_INVITE_CONFIG_URL = process.env.KS_INVITE_CONFIG_URL || "https://gitee.com/smallfawn/Note/raw/main/KSConfig.json";
let inviteAssistTasks = [],
  inviteBindTasks = [];
function parseInviteTasksFromEnv(_0x3b8aa0) {
  const _0xb9e9d4 = process.env[_0x3b8aa0];
  if (!_0xb9e9d4) return null;
  try {
    const _0x39ae5e = JSON.parse(_0xb9e9d4);
    if (Array.isArray(_0x39ae5e)) return _0x39ae5e;
    if (_0x39ae5e && typeof _0x39ae5e === "object") return [_0x39ae5e];
  } catch (_0x2b177b) {}
  return null;
}
function parseInviteCodeEntries() {
  const _0xf3f724 = process.env.ksuserinvite || process.env.KSUSERINVITE || process.env.KS_INVITECODE || process.env.KS_INVITE_CODE;
  if (!_0xf3f724) return [];
  return String(_0xf3f724).split(/[,|&\n]/).map(_0x3cdd94 => _0x3cdd94.trim()).filter(Boolean).map(_0x11d0dc => ({
    "inviteCode": _0x11d0dc
  }));
}
async function loadInviteConfig() {
  const _0x131182 = parseInviteTasksFromEnv("KS_INVITE"),
    _0x1201fb = parseInviteTasksFromEnv("KS_INVITE2"),
    _0x58ac74 = parseInviteCodeEntries();
  if (_0x131182) inviteAssistTasks = _0x131182;
  if (_0x1201fb) inviteBindTasks = _0x1201fb;
  if (_0x58ac74.length) inviteBindTasks.push(..._0x58ac74);
  if (_0x131182 || _0x1201fb || _0x58ac74.length) {
    console.log("[INVITE] 使用环境变量助力配置: invite=" + inviteAssistTasks.length + ", invite2=" + inviteBindTasks.length);
    return;
  }
  try {
    const {
      data: _0x35b124
    } = await axios.request({
      "method": "GET",
      "url": KS_INVITE_CONFIG_URL,
      "timeout": 12000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    _0x35b124 && Array.isArray(_0x35b124.invite) && (inviteAssistTasks = _0x35b124.invite);
    if (_0x35b124 && Array.isArray(_0x35b124.invite2)) {
      inviteBindTasks = _0x35b124.invite2;
    }
    console.log("[INVITE] 远端助力配置加载完成: invite=" + inviteAssistTasks.length + ", invite2=" + inviteBindTasks.length);
  } catch (_0x15849d) {
    inviteAssistTasks = [];
    inviteBindTasks = [];
    console.log("[INVITE] 远端助力配置加载失败: " + _0x15849d.message);
  }
}
function getTasksToExecute() {
  const _0x3aad76 = process.env.Task;
  if (!_0x3aad76) return console.log("未设置Task环境变量，将执行所有任务 (food, box, look, search)"), ["food", "box", "look", "search"];
  const _0x35755f = _0x3aad76.split(",").map(_0x360aaf => _0x360aaf.trim().toLowerCase()).filter(Boolean),
    _0x1d93e1 = ["food", "box", "look", "search"],
    _0x2f5134 = _0x35755f.filter(_0x514e04 => _0x1d93e1.includes(_0x514e04));
  if (_0x2f5134.length === 0) return console.log("Task环境变量中没有有效任务，将执行所有任务 (food, box, look, search)"), ["food", "box", "look", "search"];
  const _0x13c89d = _0x2f5134.filter(_0x856ebc => _0x856ebc !== "look" && _0x856ebc !== "search");
  _0x2f5134.includes("search") && _0x13c89d.push("search");
  _0x2f5134.includes("look") && _0x13c89d.push("look");
  console.log("从Task环境变量中解析到要执行的任务: " + _0x13c89d.join(", "));
  return _0x13c89d;
}
function getAccountConfigsFromEnv() {
  const _0x59473a = [],
    _0x491f05 = new Set();
  if (process.env.ksjsck) {
    const _0x3d67e8 = process.env.ksjsck,
      _0x335300 = _0x3d67e8.split("&").map(_0x1fa239 => _0x1fa239.trim()).filter(Boolean);
    _0x59473a.push(..._0x335300);
  }
  for (let _0x146e6b = 1; _0x146e6b <= 666; _0x146e6b++) {
    {
      const _0x48a429 = "ksjsck" + _0x146e6b;
      if (process.env[_0x48a429]) {
        const _0x2e4f16 = process.env[_0x48a429],
          _0x3f4632 = _0x2e4f16.split("&").map(_0x4ed691 => _0x4ed691.trim()).filter(Boolean);
        _0x59473a.push(..._0x3f4632);
      }
    }
  }
  const _0x17ed96 = [];
  for (const _0x311099 of _0x59473a) {
    !_0x491f05.has(_0x311099) && (_0x491f05.add(_0x311099), _0x17ed96.push(_0x311099));
  }
  console.log("从ksjsck及ksjsck1到ksjsck666环境变量中解析到 " + _0x17ed96.length + " 个唯一配置");
  return _0x17ed96;
}
const accountConfigs = getAccountConfigsFromEnv(),
  accountCount = accountConfigs.length,
  tasksToExecute = getTasksToExecute();
console.log("您可以根据需求设置以下环境变量来自定义任务行为：");
console.log("----------------------------------------------------------------");
console.log("账号/任务控制 (必填/常用):");
console.log("  - ksjsck/ksjsckX: 账号信息 (cookie#salt#proxy) - 必填项");
console.log("  - Task: 指定任务 (如 food,box,look,search)");
console.log("  - KSROUNDS: 总执行轮数 (默认 5)");
console.log("----------------------------------------------------------------");
console.log("频率/追加次数 (已支持自定义):");
console.log("  - KSLOOK_COUNT: 每轮 look (主任务) 次数 (默认 5)");
console.log("  - KSFOLLOW_COUNT: 每次 look 成功后 follow (追加) 次数 (默认 1)");
console.log("  - KSSEARCH_COUNT: 每轮 search (主任务) 次数 (默认 5)");
console.log("  - KSSEARCHFOLLOW_COUNT: 每次 search 成功后 search_follow (追加) 次数 (默认 100)");
console.log("----------------------------------------------------------------");
console.log("风控/限制设置:");
console.log("  - KSCOIN_LIMIT: 金币上限 (超过停止, 默认 150000)");
console.log("  - KSLOW_REWARD_LIMIT: 连续低奖励停止次数 (默认 1)");
console.log("  - MAX_CONCURRENCY: 最大并发账号数 (默认 3)");
console.log("  - ksjs_api: 签名服务 API 地址");
console.log("  - 内置签到和打卡 安装最新smallfawn模块即可");
console.log("");
console.log("================================================================");
console.log("💎 检测到环境变量配置：" + accountCount + "个账号");
console.log("🎯 将执行以下任务：" + tasksToExecute.join(", "));
console.log("🎯 配置参数：轮数=" + KSROUNDS + ", look次数/轮=" + KSLOOK_COUNT + ", search次数/轮=" + KSSEARCH_COUNT + ", follow次数/look=" + KSFOLLOW_COUNT + ", search_follow次数/search=" + KSSEARCHFOLLOW_COUNT + ", 金币上限=" + KSCOIN_LIMIT + ", 低奖励阈值=" + KSLOW_REWARD_THRESHOLD + ", 连续低奖励上限=" + KSLOW_REWARD_LIMIT);
accountCount > (process.env.MAX_CONCURRENCY || 999) && (console.log("错误: 检测到 " + accountCount + " 个账号配置，最多只允许" + (process.env.MAX_CONCURRENCY || 999) + "个"), process.exit(1));
function generateKuaishouDid() {
  try {
    const _0x21fde4 = "0123456789abcdef";
    let _0x4c5324 = "";
    for (let _0x2c3cb9 = 0; _0x2c3cb9 < 16; _0x2c3cb9++) {
      _0x4c5324 += _0x21fde4.charAt(Math.floor(Math.random() * _0x21fde4.length));
    }
    return "ANDROID_" + _0x4c5324;
  } catch (_0x4a8acd) {
    {
      const _0x440d04 = Date.now().toString(16).toUpperCase();
      return "ANDROID_" + _0x440d04.substring(0, 16);
    }
  }
}
async function sendRequest(_0x4f6a1f, _0x1a0e44 = null, _0x29dc65 = "Unknown Request") {
  const _0x1b04fb = {
    ..._0x4f6a1f
  };
  let _0x3aed25 = null;
  if (_0x1a0e44) try {
    _0x3aed25 = new SocksProxyAgent(_0x1a0e44);
  } catch (_0x4f4f50) {
    console.log("[WARN] " + _0x29dc65 + " invalid proxy URL (" + _0x4f4f50.message + "), fallback to direct mode");
  }
  try {
    {
      const _0x3aa98b = {
          "method": _0x1b04fb.method || "GET",
          "url": _0x1b04fb.url,
          "headers": _0x1b04fb.headers || {},
          "data": _0x1b04fb.body || _0x1b04fb.form,
          "timeout": _0x1b04fb.timeout || 30000,
          ...(_0x3aed25 && {
            "httpAgent": _0x3aed25,
            "httpsAgent": _0x3aed25
          })
        },
        _0x346f41 = await axios(_0x3aa98b);
      return {
        "response": _0x346f41,
        "body": _0x346f41.data
      };
    }
  } catch (_0x54b68c) {
    if (_0x54b68c.response) {
      return {
        "response": _0x54b68c.response,
        "body": null
      };
    }
    return {
      "response": null,
      "body": null
    };
  }
}
function isValidIP(_0x22e135) {
  if (!_0x22e135 || typeof _0x22e135 !== "string") return false;
  if (_0x22e135.includes("<html>") || _0x22e135.includes("503 Service Temporarily Unavailable") || _0x22e135.includes("502 Bad Gateway") || _0x22e135.includes("504 Gateway Timeout")) {
    return false;
  }
  const _0x3fd430 = /^(\d{1,3}\.){3}\d{1,3}$/,
    _0x129b1b = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (_0x3fd430.test(_0x22e135)) {
    const _0x249fc5 = _0x22e135.split(".");
    for (const _0x43f3a8 of _0x249fc5) {
      const _0x279ab1 = parseInt(_0x43f3a8, 10);
      if (_0x279ab1 < 0 || _0x279ab1 > 255 || isNaN(_0x279ab1)) return false;
    }
    return true;
  }
  return _0x129b1b.test(_0x22e135);
}
async function testProxyConnectivity(_0x5f2478, _0x5c0f6a = "Proxy Connectivity Test", _0x334a9b = 3) {
  if (!_0x5f2478) return {
    "ok": true,
    "msg": "No proxy configured (direct mode)",
    "ip": "localhost"
  };
  let _0x4abacb = null;
  const _0x58bf2f = ["https://api.ip.sb/ip", "https://ifconfig.me/ip", "https://icanhazip.com", "https://checkip.amazonaws.com", "https://api.myip.com"];
  for (let _0x3c7198 = 1; _0x3c7198 <= _0x334a9b; _0x3c7198++) {
    {
      console.log("[PROXY] " + _0x5c0f6a + " testing... (" + _0x3c7198 + "/" + _0x334a9b + ")");
      for (const _0x376d16 of _0x58bf2f) {
        try {
          {
            const {
              body: _0x3c3bb8
            } = await sendRequest({
              "method": "GET",
              "url": _0x376d16,
              "headers": {
                "User-Agent": "ProxyTester/1.0"
              },
              "timeout": 15000
            }, _0x5f2478, _0x5c0f6a + " ->" + new URL(_0x376d16).hostname);
            if (typeof _0x3c3bb8 === "string" && (_0x3c3bb8.includes("<html>") || _0x3c3bb8.includes("503 Service Temporarily Unavailable") || _0x3c3bb8.includes("502 Bad Gateway") || _0x3c3bb8.includes("504 Gateway Timeout"))) {
              continue;
            }
            if (!_0x3c3bb8) continue;
            let _0x5e78dd = null;
            if (_0x376d16.includes("httpbin.org") && _0x3c3bb8.origin) _0x5e78dd = _0x3c3bb8.origin;else {
              if (_0x376d16.includes("ipify.org") && _0x3c3bb8.ip) _0x5e78dd = _0x3c3bb8.ip;else {
                if (_0x376d16.includes("jsonip.com") && _0x3c3bb8.ip) _0x5e78dd = _0x3c3bb8.ip;else {
                  if (_0x376d16.includes("my-ip.io") && _0x3c3bb8.ip) _0x5e78dd = _0x3c3bb8.ip;else {
                    if (typeof _0x3c3bb8 === "string" && !_0x3c3bb8.includes("<")) _0x5e78dd = _0x3c3bb8.trim();
                  }
                }
              }
            }
            if (_0x5e78dd && isValidIP(_0x5e78dd)) return console.log("[OK] " + _0x5c0f6a + " exit IP: " + _0x5e78dd), {
              "ok": true,
              "msg": "SOCKS5 proxy is available, exit IP: " + _0x5e78dd,
              "ip": _0x5e78dd
            };
          }
        } catch (_0xfab1e2) {
          _0x4abacb = _0xfab1e2;
        }
        await new Promise(_0x3a9c52 => setTimeout(_0x3a9c52, 500));
      }
      if (_0x3c7198 < _0x334a9b) {
        const _0x5d52e7 = _0x3c7198 * 2000;
        console.log("[RETRY] " + _0x5c0f6a + " all endpoints failed, retry in " + _0x5d52e7 / 1000 + "s...");
        await new Promise(_0x2c0457 => setTimeout(_0x2c0457, _0x5d52e7));
      }
    }
  }
  try {
    new URL(_0x5f2478);
  } catch (_0x10c309) {
    return {
      "ok": false,
      "msg": "Invalid proxy URL: " + _0x10c309.message,
      "ip": null
    };
  }
  return {
    "ok": false,
    "msg": "Proxy test failed: " + (_0x4abacb?.["message"] || "all endpoints unavailable"),
    "ip": null
  };
}
const usedProxies = new Set();
async function getAccountBasicInfo(_0x94c2ca, _0x53b6a3, _0x13bde8 = "?") {
  const _0x1774b9 = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first",
    {
      body: _0x21af13
    } = await sendRequest({
      "method": "GET",
      "url": _0x1774b9,
      "headers": {
        "Host": "nebula.kuaishou.com",
        "User-Agent": "kwai-android aegon/3.56.0",
        "Cookie": _0x94c2ca,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "timeout": 12000
    }, _0x53b6a3, "Account[" + _0x13bde8 + "] fetch basic info");
  if (_0x21af13 && _0x21af13.result === 1 && _0x21af13.data) return {
    "nickname": _0x21af13.data.userData?.["nickname"] || null,
    "totalCoin": _0x21af13.data.totalCoin ?? null,
    "allCash": _0x21af13.data.allCash ?? null
  };
  return null;
}
function centerAlign(_0x7f22c0, _0x489f25) {
  _0x7f22c0 = String(_0x7f22c0);
  if (_0x7f22c0.length >= _0x489f25) return _0x7f22c0.substring(0, _0x489f25);
  const _0xcb781a = _0x489f25 - _0x7f22c0.length,
    _0x1dc987 = Math.floor(_0xcb781a / 2),
    _0x4a9f46 = _0xcb781a - _0x1dc987;
  return " ".repeat(_0x1dc987) + _0x7f22c0 + " ".repeat(_0x4a9f46);
}
class KuaishouAdTask {
  constructor({
    index: _0x4437fc,
    salt: _0x23488f,
    cookie: _0x477a04,
    nickname = "",
    proxyUrl = null,
    tasksToExecute = ["food", "box", "look", "search"],
    remark = ""
  }) {
    this.index = _0x4437fc;
    this.salt = _0x23488f;
    this.cookie = _0x477a04;
    this.nickname = nickname || remark || "账号" + _0x4437fc;
    this.remark = remark;
    this.proxyUrl = proxyUrl;
    this.coinLimit = KSCOIN_LIMIT;
    this.coinExceeded = false;
    this.tasksToExecute = tasksToExecute;
    this.searchFollowCount = 0;
    this.extractCookieInfo();
    this.headers = {
      "Host": "nebula.kuaishou.com",
      "Connection": "keep-alive",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
      "Cookie": this.cookie,
      "content-type": "application/json"
    };
    this.taskReportPath = "/rest/r/ad/task/report";
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.queryParams = "mod=Xiaomi(MI 11)&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.taskConfigs = {
      "box": {
        "name": "宝箱广告",
        "pageId": 11101,
        "businessId": 606,
        "posId": 20346,
        "subPageId": 100024064,
        "requestSceneType": 1,
        "taskType": 1
      },
      "look": {
        "name": "看广告得金币",
        "pageId": 11101,
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 1,
        "taskType": 1
      },
      "food": {
        "name": "饭补广告",
        "pageId": 11101,
        "businessId": 9362,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 7,
        "taskType": 2
      },
      "follow": {
        "name": "追加看广告得金币",
        "pageId": 11101,
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 2,
        "taskType": 1
      },
      "search": {
        "name": "搜索任务",
        "pageId": 11014,
        "businessId": 7076,
        "posId": 216268,
        "subPageId": 100161537,
        "requestSceneType": 1,
        "taskType": 1
      },
      "search_follow": {
        "name": "搜索任务追加",
        "pageId": 11014,
        "businessId": 7076,
        "posId": 216268,
        "subPageId": 100161537,
        "requestSceneType": 7,
        "taskType": 2
      }
    };
    this.taskStats = {};
    const _0x37acc1 = new Set(this.tasksToExecute);
    _0x37acc1.add("follow");
    _0x37acc1.add("search");
    _0x37acc1.add("search_follow");
    _0x37acc1.forEach(_0xe0e923 => {
      {
        this.taskConfigs[_0xe0e923] && (this.taskStats[_0xe0e923] = {
          "success": 0,
          "failed": 0,
          "totalReward": 0
        });
      }
    });
    this.lowRewardStreak = 0;
    this.lowRewardThreshold = KSLOW_REWARD_THRESHOLD;
    this.lowRewardLimit = KSLOW_REWARD_LIMIT;
    this.stopAllTasks = false;
    this.taskLimitReached = {};
    this.tasksToExecute.forEach(_0xf9b50d => {
      {
        this.taskConfigs[_0xf9b50d] && (this.taskLimitReached[_0xf9b50d] = false);
      }
    });
    this.taskLimitReached.follow = false;
    this.taskLimitReached.search = false;
    this.taskLimitReached.search_follow = false;
  }
  async ["checkCoinLimit"]() {
    try {
      {
        const _0x28e0cf = await getAccountBasicInfo(this.cookie, this.proxyUrl, this.index);
        if (_0x28e0cf && _0x28e0cf.totalCoin) {
          {
            const _0x18b0f3 = parseInt(_0x28e0cf.totalCoin);
            if (_0x18b0f3 >= 500000) return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币已达 " + _0x18b0f3 + "，超过 " + this.coinLimit + " 阈值，将停止任务"), this.coinExceeded = true, this.stopAllTasks = true, true;
          }
        }
        return false;
      }
    } catch (_0x7e385) {
      console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币检查异常: " + _0x7e385.message);
      return false;
    }
  }
  async ["runDailySignAndClockIn"]() {
    await this.signInDaily();
    await this.runHugeClockIn();
  }
  async ["runInviteAssist"]() {
    if (!inviteAssistTasks.length && !inviteBindTasks.length) return;
    console.log("[INVITE] account[" + this.nickname + "] start invite assist flow");
    await this.executeInviteTasks();
  }
  async ["executeInviteTasks"]() {
    if (inviteAssistTasks.length > 0) for (const _0x3f099e of inviteAssistTasks) {
      await this.taskInvite1(_0x3f099e);
    }
    if (inviteBindTasks.length > 0) {
      for (const _0x1a024a of inviteBindTasks) {
        await this.taskInvite2(_0x1a024a);
      }
    }
  }
  async ["taskInvite1"](_0x1f823a) {
    try {
      const _0x5caa02 = _0x1f823a === undefined ? "" : _0x1f823a;
      let _0x482452 = "https://nebula.kuaishou.com/rest/wd/zt/task/report/assist/match?__NS_sig3=";
      if (_0x5caa02 && typeof _0x5caa02 === "object" && _0x5caa02.activityId === "turntable_o1") {
        _0x482452 = "https://encourage.kuaishou.com/rest/wd/zt/task/report/assist/match?__NS_sig3=";
      }
      const _0x44980a = await getSig56(Buffer.from(JSON.stringify(_0x5caa02)).toString("base64"));
      if (!_0x44980a) return console.log("[WARN] account[" + this.nickname + "] invite assist sig build failed"), false;
      const {
        body: _0x536b63
      } = await sendRequest({
        "method": "POST",
        "url": _0x482452 + _0x44980a,
        "headers": {
          "User-Agent": "Mozilla/5.0 (Linux; Android " + this.osVersion + "; " + this.randomUserAgent() + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 Yoda/3.2.16-rc21 ksNebula/13.9.10.10684 OS_PRO_BIT/64 MAX_PHY_MEM/5724 KDT/PHONE AZPREFIX/az3 ICFO/0 StatusHT/29 TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn SHP/2068 SWP/1080 SD/2.75 CT/0 ISLM/0",
          "Content-Type": "application/json",
          "Cookie": this.cookie
        },
        "body": _0x5caa02,
        "timeout": 12000
      }, this.proxyUrl, "account[" + this.nickname + "] invite assist match");
      if (_0x536b63?.["result"] === 1) return console.log("[OK] account[" + this.nickname + "] invite assist request success"), true;
      const _0x5bbe6d = _0x536b63?.["error_msg"] || _0x536b63?.["errorMsg"] || _0x536b63?.["msg"] || "unknown";
      console.log("[WARN] account[" + this.nickname + "] invite assist request failed: " + _0x5bbe6d);
      return false;
    } catch (_0x25adf7) {
      console.log("[WARN] account[" + this.nickname + "] invite assist error: " + _0x25adf7.message);
      return false;
    }
  }
  ["buildInviteQueryData"]() {
    const _0x3a4a21 = this.appver && this.appver.split(".").length >= 2 ? this.appver.split(".")[0] + "." + this.appver.split(".")[1] : "13.8";
    return {
      "mod": this.mod,
      "appver": this.appver,
      "language": this.language,
      "ud": this.userId,
      "did_tag": this.did_tag,
      "egid": this.egid,
      "kpf": this.kpf,
      "oDid": this.oDid,
      "kpn": this.kpn,
      "newOc": this.newOc,
      "androidApiLevel": this.androidApiLevel,
      "browseType": this.browseType,
      "socName": this.socName,
      "c": this.c,
      "abi": this.abi,
      "ftt": this.ftt,
      "userRecoBit": this.userRecoBit,
      "device_abi": this.device_abi,
      "grant_browse_type": this.grant_browse_type,
      "iuid": this.iuid,
      "rdid": this.rdid,
      "did": this.did,
      "earphoneMode": "1",
      "isp": "",
      "thermal": "10000",
      "net": "WIFI",
      "kcv": "1599",
      "app": "0",
      "bottom_navigation": "true",
      "ver": _0x3a4a21,
      "android_os": "0",
      "boardPlatform": "sdm660",
      "slh": "0",
      "country_code": "cn",
      "nbh": "130",
      "hotfix_ver": "",
      "did_gt": "1761129025119",
      "keyconfig_state": "2",
      "cdid_tag": "7",
      "sys": "ANDROID_" + this.osVersion,
      "max_memory": "256",
      "cold_launch_time_ms": "1761380491706",
      "oc": this.mod || "XIAOMI",
      "sh": "2280",
      "deviceBit": "0",
      "ddpi": "440",
      "is_background": "0",
      "sw": "1080",
      "apptype": "22",
      "icaver": "1",
      "totalMemory": "5724",
      "sbh": "82",
      "darkMode": "false"
    };
  }
  async ["loadInviteReqParams"](_0x137b7e, _0x511a93) {
    try {
      const _0x24780f = this.buildInviteQueryData(),
        _0xb73991 = await this.requestSignService({
          "urlpath": _0x137b7e,
          "reqdata": qs.stringify(_0x511a93) + "&" + qs.stringify(_0x24780f),
          "api_client_salt": this.salt
        }, "account[" + this.nickname + "] invite sign");
      if (!_0xb73991) return null;
      Object.assign(_0x24780f, {
        "sig": _0xb73991.sig,
        "__NS_xfalcon": _0xb73991.__NS_xfalcon || "",
        "__NStokensig": _0xb73991.__NStokensig,
        "__NS_sig3": _0xb73991.__NS_sig3
      });
      return {
        "queryData": _0x24780f,
        "headersData": {
          "kaw": _0xb73991.kaw || "MDHkM+9FrbzWSEAqyw6KYWWBbnP3Zmh3HL3RNoTk0mflLja017flDZyhw5HQ/kdj9eJwFtUMxCHs4jfkbu0I4tSimqX4LK/ilIetBDEtRtwL7mU1wZGFgNZMJ1sk/JfB79x800OeS2PM9s7fga7hjifPZY8T/1wfFYUhZVJ1b1hUl02b9lbTmMNMi++r6Qgz+pSNmqKrUMxvt6EbE4ssc3LkEY/C/+pua5Chw/lb5DeHNCUVwd5nUocA",
          "kas": _0xb73991.kas || "00168874b3daebdfb00fe51bce4c8b8729"
        }
      };
    } catch (_0x528e44) {
      console.log("[WARN] account[" + this.nickname + "] invite sign error: " + _0x528e44.message);
      return null;
    }
  }
  async ["taskInvite2"](_0x17f475) {
    try {
      if (!_0x17f475 || typeof _0x17f475 !== "object") return false;
      const _0x90528b = "https://az3-api.ksapisrv.com/rest/nebula/inviteCode/bind",
        _0xeed25e = {
          ..._0x17f475,
          "cs": "false",
          "client_key": "2ac2a76d",
          "videoModelCrowdTag": "",
          "os": "android",
          "kuaishou.api_st": this.kuaishouApiSt,
          "uQaTag": this.uQaTag
        },
        _0x291368 = await this.loadInviteReqParams("/rest/nebula/inviteCode/bind", _0xeed25e);
      if (!_0x291368) return false;
      const _0x5d9f8d = _0x90528b + "?" + querystring.stringify(_0x291368.queryData),
        {
          body: _0x18dc51
        } = await sendRequest({
          "method": "POST",
          "url": _0x5d9f8d,
          "headers": {
            "kaw": _0x291368.headersData.kaw,
            "kas": _0x291368.headersData.kas,
            "User-Agent": "kwai-android aegon/4.28.0",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "kuaishou.api_st=" + this.kuaishouApiSt
          },
          "body": qs.stringify(_0xeed25e),
          "timeout": 12000
        }, this.proxyUrl, "account[" + this.nickname + "] invite bind");
      if (_0x18dc51?.["result"] === 1) return console.log("[OK] account[" + this.nickname + "] invite bind request success"), true;
      const _0x219372 = _0x18dc51?.["error_msg"] || _0x18dc51?.["errorMsg"] || _0x18dc51?.["msg"] || "unknown";
      console.log("[WARN] account[" + this.nickname + "] invite bind request failed: " + _0x219372);
      return false;
    } catch (_0x5cacbe) {
      console.log("[WARN] account[" + this.nickname + "] invite bind error: " + _0x5cacbe.message);
      return false;
    }
  }
  async ["signInDaily"]() {
    try {
      const _0x270794 = await getSig68({}, {}, "get", "json", this.cookie),
        _0x20451a = _0x270794 && _0x270794.result ? _0x270794.result : "";
      if (!_0x20451a) return console.log("[WARN] account[" + this.nickname + "] signIn signature build failed"), false;
      const _0x11d6cb = "https://nebula.kuaishou.com/rest/wd/encourage/unionTask/signIn/report?" + _0x20451a,
        {
          body: _0x3e868f
        } = await sendRequest({
          "method": "GET",
          "url": _0x11d6cb,
          "headers": {
            "Content-Type": "application/json",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": this.cookie
          },
          "timeout": 12000
        }, this.proxyUrl, "account[" + this.nickname + "] signIn"),
        _0x16180b = _0x3e868f?.["data"]?.["reportRewardResult"]?.["eventTrackingAwardInfo"]?.["awardInfo"]?.[0]?.["amount"];
      if (_0x16180b !== undefined && _0x16180b !== null) {
        console.log("[OK] account[" + this.nickname + "] signIn success, reward=" + _0x16180b);
        return true;
      }
      if (_0x3e868f?.["result"] === 1) return console.log("[OK] account[" + this.nickname + "] signIn request done"), true;
      const _0xc145b9 = _0x3e868f?.["error_msg"] || _0x3e868f?.["errorMsg"] || "unknown";
      console.log("[WARN] account[" + this.nickname + "] signIn not completed: " + _0xc145b9);
      return false;
    } catch (_0xdebe67) {
      console.log("[WARN] account[" + this.nickname + "] signIn error: " + _0xdebe67.message);
      return false;
    }
  }
  async ["runHugeClockIn"]() {
    try {
      {
        const {
          body: _0x19b0f5
        } = await sendRequest({
          "method": "GET",
          "url": "https://encourage.kuaishou.com/rest/ug-regular/hugeSignIn/home?source=task&sourceToken=",
          "headers": {
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": this.cookie
          },
          "timeout": 12000
        }, this.proxyUrl, "account[" + this.nickname + "] hugeSignIn home");
        if (_0x19b0f5?.["result"] !== 1 || !_0x19b0f5?.["data"]?.["task"]) {
          return false;
        }
        const _0x2960d4 = _0x19b0f5.data.task,
          _0xf57a35 = {
            "subBizId": _0x2960d4.subbizId,
            "idfa": "",
            "oaid": this.oDid || this.did || "",
            "userFeatureParam": _0x2960d4.hugeSignInTaskToken,
            "snapshotExtParam": _0x2960d4.taskSnapshotToken,
            "selfReportParam": "{\"pushSwitchStatus\":true,\"hugeSignInWidgetStatus\":false,\"ignoringBatteryOptimizationsStatus\":true}"
          },
          _0x2191dc = await getSig56(Buffer.from(JSON.stringify(_0xf57a35)).toString("base64"));
        if (!_0x2191dc) return console.log("[WARN] account[" + this.nickname + "] hugeSignIn list sig build failed"), false;
        const _0x5db3c2 = "https://encourage.kuaishou.com/rest/wd/zt/task/list/trigger?__NS_sig3=" + _0x2191dc,
          {
            body: _0x178c2d
          } = await sendRequest({
            "method": "POST",
            "url": _0x5db3c2,
            "headers": {
              "Content-Type": "application/json",
              "User-Agent": "kwai-android aegon/3.56.0",
              "Cookie": this.cookie
            },
            "body": _0xf57a35,
            "timeout": 12000
          }, this.proxyUrl, "account[" + this.nickname + "] hugeSignIn task list");
        if (_0x178c2d?.["result"] !== 1 || !Array.isArray(_0x178c2d?.["data"]?.["tasks"])) return false;
        let _0xba489a = false;
        for (const _0x56b3cb of _0x178c2d.data.tasks) {
          {
            if (_0x56b3cb.taskId === 29951 && _0x56b3cb.taskStatus !== "TASK_COMPLETED") {
              {
                const _0x4a9c6f = await this.reportHugeClockTask(_0x56b3cb.subBizId, _0x56b3cb.taskId);
                _0xba489a = _0xba489a || _0x4a9c6f;
              }
            }
          }
        }
        !_0xba489a && console.log("[OK] account[" + this.nickname + "] hugeSignIn clock task already completed");
        return true;
      }
    } catch (_0x3ea650) {
      console.log("[WARN] account[" + this.nickname + "] hugeSignIn error: " + _0x3ea650.message);
      return false;
    }
  }
  async ["reportHugeClockTask"](_0x168f42, _0x342621) {
    try {
      {
        const _0x3c222f = {
            "reportCount": 1,
            "subBizId": _0x168f42,
            "taskId": _0x342621
          },
          _0x31e9fe = await getSig56(Buffer.from(JSON.stringify(_0x3c222f)).toString("base64"));
        if (!_0x31e9fe) return false;
        const _0x300fef = "https://encourage.kuaishou.com/rest/wd/zt/task/report?__NS_sig3=" + _0x31e9fe,
          {
            body: _0x1fd569
          } = await sendRequest({
            "method": "POST",
            "url": _0x300fef,
            "headers": {
              "Content-Type": "application/json",
              "User-Agent": "kwai-android aegon/3.56.0",
              "Cookie": this.cookie
            },
            "body": _0x3c222f,
            "timeout": 12000
          }, this.proxyUrl, "account[" + this.nickname + "] hugeSignIn report");
        if (_0x1fd569?.["result"] === 1 && _0x1fd569?.["data"]?.["taskCompleted"] === true) return console.log("[OK] account[" + this.nickname + "] hugeSignIn report success"), true;
        return false;
      }
    } catch (_0x365b75) {
      console.log("[WARN] account[" + this.nickname + "] hugeSignIn report error: " + _0x365b75.message);
      return false;
    }
  }
  ["getCookieValue"](_0x101b77, _0x5c80d2 = "") {
    const _0x50f266 = String(_0x101b77).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      _0xcbdd90 = this.cookie.match(new RegExp(_0x50f266 + "=([^;]+)"));
    return _0xcbdd90 ? _0xcbdd90[1] : _0x5c80d2;
  }
  ["randomUserAgent"]() {
    const _0x8545af = ["MI 8 Lite", "MI 10 Ultra", "MI 11", "Redmi K30", "Redmi Note 11", "Huawei P40", "Huawei Mate 40", "OPPO Reno 10", "Vivo X90", "OnePlus 11", "realme GT 6", "SM-G9980"];
    return _0x8545af[Math.floor(Math.random() * _0x8545af.length)];
  }
  ["extractCookieInfo"]() {
    try {
      {
        const _0x4fc509 = this.cookie.match(/egid=([^;]+)/),
          _0x493b5d = this.cookie.match(/did=([^;]+)/),
          _0x5beeed = this.cookie.match(/userId=([^;]+)/),
          _0x4b2812 = this.cookie.match(/oDid=([^;]+)/),
          _0x467f55 = this.cookie.match(/kuaishou\.api_st=([^;]+)/),
          _0x270797 = this.cookie.match(/appver=([^;]+)/);
        this.egid = _0x4fc509 ? _0x4fc509[1] : "";
        this.did = _0x493b5d ? _0x493b5d[1] : "";
        this.userId = _0x5beeed ? _0x5beeed[1] : "";
        this.oDid = _0x4b2812 ? _0x4b2812[1] : "";
        this.kuaishouApiSt = _0x467f55 ? _0x467f55[1] : "";
        this.appver = _0x270797 ? _0x270797[1] : "13.7.20.10468";
        const _0x3fe130 = (_0x207b63, _0x5ce5ce = "") => {
          {
            if (!_0x207b63 && _0x207b63 !== "") return _0x5ce5ce;
            try {
              return decodeURIComponent(_0x207b63);
            } catch (_0x4650dc) {
              return _0x207b63;
            }
          }
        };
        this.mod = _0x3fe130(this.getCookieValue("mod", "Xiaomi(MI 11)"), "Xiaomi(MI 11)");
        this.language = this.getCookieValue("language", "zh-cn");
        this.did_tag = this.getCookieValue("did_tag", "0");
        this.kpf = this.getCookieValue("kpf", "ANDROID_PHONE");
        this.kpn = this.getCookieValue("kpn", "NEBULA");
        this.newOc = this.getCookieValue("newOc", "ANDROID_15");
        this.androidApiLevel = this.getCookieValue("androidApiLevel", "35");
        this.browseType = this.getCookieValue("browseType", "4");
        this.socName = _0x3fe130(this.getCookieValue("socName", "qcom"), "qcom");
        this.c = this.getCookieValue("c", "CN");
        this.abi = this.getCookieValue("abi", "arm64");
        this.ftt = this.getCookieValue("ftt", "");
        this.userRecoBit = this.getCookieValue("userRecoBit", "0");
        this.device_abi = this.getCookieValue("device_abi", "arm64-v8a");
        this.grant_browse_type = this.getCookieValue("grant_browse_type", "AUTHORIZED");
        this.iuid = this.getCookieValue("iuid", "");
        this.rdid = this.getCookieValue("rdid", "");
        this.osVersion = this.getCookieValue("osVersion", "15");
        this.uQaTag = _0x3fe130(this.getCookieValue("uQaTag", "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"), "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0");
        (!this.egid || !this.did) && console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " cookie格式可能无 egid 或 did，但继续尝试...");
      }
    } catch (_0x232564) {
      console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 解析cookie失败: " + _0x232564.message);
    }
  }
  ["getTaskStats"]() {
    return this.taskStats;
  }
  ["printTaskStats"]() {
    console.log("\n账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务执行统计:");
    const _0x23f0d5 = ["box", "look", "follow", "food", "search", "search_follow"];
    _0x23f0d5.forEach(_0x29d650 => {
      {
        const _0x4e12f4 = this.taskStats[_0x29d650],
          _0x36facf = this.taskConfigs[_0x29d650];
        _0x4e12f4 && _0x36facf && console.log("  " + _0x36facf.name + ": 成功" + _0x4e12f4.success + "次, 失败" + _0x4e12f4.failed + "次, 总奖励" + _0x4e12f4.totalReward + "金币");
      }
    });
  }
  async ["retryOperation"](_0x264217, _0x30f5be, _0x47c8b9 = 3, _0x5a0db1 = 2000) {
    let _0x4b2115 = 0,
      _0x2f4103 = null;
    while (_0x4b2115 < _0x47c8b9) {
      try {
        {
          const _0x36797c = await _0x264217();
          if (_0x36797c) return _0x36797c;
          _0x2f4103 = new Error(_0x30f5be + " 返回空结果");
        }
      } catch (_0xc0c75) {
        _0x2f4103 = _0xc0c75;
        console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x30f5be + " 异常: " + _0xc0c75.message);
      }
      _0x4b2115++;
      _0x4b2115 < _0x47c8b9 && (console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x30f5be + " 失败，重试 " + _0x4b2115 + "/" + _0x47c8b9), await new Promise(_0x1ab309 => setTimeout(_0x1ab309, _0x5a0db1)));
    }
    return null;
  }
  async ["getAdInfo"](_0x56d46d) {
    try {
      {
        const _0x4609ed = "/rest/e/reward/mixed/ad",
          _0x29e476 = {
            "encData": "|encData|",
            "sign": "|sign|",
            "cs": "false",
            "client_key": "2ac2a76d",
            "videoModelCrowdTag": "1_23",
            "os": "android",
            "kuaishou.api_st": this.kuaishouApiSt,
            "uQaTag": "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
          },
          _0x40ffb2 = {
            "earphoneMode": "1",
            "mod": "Xiaomi(23116PN5BC)",
            "appver": this.appver,
            "isp": "CUCC",
            "language": "zh-cn",
            "ud": this.userId,
            "did_tag": "0",
            "net": "WIFI",
            "kcv": "1599",
            "app": "0",
            "kpf": "ANDROID_PHONE",
            "ver": "11.6",
            "android_os": "0",
            "boardPlatform": "pineapple",
            "kpn": "NEBULA",
            "androidApiLevel": "35",
            "country_code": "cn",
            "sys": "ANDROID_15",
            "sw": "1080",
            "sh": "2400",
            "abi": "arm64",
            "userRecoBit": "0"
          };
        let _0x10a5f7 = "{}";
        if (_0x56d46d.businessId === 7076) {
          const _0x355106 = "eyJwYWdlSWQiOiAxMTAxNCwgInN1YlBhZ2VJZCI6IDEwMDE2MTUzNywgInBvc0lkIjogMjE2MjY4LCAiYnVzaW5lc3NJZCI6IDcwNzYsICJleHRQYXJhbXMiOiAiIiwgImN1c3RvbURhdGEiOiB7ImV4aXRJbmZvIjogeyJ0b2FzdERlc2MiOiBudWxsLCAidG9hc3RJbWdVcmwiOiBudWxsfX0sICJwZW5kYW50VHlwZSI6IDEsICJkaXNwbGF5VHlwZSI6IDIsICJzaW5nbGVQYWdlSWQiOiAwLCAic2luZ2xlU3ViUGFnZUlkIjogMCwgImNoYW5uZWwiOiAwLCAiY291bnRkb3duUmVwb3J0IjogZmFsc2UsICJ0aGVtZVR5cGUiOiAwLCAibWl4ZWRBZCI6IHRydWUsICJmdWxsTWl4ZWQiOiB0cnVlLCAiYXV0b1JlcG9ydCI6IHRydWUsICJmcm9tVGFza0NlbnRlciI6IHRydWUsICJzZWFyY2hJbnNwaXJlU2NoZW1lSW5mbyI6IG51bGwsICJhbW91bnQiOiAwfQ==",
            _0x121dab = {
              "openH5AdCount": 0,
              "sessionLookedCompletedCount": this.searchFollowCount,
              "sessionType": _0x56d46d.requestSceneType === 2 ? "2" : "1",
              "searchKey": "短剧小说",
              "triggerType": "2",
              "disableReportToast": true,
              "businessEnterAction": "7",
              "neoParams": _0x355106
            };
          _0x10a5f7 = JSON.stringify(_0x121dab);
        }
        const _0xa11078 = {
            "appInfo": {
              "appId": "kuaishou_nebula",
              "name": "快手极速版",
              "packageName": "com.kuaishou.nebula",
              "version": this.appver,
              "versionCode": -1
            },
            "deviceInfo": {
              "osType": 1,
              "osVersion": "15",
              "deviceId": this.did,
              "screenSize": {
                "width": 1080,
                "height": 2249
              },
              "ftt": ""
            },
            "userInfo": {
              "userId": this.userId,
              "age": 0,
              "gender": ""
            },
            "impInfo": [{
              "pageId": _0x56d46d.pageId || 11101,
              "subPageId": _0x56d46d.subPageId,
              "action": 0,
              "browseType": 3,
              "impExtData": _0x10a5f7,
              "mediaExtData": "{}"
            }]
          },
          _0xa4e408 = Buffer.from(JSON.stringify(_0xa11078)).toString("base64");
        let _0x1a7cd3 = await this.getSign(_0xa4e408);
        if (!_0x1a7cd3) return console.log("❌ 账号[" + this.nickname + "] 获取 encsign 失败，无法获取广告"), null;
        _0x29e476.encData = _0x1a7cd3.encdata;
        _0x29e476.sign = _0x1a7cd3.sign;
        let _0x272334 = await this.requestSignService({
          "urlpath": _0x4609ed,
          "reqdata": qs.stringify(_0x29e476) + "&" + qs.stringify(_0x40ffb2),
          "api_client_salt": this.salt
        });
        if (!_0x272334) return console.log("❌ 账号[" + this.nickname + "] 获取 nesig 失败，无法获取广告"), null;
        const _0x2a00ce = {
            ..._0x40ffb2,
            "sig": _0x272334.sig,
            "__NS_sig3": _0x272334.__NS_sig3,
            "__NS_xfalcon": _0x272334.__NS_xfalcon,
            "__NStokensig": _0x272334.__NStokensig
          },
          _0x457368 = "https://api.e.kuaishou.com" + _0x4609ed + "?" + querystring.stringify(_0x2a00ce),
          {
            response: _0x27c319,
            body: _0x358f17
          } = await sendRequest({
            "method": "POST",
            "url": _0x457368,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              "Host": "api.e.kuaishou.com",
              "User-Agent": "kwai-android aegon/3.56.0",
              "Cookie": "kuaishou_api_st=" + this.kuaishouApiSt
            },
            "form": _0x29e476,
            "timeout": 12000
          }, this.proxyUrl, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告");
        if (!_0x358f17) return null;
        if (_0x358f17.errorMsg === "OK" && _0x358f17.feeds && _0x358f17.feeds[0] && _0x358f17.feeds[0].ad) {
          const _0xdb5cf2 = _0x358f17.feeds[0].caption || _0x358f17.feeds[0].ad?.["caption"] || "";
          _0xdb5cf2 && console.log("✅ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 成功获取到广告信息：" + _0xdb5cf2.substring(0, 10) + "...");
          const _0x4082bc = _0x358f17.feeds[0].exp_tag || "",
            _0x492e45 = _0x4082bc.split("/")[1]?.["split"]("_")?.[0] || "";
          return {
            "cid": _0x358f17.feeds[0].ad.creativeId,
            "llsid": _0x492e45
          };
        }
        console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告失败: " + (_0x358f17.errorMsg || JSON.stringify(_0x358f17).substring(0, 50)) + "...");
        return null;
      }
    } catch (_0x3af4cb) {
      console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告异常: " + _0x3af4cb.message);
      return null;
    }
  }
  async ["generateSignature"](_0x1b9370, _0x3dbe28, _0x54339b, _0x5cd7a9) {
    try {
      {
        {
          const _0x10c4bf = JSON.stringify({
              "businessId": _0x5cd7a9.businessId,
              "endTime": this.endTime,
              "extParams": "",
              "mediaScene": "video",
              "neoInfos": [{
                "creativeId": _0x1b9370,
                "extInfo": "",
                "llsid": _0x3dbe28,
                "requestSceneType": _0x5cd7a9.requestSceneType,
                "taskType": _0x5cd7a9.taskType,
                "watchExpId": "",
                "watchStage": 0
              }],
              "pageId": _0x5cd7a9.pageId,
              "posId": _0x5cd7a9.posId,
              "reportType": 0,
              "sessionId": "",
              "startTime": this.startTime,
              "subPageId": _0x5cd7a9.subPageId
            }),
            _0x4173d4 = "bizStr=" + encodeURIComponent(_0x10c4bf) + "&cs=false&client_key=2ac2a76d&kuaishou.api_st=" + this.kuaishouApiSt,
            _0x542bff = this.queryParams + "&" + _0x4173d4,
            _0x4ad047 = await this.requestSignService({
              "urlpath": this.taskReportPath,
              "reqdata": _0x542bff,
              "api_client_salt": this.salt
            }, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成报告签名");
          if (!_0x4ad047) return null;
          return {
            "sig": _0x4ad047.sig,
            "sig3": _0x4ad047.__NS_sig3,
            "sigtoken": _0x4ad047.__NStokensig,
            "xfalcon": _0x4ad047.__NS_xfalcon,
            "post": _0x4173d4
          };
        }
      }
    } catch (_0x42fcfe) {
      console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成签名异常: " + _0x42fcfe.message);
      return null;
    }
  }
  async ["submitReport"](_0xf87ceb, _0xeeb838, _0x33766f, _0x38903e, _0x476fa5, _0x3ec646, _0x2ccc98) {
    try {
      {
        {
          const _0x342362 = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + (this.queryParams + "&sig=" + _0xf87ceb + "&__NS_sig3=" + _0xeeb838 + "&__NS_xfalcon=" + _0x38903e + "&__NStokensig=" + _0x33766f),
            {
              response: _0x2148eb,
              body: _0x11935b
            } = await sendRequest({
              "method": "POST",
              "url": _0x342362,
              "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Host": "api.e.kuaishou.cn",
                "User-Agent": "kwai-android aegon/3.56.0",
                "Content-Type": "application/x-www-form-urlencoded"
              },
              "body": _0x476fa5,
              "timeout": 12000
            }, this.proxyUrl, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务");
          if (!_0x11935b) {
            return {
              "success": false,
              "reward": 0
            };
          }
          if (_0x11935b.result === 1) {
            {
              {
                const _0x312ce6 = _0x11935b.data?.["neoAmount"] || 0;
                console.log("💰 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x2ccc98.name + "获得" + _0x312ce6 + "金币奖励！");
                _0x312ce6 <= this.lowRewardThreshold ? (this.lowRewardStreak++, this.did = generateKuaishouDid(), console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币奖励(" + _0x312ce6 + ")低于阈值(" + this.lowRewardThreshold + ")，当前连续低奖励次数：" + this.lowRewardStreak + "/" + this.lowRewardLimit), this.lowRewardStreak >= this.lowRewardLimit && (console.log("🏁 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 连续" + this.lowRewardLimit + "次奖励≤" + this.lowRewardThreshold + "，停止全部任务"), this.stopAllTasks = true)) : this.lowRewardStreak = 0;
                return {
                  "success": true,
                  "reward": _0x312ce6
                };
              }
            }
          }
          if ([20107, 20108, 1003, 415].includes(_0x11935b.result)) return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x2ccc98.name + " 已达上限"), this.taskLimitReached[_0x3ec646] = true, {
            "success": false,
            "reward": 0
          };
          if ([500].includes(_0x11935b.result)) return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x2ccc98.name + " 500错已停止该账号"), this.taskLimitReached[_0x3ec646] = true, {
            "success": false,
            "reward": 0
          };
          console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x2ccc98.name + " 奖励失败，result=" + _0x11935b.result + " msg=" + (_0x11935b.data || ""));
          return {
            "success": false,
            "reward": 0
          };
        }
      }
    } catch (_0x4ece03) {
      console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务异常: " + _0x4ece03.message);
      return {
        "success": false,
        "reward": 0
      };
    }
  }
  async ["getSign"](_0x12ad1c) {
    try {
      {
        const {
          response: _0x347e5c,
          body: _0x24edf5
        } = await sendRequest({
          "method": "POST",
          "url": KS_SIGN_API_URL + "/encsign",
          "body": JSON.stringify({
            "data": _0x12ad1c
          }),
          "headers": {
            "Content-Type": "application/json"
          }
        });
        if (_0x24edf5 && _0x24edf5.status) return _0x24edf5.data;
        console.log("❌ 账号[" + this.nickname + "] encsign 签名服务失败: " + (_0x24edf5?.["message"] || "无响应"));
        return null;
      }
    } catch (_0x3cdf2d) {
      console.log("❌ 账号[" + this.nickname + "] encsign 签名请求异常: " + _0x3cdf2d.message);
      return null;
    }
  }
  async ["requestSignService"](_0x22cb56, _0x5adba1) {
    let _0xa3c95e = {},
      _0x11ba91 = {
        "path": _0x22cb56.urlpath,
        "data": _0x22cb56.reqdata,
        "salt": _0x22cb56.api_client_salt
      };
    const {
      response: _0x4b8ac9,
      body: _0x5171ca
    } = await sendRequest({
      "method": "POST",
      "url": KS_SIGN_API_URL + "/nssig",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      "body": JSON.stringify(_0x11ba91),
      "timeout": 15000
    }, null, _0x5adba1 + "（签名服务）");
    if (_0x5171ca && _0x5171ca.data) {
      let _0x23bd28 = _0x5171ca.data.nssig3,
        _0xa3d94e = _0x5171ca.data.nstokensig,
        _0x39ae4f = _0x5171ca.data.nssig4;
      Object.assign(_0xa3c95e, {
        "__NS_sig3": _0x23bd28,
        "__NStokensig": _0xa3d94e,
        "sig": _0x5171ca.data.sig,
        "__NS_xfalcon": _0x39ae4f,
        "kaw": _0x5171ca.data.kaw,
        "kas": _0x5171ca.data.kas
      });
      return _0xa3c95e;
    }
    console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 签名服务失败: " + (_0x5171ca?.["error"] || _0x5171ca?.["message"] || "无响应"));
    return null;
  }
  async ["executeTask"](_0x450d4f) {
    const _0x29c1f4 = this.taskConfigs[_0x450d4f];
    if (!_0x29c1f4) return false;
    if (this.taskLimitReached[_0x450d4f]) return false;
    try {
      {
        const _0x110451 = await this.retryOperation(() => this.getAdInfo(_0x29c1f4), "获取" + _0x29c1f4.name + "信息", 3);
        if (!_0x110451) {
          this.taskStats[_0x450d4f].failed++;
          return false;
        }
        const _0x438663 = Math.floor(Math.random() * 10000) + 30000;
        console.log("🔍 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " ==>" + _0x29c1f4.name + " " + generateRandomInteractionMessage() + " " + Math.round(_0x438663 / 1000) + " 秒");
        await new Promise(_0x42e22c => setTimeout(_0x42e22c, _0x438663));
        const _0x20f9ce = await this.retryOperation(() => this.generateSignature(_0x110451.cid, _0x110451.llsid, _0x450d4f, _0x29c1f4), "生成" + _0x29c1f4.name + "签名", 3);
        if (!_0x20f9ce) {
          this.taskStats[_0x450d4f].failed++;
          return false;
        }
        const _0x4eabf0 = await this.retryOperation(() => this.submitReport(_0x20f9ce.sig, _0x20f9ce.sig3, _0x20f9ce.sigtoken, _0x20f9ce.xfalcon, _0x20f9ce.post, _0x450d4f, _0x29c1f4), "提交" + _0x29c1f4.name + "报告", 3);
        if (_0x4eabf0?.["success"]) return this.taskStats[_0x450d4f].success++, this.taskStats[_0x450d4f].totalReward += _0x4eabf0.reward || 0, true;
        this.taskStats[_0x450d4f].failed++;
        return false;
      }
    } catch (_0x44b5e5) {
      console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务异常(" + _0x450d4f + "): " + _0x44b5e5.message);
      this.taskStats[_0x450d4f].failed++;
      return false;
    }
  }
  async ["executeAllTasksByPriority"]() {
    const _0x452bc1 = this.tasksToExecute.includes("look"),
      _0x52b7fb = this.tasksToExecute.includes("food"),
      _0x443a55 = this.tasksToExecute.includes("box"),
      _0x429d12 = this.tasksToExecute.includes("search"),
      _0x50a32b = this.tasksToExecute.filter(_0x4eba5e => _0x4eba5e !== "look" && _0x4eba5e !== "search");
    for (let _0x4cb043 = 0; _0x4cb043 < KSROUNDS; _0x4cb043++) {
      {
        if (this.stopAllTasks) break;
        console.log("\n============================== 🚀 账号[" + this.nickname + "] 第" + (_0x4cb043 + 1) + "/" + KSROUNDS + "轮开始 ==============================");
        if (_0x452bc1) {
          const _0x37366d = this.taskConfigs.look,
            _0x481bf0 = this.taskConfigs.follow;
          console.log("🎬 开始执行 " + _0x37366d.name + " (+" + _0x481bf0.name + ")，本轮共 " + KSLOOK_COUNT + " 次");
          for (let _0x545885 = 0; _0x545885 < KSLOOK_COUNT; _0x545885++) {
            if (this.stopAllTasks || this.taskLimitReached.look) break;
            console.log("\n--- 账号[" + this.nickname + "] " + _0x37366d.name + " 第 " + (_0x545885 + 1) + "/" + KSLOOK_COUNT + " 次执行 ---");
            const _0x5d7c34 = await this.executeTask("look");
            if (_0x5d7c34 && !this.stopAllTasks) {
              const _0x4a6155 = Math.floor(Math.random() * 5000) + 5000;
              console.log("⏱ 账号[" + this.nickname + "] look 任务成功，随机等待 " + Math.round(_0x4a6155 / 1000) + " 秒后执行 " + _0x481bf0.name);
              await new Promise(_0x2d7eb0 => setTimeout(_0x2d7eb0, _0x4a6155));
              const _0x251921 = KSFOLLOW_COUNT;
              for (let _0x419beb = 0; _0x419beb < _0x251921; _0x419beb++) {
                if (this.stopAllTasks || this.taskLimitReached.follow) break;
                console.log("\n--- 账号[" + this.nickname + "] " + _0x481bf0.name + " (第 " + (_0x419beb + 1) + "/" + _0x251921 + " 次) 紧随 look 任务执行 ---");
                await this.executeTask("follow");
              }
            }
            if (_0x545885 < KSLOOK_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.look) {
              const _0x1f05af = _0x545885 < KSLOOK_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.look;
              if (_0x1f05af) {
                {
                  const _0x3df4e8 = Math.floor(Math.random() * 5000) + 5000;
                  console.log("⏱ 账号[" + this.nickname + "] " + _0x37366d.name + " 任务间隔，随机等待 " + Math.round(_0x3df4e8 / 1000) + " 秒");
                  await new Promise(_0x4453e4 => setTimeout(_0x4453e4, _0x3df4e8));
                }
              }
            }
          }
          if (!this.stopAllTasks && (_0x52b7fb || _0x443a55 || _0x429d12)) {
            {
              const _0x513583 = Math.floor(Math.random() * 15000) + 15000;
              console.log("\n🔄 账号[" + this.nickname + "] 任务组完成，等待 " + Math.round(_0x513583 / 1000) + " 秒切换...");
              await new Promise(_0x42b91b => setTimeout(_0x42b91b, _0x513583));
            }
          }
        }
        if (_0x429d12) {
          {
            const _0x580738 = this.taskConfigs.search,
              _0x36aae2 = this.taskConfigs.search_follow;
            console.log("\n🎬 开始执行 " + _0x580738.name + " (+" + _0x36aae2.name + ")，本轮共 " + KSSEARCH_COUNT + " 次");
            for (let _0x1d9578 = 0; _0x1d9578 < KSSEARCH_COUNT; _0x1d9578++) {
              if (this.stopAllTasks || this.taskLimitReached.search) break;
              console.log("\n--- 账号[" + this.nickname + "] " + _0x580738.name + " 第 " + (_0x1d9578 + 1) + "/" + KSSEARCH_COUNT + " 次执行 ---");
              const _0x5c18a7 = await this.executeTask("search");
              if (_0x5c18a7 && !this.stopAllTasks) {
                const _0x6573c7 = Math.floor(Math.random() * 5000) + 5000;
                console.log("⏱ 账号[" + this.nickname + "] search 任务成功，随机等待 " + Math.round(_0x6573c7 / 1000) + " 秒后执行 " + _0x36aae2.name);
                await new Promise(_0x5c3395 => setTimeout(_0x5c3395, _0x6573c7));
                const _0x20a89d = KSSEARCHFOLLOW_COUNT;
                for (let _0x548075 = 0; _0x548075 < _0x20a89d; _0x548075++) {
                  {
                    if (this.stopAllTasks || this.taskLimitReached.search_follow) break;
                    console.log("\n--- 账号[" + this.nickname + "] " + _0x36aae2.name + " (第 " + (_0x548075 + 1) + "/" + _0x20a89d + " 次) 紧随 search 任务执行 ---");
                    this.searchFollowCount++;
                    await this.executeTask("search_follow");
                    this.searchFollowCount = 0;
                  }
                }
              }
              if (_0x1d9578 < KSSEARCH_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.search) {
                {
                  const _0x25f8c0 = _0x1d9578 < KSSEARCH_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.search;
                  if (_0x25f8c0) {
                    {
                      const _0x1410e3 = Math.floor(Math.random() * 5000) + 5000;
                      console.log("⏱ 账号[" + this.nickname + "] " + _0x580738.name + " 任务间隔，随机等待 " + Math.round(_0x1410e3 / 1000) + " 秒");
                      await new Promise(_0x5a8d31 => setTimeout(_0x5a8d31, _0x1410e3));
                    }
                  }
                }
              }
            }
            if (!this.stopAllTasks && (_0x52b7fb || _0x443a55)) {
              {
                const _0x6b6d15 = Math.floor(Math.random() * 15000) + 15000;
                console.log("\n🔄 账号[" + this.nickname + "] 任务组完成，等待 " + Math.round(_0x6b6d15 / 1000) + " 秒切换...");
                await new Promise(_0x559ff2 => setTimeout(_0x559ff2, _0x6b6d15));
              }
            }
          }
        }
        for (const _0x2b9d59 of _0x50a32b) {
          {
            if (this.stopAllTasks) break;
            if (_0x2b9d59 === "look" || _0x2b9d59 === "search") continue;
            const _0x5f139b = this.taskConfigs[_0x2b9d59];
            if (this.taskLimitReached[_0x2b9d59]) {
              console.log("⚠️ 账号[" + this.nickname + "] " + _0x5f139b.name + " 已达上限，本轮跳过");
              continue;
            }
            console.log("\n🎬 开始执行 " + _0x5f139b.name + "，本轮共 1 次");
            await this.executeTask(_0x2b9d59);
            if (!this.stopAllTasks) {
              {
                const _0x5d7bc8 = Math.floor(Math.random() * 5000) + 5000;
                console.log("⏱ 账号[" + this.nickname + "] " + _0x5f139b.name + " 任务间隔，随机等待 " + Math.round(_0x5d7bc8 / 1000) + " 秒");
                await new Promise(_0x1f0d8d => setTimeout(_0x1f0d8d, _0x5d7bc8));
              }
            }
          }
        }
        if (_0x4cb043 < KSROUNDS - 1 && !this.stopAllTasks) {
          {
            const _0x68937b = Math.floor(Math.random() * 10000) + 60000;
            console.log("\n============================== ⏱ 账号[" + this.nickname + "] 第" + (_0x4cb043 + 1) + "轮完成，等待 " + Math.round(_0x68937b / 1000) + " 秒进入下一轮 ==============================");
            await new Promise(_0x238a2c => setTimeout(_0x238a2c, _0x68937b));
          }
        }
      }
    }
    return {};
  }
}
function parseAccountConfig(_0x1549fb) {
  const _0x5a0cda = String(_0x1549fb || "").trim().split("#");
  if (_0x5a0cda.length < 2) return null;
  let _0x59fc4c = "",
    _0x42632a = "",
    _0x52f161 = "",
    _0x58a98c = null;
  if (_0x5a0cda.length === 2) _0x42632a = _0x5a0cda[0], _0x52f161 = _0x5a0cda[1];else {
    if (_0x5a0cda.length === 3) /socks5:\/\//i.test(_0x5a0cda[2]) ? (_0x42632a = _0x5a0cda[0], _0x52f161 = _0x5a0cda[1], _0x58a98c = _0x5a0cda[2]) : (_0x59fc4c = _0x5a0cda[0], _0x42632a = _0x5a0cda[1], _0x52f161 = _0x5a0cda[2]);else _0x5a0cda.length >= 4 && (_0x59fc4c = _0x5a0cda[0], _0x42632a = _0x5a0cda[1], _0x52f161 = _0x5a0cda.slice(2, _0x5a0cda.length - 1).join("#"), _0x58a98c = _0x5a0cda[_0x5a0cda.length - 1]);
  }
  if (_0x58a98c) {
    {
      {
        if (_0x58a98c.includes("|")) {
          {
            {
              console.log("开始解析代理格式: " + _0x58a98c);
              const _0x32c919 = _0x58a98c.split("|");
              if (_0x32c919.length >= 2) {
                const [_0x1eb091, _0x1774bf, _0x487437, _0x508438] = _0x32c919;
                _0x58a98c = "socks5://" + _0x487437 + ":" + _0x508438 + "@" + _0x1eb091 + ":" + _0x1774bf;
              }
            }
          }
        } else {
          {
            if (!/^socks5:\/\//i.test(_0x58a98c)) _0x58a98c = null;else try {
              new URL(_0x58a98c);
            } catch (_0x11b7fd) {
              console.log("❌ 代理URL格式错误: " + _0x58a98c);
              _0x58a98c = null;
            }
          }
        }
      }
    }
  }
  return {
    "remark": _0x59fc4c || "",
    "salt": _0x52f161,
    "cookie": _0x42632a,
    "proxyUrl": _0x58a98c
  };
}
function loadAccountsFromEnv() {
  const _0x12ad7d = getAccountConfigsFromEnv(),
    _0x5f3fb1 = [];
  for (const _0x49c29b of _0x12ad7d) {
    {
      {
        const _0x2ef404 = parseAccountConfig(_0x49c29b);
        _0x2ef404 ? _0x5f3fb1.push(_0x2ef404) : console.log("账号格式错误：" + _0x49c29b);
      }
    }
  }
  _0x5f3fb1.forEach((_0x311668, _0x38b154) => {
    _0x311668.index = _0x38b154 + 1;
  });
  return _0x5f3fb1;
}
async function concurrentExecute(_0x1abb22, _0x2a5e5d, _0x5d5fcd) {
  const _0x539509 = new Array(_0x1abb22.length);
  let _0x47ae5a = 0;
  async function _0x19b10c() {
    while (true) {
      const _0x2e8177 = _0x47ae5a++;
      if (_0x2e8177 >= _0x1abb22.length) return;
      const _0x551909 = _0x1abb22[_0x2e8177];
      try {
        _0x539509[_0x2e8177] = await _0x5d5fcd(_0x551909, _0x2e8177);
      } catch (_0x390144) {
        console.log("并发执行异常（index=" + (_0x2e8177 + 1) + "）：" + _0x390144.message);
        _0x539509[_0x2e8177] = null;
      }
    }
  }
  const _0x1649b4 = Array.from({
    "length": Math.min(_0x2a5e5d, _0x1abb22.length)
  }, _0x19b10c);
  await Promise.all(_0x1649b4);
  return _0x539509;
}
async function processAccount(_0x27089c) {
  if (_0x27089c.proxyUrl) {
    {
      const _0x3a9b9b = await testProxyConnectivity(_0x27089c.proxyUrl, "账号[" + _0x27089c.index + "]" + (_0x27089c.remark ? "（" + _0x27089c.remark + "）" : ""));
      console.log("  - " + (_0x3a9b9b.ok ? "✅ 代理验证通过" : "❌ 代理验证失败") + ": " + _0x3a9b9b.msg);
      if (_0x3a9b9b.ok && _0x3a9b9b.ip && _0x3a9b9b.ip !== "localhost") {
        {
          {
            if (!isValidIP(_0x3a9b9b.ip)) console.log("⚠️ 账号[" + _0x27089c.index + "] 检测到无效IP格式，跳过重复检查");else {
              {
                if (usedProxies.has(_0x3a9b9b.ip)) console.log("\n⚠️ 存在相同代理IP（" + _0x3a9b9b.ip + "），请立即检查！");else usedProxies.add(_0x3a9b9b.ip);
              }
            }
          }
        }
      } else {
        {
          if (!_0x3a9b9b.ok) return console.log("❌ 账号[" + _0x27089c.index + "] 代理测试失败，跳过该账号"), {
            "index": _0x27089c.index,
            "remark": _0x27089c.remark || "无备注",
            "nickname": "账号" + _0x27089c.index,
            "initialCoin": 0,
            "finalCoin": 0,
            "coinChange": 0,
            "initialCash": 0,
            "finalCash": 0,
            "cashChange": 0,
            "error": "代理测试失败: " + _0x3a9b9b.msg,
            "skipped": true
          };
        }
      }
    }
  } else console.log("账号[" + _0x27089c.index + "]" + (_0x27089c.remark ? "（" + _0x27089c.remark + "）" : "") + " 未配置代理，走直连");
  console.log("账号[" + _0x27089c.index + "]" + (_0x27089c.remark ? "（" + _0x27089c.remark + "）" : "") + " 🔍 获取账号信息中...");
  let _0x3eea75 = await getAccountBasicInfo(_0x27089c.cookie, _0x27089c.proxyUrl, _0x27089c.index),
    _0x34faa5 = _0x3eea75?.["nickname"] || "账号" + _0x27089c.index;
  if (_0x3eea75) {
    {
      const _0x262b09 = _0x3eea75.totalCoin != null ? _0x3eea75.totalCoin : "未知",
        _0x44d8b2 = _0x3eea75.allCash != null ? _0x3eea75.allCash : "未知";
      console.log("账号[" + _0x34faa5 + "] ✅ 登录成功，💰 当前金币: " + _0x262b09 + "，💸 当前余额: " + _0x44d8b2);
    }
  } else console.log("账号[" + _0x34faa5 + "] ❌ 基本信息获取失败，但仍继续执行任务");
  const _0x226337 = new KuaishouAdTask({
    ..._0x27089c,
    "nickname": _0x34faa5,
    "tasksToExecute": tasksToExecute
  });
  try {
    await _0x226337.runInviteAssist();
  } catch (_0x2d57d0) {
    console.log("[WARN] account[" + _0x226337.nickname + "] invite assist flow error: " + _0x2d57d0.message);
  }
  try {
    await _0x226337.runDailySignAndClockIn();
  } catch (_0x5155af) {
    console.log("[WARN] account[" + _0x226337.nickname + "] daily sign/clock flow error: " + _0x5155af.message);
  }
  if (_0x3eea75) {
    {
      await _0x226337.checkCoinLimit();
      if (_0x226337.coinExceeded) {
        console.log("账号[" + _0x226337.nickname + "]" + (_0x27089c.remark ? "（" + _0x27089c.remark + "）" : "") + " 初始金币已超过阈值，不执行任务");
        const _0x85cedf = await getAccountBasicInfo(_0x27089c.cookie, _0x27089c.proxyUrl, _0x27089c.index),
          _0x5e130e = _0x3eea75?.["totalCoin"] || 0,
          _0x20bc5f = _0x85cedf?.["totalCoin"] || 0,
          _0x13d18f = _0x20bc5f - _0x5e130e,
          _0x4c584b = _0x3eea75?.["allCash"] || 0,
          _0x4842c1 = _0x85cedf?.["allCash"] || 0,
          _0x30f45f = _0x4842c1 - _0x4c584b;
        return {
          "index": _0x27089c.index,
          "remark": _0x27089c.remark || "无备注",
          "nickname": _0x34faa5,
          "initialCoin": _0x5e130e,
          "finalCoin": _0x20bc5f,
          "coinChange": _0x13d18f,
          "initialCash": _0x4c584b,
          "finalCash": _0x4842c1,
          "cashChange": _0x30f45f,
          "stats": _0x226337.getTaskStats(),
          "coinLimitExceeded": true
        };
      }
    }
  }
  console.log("账号[" + _0x226337.nickname + "]" + (_0x27089c.remark ? "（" + _0x27089c.remark + "）" : "") + " 🚀 开始执行所有任务");
  await _0x226337.executeAllTasksByPriority();
  const _0x5b8303 = await getAccountBasicInfo(_0x27089c.cookie, _0x27089c.proxyUrl, _0x27089c.index),
    _0x4b9c44 = _0x3eea75?.["totalCoin"] || 0,
    _0x198a3e = _0x5b8303?.["totalCoin"] || 0,
    _0x5751fb = _0x198a3e - _0x4b9c44,
    _0x447caf = _0x3eea75?.["allCash"] || 0,
    _0x3a5fee = _0x5b8303?.["allCash"] || 0,
    _0x18e145 = _0x3a5fee - _0x447caf;
  _0x226337.printTaskStats();
  return {
    "index": _0x27089c.index,
    "remark": _0x27089c.remark || "无备注",
    "nickname": _0x34faa5,
    "initialCoin": _0x4b9c44,
    "finalCoin": _0x198a3e,
    "coinChange": _0x5751fb,
    "initialCash": _0x447caf,
    "finalCash": _0x3a5fee,
    "cashChange": _0x18e145,
    "stats": _0x226337.getTaskStats(),
    "coinLimitExceeded": _0x226337.coinExceeded,
    "infoFetchFailed": !_0x3eea75
  };
}
function printAccountsSummary(_0x9ad1fa) {
  if (!_0x9ad1fa.length) {
    console.log("\n没有可显示的账号信息。");
    return;
  }
  const _0xf33a5a = _0x9ad1fa.reduce((_0x56ee49, _0x3d4d4a) => {
      return _0x56ee49 + (parseInt(_0x3d4d4a.initialCoin) || 0);
    }, 0),
    _0xd58cd9 = _0x9ad1fa.reduce((_0x679f60, _0x51b3ef) => {
      return _0x679f60 + (parseInt(_0x51b3ef.finalCoin) || 0);
    }, 0),
    _0x38a538 = _0xd58cd9 - _0xf33a5a,
    _0x315e6a = _0x9ad1fa.reduce((_0x382008, _0x1bc7ac) => {
      return _0x382008 + (parseFloat(_0x1bc7ac.initialCash) || 0);
    }, 0),
    _0x38b0a2 = _0x9ad1fa.reduce((_0x5720dc, _0x2836d7) => {
      return _0x5720dc + (parseFloat(_0x2836d7.finalCash) || 0);
    }, 0),
    _0x2aad3a = _0x38b0a2 - _0x315e6a;
  let _0x51cb3e = 0,
    _0x269122 = 0,
    _0x491b90 = 0;
  _0x9ad1fa.forEach(_0x72e466 => {
    _0x72e466.stats && Object.values(_0x72e466.stats).forEach(_0x446f8e => {
      _0x51cb3e += _0x446f8e.success + _0x446f8e.failed;
      _0x269122 += _0x446f8e.success;
      _0x491b90 += _0x446f8e.totalReward;
    });
  });
  const _0x504e47 = _0x51cb3e > 0 ? (_0x269122 / _0x51cb3e * 100).toFixed(1) : "0.0",
    _0x5b5b52 = _0x9ad1fa.filter(_0x6afc67 => _0x6afc67.coinLimitExceeded).length,
    _0x381dec = _0x9ad1fa.filter(_0x545727 => _0x545727.skipped).length,
    _0x19b05f = _0x9ad1fa.filter(_0x5a008d => _0x5a008d.infoFetchFailed).length;
  console.log("\n\n" + "=".repeat(80));
  console.log("|" + centerAlign("      快手养号任务执行结果汇总表      ", 78) + "|");
  console.log("=".repeat(80));
  console.log("|" + ("总账号数: " + _0x9ad1fa.length).padEnd(22) + ("跳过账号: " + _0x381dec).padEnd(22) + ("总任务数: " + _0x51cb3e).padEnd(22) + ("任务成功率: " + _0x504e47 + "%").padEnd(10) + "|");
  console.log("|" + ("总金币变化: " + _0x38a538).padEnd(26) + ("总金币奖励: " + _0x491b90).padEnd(26) + ("总余额变化: " + _0x2aad3a.toFixed(2)).padEnd(24) + "|");
  console.log("-".repeat(80));
  const _0x1c1033 = ["序号", "备注", "账号昵称", "初始金币", "最终金币", "金币变化", "初始余额", "最终余额", "余额变化", "状态"],
    _0x5b9187 = [6, 16, 16, 12, 12, 12, 12, 12, 12, 10];
  let _0x14a396 = "|";
  _0x1c1033.forEach((_0x5d632f, _0x27a2b5) => {
    _0x14a396 += centerAlign(_0x5d632f, _0x5b9187[_0x27a2b5]) + "|";
  });
  console.log(_0x14a396);
  let _0x67ffe = "|";
  _0x5b9187.forEach(_0x16a151 => {
    _0x67ffe += "-".repeat(_0x16a151) + "|";
  });
  console.log(_0x67ffe);
  _0x9ad1fa.forEach(_0x2b19e7 => {
    {
      let _0x5d9713 = "|";
      _0x5d9713 += centerAlign(_0x2b19e7.index, _0x5b9187[0]) + "|";
      _0x5d9713 += centerAlign(_0x2b19e7.remark, _0x5b9187[1]) + "|";
      let _0x569a18 = _0x2b19e7.nickname || "-";
      if (_0x2b19e7.skipped) _0x569a18 += " ❌";else {
        {
          if (_0x2b19e7.coinLimitExceeded) _0x569a18 += " ⚠️";else _0x2b19e7.infoFetchFailed && (_0x569a18 += " 🔶");
        }
      }
      _0x5d9713 += centerAlign(_0x569a18.substring(0, _0x5b9187[2] - 2), _0x5b9187[2]) + "|";
      _0x5d9713 += centerAlign(_0x2b19e7.initialCoin, _0x5b9187[3]) + "|";
      _0x5d9713 += centerAlign(_0x2b19e7.finalCoin, _0x5b9187[4]) + "|";
      const _0x49f838 = _0x2b19e7.coinChange >= 0 ? "+" + _0x2b19e7.coinChange : _0x2b19e7.coinChange;
      _0x5d9713 += centerAlign(_0x49f838, _0x5b9187[5]) + "|";
      _0x5d9713 += centerAlign(_0x2b19e7.initialCash, _0x5b9187[6]) + "|";
      _0x5d9713 += centerAlign(_0x2b19e7.finalCash, _0x5b9187[7]) + "|";
      const _0x2a52a8 = _0x2b19e7.cashChange >= 0 ? "+" + _0x2b19e7.cashChange.toFixed(2) : _0x2b19e7.cashChange.toFixed(2);
      _0x5d9713 += centerAlign(_0x2a52a8, _0x5b9187[8]) + "|";
      let _0x1f6350 = "完成";
      if (_0x2b19e7.skipped) _0x1f6350 = "跳过";else {
        if (_0x2b19e7.coinLimitExceeded) _0x1f6350 = "超限";else {
          {
            if (_0x2b19e7.infoFetchFailed) {
              _0x1f6350 = "无信息";
            }
          }
        }
      }
      _0x5d9713 += centerAlign(_0x1f6350, _0x5b9187[9]) + "|";
      console.log(_0x5d9713);
    }
  });
  console.log("=".repeat(80));
  console.log("|" + centerAlign("      任务执行完成，请查看详细结果      ", 78) + "|");
  console.log("=".repeat(80));
}
(async () => {
  await loadInviteConfig();
  const _0x12787f = loadAccountsFromEnv();
  console.log("共找到 " + _0x12787f.length + " 个有效账号");
  !_0x12787f.length && process.exit(1);
  const _0x305f56 = getEnvNumber("MAX_CONCURRENCY", 3);
  console.log("\n防黑并发：" + _0x305f56 + "    防黑轮数：" + KSROUNDS + "    look次数/轮：" + KSLOOK_COUNT + "    search次数/轮：" + KSSEARCH_COUNT + "    follow次数/look：" + KSFOLLOW_COUNT + "    search_follow次数/search：" + KSSEARCHFOLLOW_COUNT + "\n");
  const _0x45c198 = [];
  await concurrentExecute(_0x12787f, _0x305f56, async _0x11d1d5 => {
    console.log("\n—— 🚀 开始账号[" + _0x11d1d5.index + "]" + (_0x11d1d5.remark ? "（" + _0x11d1d5.remark + "）" : "") + " ——");
    try {
      {
        const _0x46da7f = await processAccount(_0x11d1d5);
        _0x45c198.push({
          "index": _0x11d1d5.index,
          "remark": _0x11d1d5.remark || "无备注",
          "nickname": _0x46da7f?.["nickname"] || "账号" + _0x11d1d5.index,
          "initialCoin": _0x46da7f?.["initialCoin"] || 0,
          "finalCoin": _0x46da7f?.["finalCoin"] || 0,
          "coinChange": _0x46da7f?.["coinChange"] || 0,
          "initialCash": _0x46da7f?.["initialCash"] || 0,
          "finalCash": _0x46da7f?.["finalCash"] || 0,
          "cashChange": _0x46da7f?.["cashChange"] || 0,
          "stats": _0x46da7f?.["stats"] || {},
          "coinLimitExceeded": _0x46da7f?.["coinLimitExceeded"] || false,
          "skipped": _0x46da7f?.["skipped"] || false,
          "infoFetchFailed": _0x46da7f?.["infoFetchFailed"] || false,
          "error": _0x46da7f?.["error"] || null
        });
      }
    } catch (_0x1bb533) {
      console.log("账号[" + _0x11d1d5.index + "]" + (_0x11d1d5.remark ? "（" + _0x11d1d5.remark + "）" : "") + " ❌ 执行异常：" + _0x1bb533.message);
      _0x45c198.push({
        "index": _0x11d1d5.index,
        "remark": _0x11d1d5.remark || "无备注",
        "nickname": "账号" + _0x11d1d5.index,
        "initialCoin": 0,
        "finalCoin": 0,
        "coinChange": 0,
        "initialCash": 0,
        "finalCash": 0,
        "cashChange": 0,
        "error": _0x1bb533.message,
        "skipped": true
      });
    }
  });
  _0x45c198.sort((_0x8bdeb1, _0x1a0dab) => _0x8bdeb1.index - _0x1a0dab.index);
  console.log("\n全部完成。", "✅");
  console.log("\n---------------------------------------------- 账号信息汇总 ----------------------------------------------");
  printAccountsSummary(_0x45c198);
})();