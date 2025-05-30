/**
 * 自动更新所有HTML页面，添加JavaScript引用
 */

const fs = require('fs');
const path = require('path');

// 页面目录
const pagesDir = path.join(__dirname, 'pages');

// 读取页面目录中的所有HTML文件
fs.readdir(pagesDir, (err, files) => {
    if (err) {
        console.error('读取目录失败:', err);
        return;
    }
    
    // 过滤出HTML文件
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    // 处理每个HTML文件
    htmlFiles.forEach(file => {
        const filePath = path.join(pagesDir, file);
        
        // 读取文件内容
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`读取文件 ${file} 失败:`, err);
                return;
            }
            
            // 检查是否已经包含common.js
            if (data.includes('src="../js/common.js"')) {
                console.log(`文件 ${file} 已包含common.js引用，跳过`);
                return;
            }
            
            // 在</body>标签前添加common.js引用
            const updatedData = data.replace(
                /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.0\/dist\/js\/bootstrap\.bundle\.min\.js"><\/script>\s*<\/body>/,
                '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>\n    <script src="../js/common.js"></script>\n</body>'
            );
            
            // 写入更新后的内容
            fs.writeFile(filePath, updatedData, 'utf8', err => {
                if (err) {
                    console.error(`更新文件 ${file} 失败:`, err);
                    return;
                }
                console.log(`文件 ${file} 已更新，添加了common.js引用`);
            });
        });
    });
});

console.log('开始更新所有HTML页面...');
