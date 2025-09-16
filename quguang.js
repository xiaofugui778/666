// 移除约会、赌博和直播广告的Quantumult X脚本
// 匹配提供的JSON数据中的广告内容

const pattern = {
    "free_dating": /免费约炮|同城约炮|私人约炮/,
    "gambling": /杏彩体育|PG电子/,
    "live_streaming": /抖音直播/
};

const url_patterns = [
    "https://csdg.h4ohea.cyou/*",
    "https://n9um6.top/*",
    "https://dncmcnvcmdbudy.dnxkgy121397.vip/*",
    "https://www.bxkfw458.com/*",
    "https://2pg.136970.cc/*",
    "https://cdrdx1188.com/*",
    "https://r7gr3.top/*",
    "https://images.zteangjiao0.com/*"
];

// 主处理函数
function modifyResponse(body) {
    try {
        let json = JSON.parse(body);
        
        if (json && json.data && Array.isArray(json.data)) {
            // 过滤掉广告内容
            json.data = json.data.filter(item => {
                if (!item.app_name) return true;
                
                return !(
                    pattern.free_dating.test(item.app_name) ||
                    pattern.gambling.test(item.app_name) ||
                    pattern.live_streaming.test(item.app_name) ||
                    pattern.free_dating.test(item.app_desc) ||
                    pattern.gambling.test(item.app_desc) ||
                    pattern.live_streaming.test(item.app_desc)
                );
            });
            
            return JSON.stringify(json);
        }
    } catch (e) {
        console.log("广告过滤脚本错误: " + e);
    }
    return body;
}

// 重写配置
const config = {
    // 对API响应进行修改
    response: {
        rules: [
            {
                matches: [], // 需要您添加实际API地址
                action: {
                    type: "body",
                    content: modifyResponse
                }
            }
        ]
    },
    // 请求阻止规则
    request: {
        rules: url_patterns.map(pattern => ({
            url: pattern,
            action: "reject"
        }))
    }
};

// 导出配置
$done(config);
