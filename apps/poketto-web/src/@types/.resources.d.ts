interface Resources {
  auth: {
    WelcomeBack: "欢迎回来"
    LoginViaEmail: "如果您希望通过邮箱登录，则请输入："
    MailSent: "邮件已发送至{{email}}，请注意查收！"
    LoginFailed: "登录失败，请再试一遍或者点击右上角向我们反馈"
    SignInWithEmail: "使用邮箱链接登录"
  }
  common: {
    Login: "登录"
    LoadingMoreData: "正在加载更多数据……"
    CurrentlyNoResult: "暂无结果！"
    CurrentlyNoComments: "暂无评价！"
    Following: "关注"
    Followers: "粉丝"
    Impact: "影响力"
    Dora: "Dora"
    EditProfile: "编辑简介"
    Charge: "充值"
    LogOut: "退出登录"
    StartLogIn: "立即登录"
    OrContinueWith: "或者通过其他方式："
    OrYouCanAlso: "或者您也可以："
    product: {
      name: "Poketto.AI"
    }
    menus: {
      homepage: "首页"
      explore: "探索"
      account: "空间"
      myGallery: "我的画廊"
      charge: "账号充值"
      feedback: "反馈"
      whatsPoketto: "什么是口袋AI？"
      whatsDora: "什么是 Dora？"
      learningCenter: "文档 / 教程"
      settings: "设置"
    }
    general: {
      seeAll: "查看全部"
      appList: "App 列表"
      fullscreenMode: "全屏模式"
      windowMode: "窗口模式"
      detail: "查看详情"
      pin: "置顶"
      unpin: "取消置顶"
      share: "分享"
      open: "打开"
      category: "分类"
      model: "模型"
      language: "语言"
      platform: "平台"
      reviews: "评价"
      information: "信息"
      owner: "所有者"
      openSource: "开源"
      config: "配置"
    }
    sorts: {
      mostViewed: "最多浏览"
      mostUsed: "最多使用"
      newest: "最新发布"
    }
    states: {
      calls: {
        title: "调用"
        desc: "该 App 被用户使用的总次数"
      }
      forks: {
        title: "引用"
        desc: "该 App 被用户引用并修改的总次数（待上线）"
      }
      shares: {
        title: "分享"
        desc: "该 App 被用户分享的总次数"
      }
      stars: {
        title: "收藏"
        desc: "该 App 被用户收藏的总次数"
      }
      tips: {
        title: "打赏"
        desc: "该 App 被用户打赏的总额"
      }
      views: {
        title: "浏览"
        desc: "该 App 在广场内被用户看到的总次数"
      }
    }
    command: {
      inputPlaceholder: "你想搜点什么呢？"
    }
    model: {
      "gpt-3.5-turbo": "一般问题足够"
      "gpt-4": "专业问题效果更好"
      openchat: "清华开源的大语言模型，一度排名第一"
    }
    memoryMode: {
      "one-time": {
        title: "即时"
        desc: "只将最新会话作为上下文，速度最快，适合直接求解的问题"
      }
      recent: {
        title: "最近"
        desc: "将最近的一些会话作为上下文，速度很快，适合多次询问探求一个问题的答案"
      }
      "with-memory": {
        title: "记忆"
        desc: "将从数据库获取相关记忆，并组合最近会话，适合检索与陪伴型会话"
      }
    }
  }
  dashboard: {
    Usage: "使用记录"
    Payments: "支付记录"
    CreatedAt: "创建时间"
    Content: "内容"
    Cost: "消费"
    ProductID: "产品ID"
    RedeemCode: "优惠码"
    Quantity: "数量"
  }
  explore: {
    appMarket: "应用市场"
  }
  feedback: {
    Debunk: {
      title: "吐槽"
      desc: "您想随便说点什么？比如：Poketto 会梦到电子羊吗？：）"
    }
    PuzzleInUse: {
      title: "使用困惑"
      desc: "您不知道如何使用 Poketto ？这一定是我们的问题，欢迎第一时间反馈给我们！"
    }
    FeatureRequest: {
      title: "需求提议"
      desc: "您觉得我们目前的设计不合理，或者您需要桌面端、App端、小程序端？欢迎提议，并加入贡献墙！"
    }
    BugReport: {
      title: "BUG报告"
      desc: "您在正常使用过程中发现的问题，我们确认后将赠送 Dora，并加入贡献墙！"
    }
    LeakReport: {
      title: "漏洞报告"
      desc: "您发现了我们产品的潜在漏洞，欢迎第一时间向我们反馈，将赠送大量 Dora，并加入贡献墙！"
    }
    BusinessCollaboration: {
      title: "企业协同"
      desc: "您来自于企业，相信 AIGC 赋能的力量，希望和 Poketto 一起推动整个行业的发展！那就来吧！Come On！"
    }
  }
  homepage: {
    RecentlyUsedApps: "最近使用的 Apps"
    ExploreTrendingApps: "探索当下最流行的 Apps"
    ExploreAll: "探索全部"
    TodayFree: "今日限免"
    TodayTotal: "今日累计"
    Total: "总计"
    Feedbacks: "反馈"
    Calls: "调用"
    Users: "用户"
    Apps: "Apps"
    PokettoToday: "今日 Poketto"
    LoginToSeeApp: "登录后才能查看最近使用的 App 哦！"
  }
  settings: {
    general: "全局"
    language: "语言"
    UI: "视觉"
    cardsLayout: "卡片布局"
    account: "账号"
    grid: "宫格"
    masonry: "瀑布流"
    theme: "主题"
  }
}

export default Resources
