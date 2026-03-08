// 验证修复后的tab功能
console.log('=== 验证修复后的tab功能 ===');

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // 检查AI代码生成tab
        const aiCodingBtn = document.querySelector('.tab-btn[data-tab="ai-coding"]');
        const aiCodingPanel = document.getElementById('ai-coding');

        console.log('1. 检查AI代码生成按钮:');
        console.log('   - 存在:', !!aiCodingBtn);
        if (aiCodingBtn) {
            console.log('   - 文本:', aiCodingBtn.textContent.trim());
        }

        console.log('\n2. 检查AI代码生成面板:');
        console.log('   - 存在:', !!aiCodingPanel);
        if (aiCodingPanel) {
            console.log('   - 初始display:', window.getComputedStyle(aiCodingPanel).display);
            console.log('   - 初始active类:', aiCodingPanel.classList.contains('active'));
            console.log('   - 内容长度:', aiCodingPanel.innerHTML.length);
        }

        // 模拟点击AI代码生成按钮
        console.log('\n3. 点击AI代码生成按钮...');
        if (aiCodingBtn) {
            aiCodingBtn.click();

            setTimeout(() => {
                console.log('   - 点击后display:', window.getComputedStyle(aiCodingPanel).display);
                console.log('   - 点击后active类:', aiCodingPanel.classList.contains('active'));
                console.log('   - 按钮active类:', aiCodingBtn.classList.contains('active'));

                if (window.getComputedStyle(aiCodingPanel).display === 'block') {
                    console.log('\n✅ 修复成功！AI代码生成tab可以正常显示');
                } else {
                    console.log('\n❌ 修复失败！AI代码生成tab仍然无法显示');
                }
            }, 100);
        }
    }, 500);
});