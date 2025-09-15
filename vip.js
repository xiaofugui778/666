let body = $response.body;

try {
    // 1. 解析JSON
    let obj = JSON.parse(body);
    
    // 2. 修改URL（如果存在baseUrl字段）
    if (obj.data && obj.data.baseUrl) {
        obj.data.baseUrl = obj.data.baseUrl.replace('kongsjieie.bar', 'new.domain.com');
    }
    
    // 3. 检查并修改产品信息（如果存在products数组）
    if (obj.data && obj.data.products && Array.isArray(obj.data.products)) {
        // 遍历每一个产品
        obj.data.products.forEach(product => {
            // 修改价格 (确保是Number类型)
            product.price = 0;
            
            // 修改描述文本 - 使用更强大的正则来替换任何天数和杏币数量
            if (product.description) {
                product.description = product.description
                    .replace(/\d+\s*天\s*\(共\s*\d+\s*天\)/g, "3099天 (共3099天)") // 替换VIP天数
                    .replace(/赠送\d+杏币/g, "赠送3099杏币") // 替换赠送杏币数量
                    .replace(/可兑换\d+天/g, "可兑换3099天"); // 替换可兑换天数
            }
        });
    }
    
    // 4. 将修改后的对象重新序列化为JSON字符串
    body = JSON.stringify(obj);
    
} catch (error) {
    // 如果JSON解析或处理失败，使用原始的、不那么精确的替换方法作为备选方案
    console.log("JSON parse error, using regex fallback: " + error);
    
    // 先尝试替换URL
    body = body.replace(/kongsjieie\.bar/g, 'new.domain.com');
    
    // 然后替换产品信息
    body = body
        .replace(/\"price\":\s*\d+/g, '"price": 0') // 替换所有价格字段
        .replace(/\d+\s*天\s*\(共\s*\d+\s*天\)/g, "3099天 (共3099天)")
        .replace(/赠送\d+杏币/g, "赠送3099杏币")
        .replace(/可兑换\d+天/g, "可兑换3099天");
}

// 5. 完成并返回修改后的body
$done({body});