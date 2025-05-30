/**
 * 外卖应用通用JavaScript文件
 * 用于在所有页面中引入其他JavaScript文件
 */

// 动态加载JavaScript文件
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`加载脚本失败: ${src}`));
        document.body.appendChild(script);
    });
}

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 加载效果脚本
        await loadScript('../js/effects.js');
        
        // 加载交互脚本
        await loadScript('../js/interactions.js');
        
        // 加载主脚本
        await loadScript('../js/main.js');
        
        console.log('所有脚本加载完成');
    } catch (error) {
        console.error('脚本加载失败:', error);
    }
});
