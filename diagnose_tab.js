// 诊断脚本 - 检查tab功能
console.log('=== 开始诊断tab功能 ===');

// 检查tab按钮
const tabBtns = document.querySelectorAll('.tab-btn');
console.log('找到tab按钮数量:', tabBtns.length);
tabBtns.forEach((btn, index) => {
    console.log(`按钮 ${index}:`, {
        text: btn.textContent.trim(),
        dataTab: btn.getAttribute('data-tab'),
        active: btn.classList.contains('active')
    });
});

// 检查tab面板
const tabPanels = document.querySelectorAll('.tab-panel');
console.log('\n找到tab面板数量:', tabPanels.length);
tabPanels.forEach((panel, index) => {
    console.log(`面板 ${index}:`, {
        id: panel.id,
        active: panel.classList.contains('active'),
        display: window.getComputedStyle(panel).display
    });
});

// 检查ai-coding特定元素
const aiCodingBtn = document.querySelector('.tab-btn[data-tab="ai-coding"]');
const aiCodingPanel = document.getElementById('ai-coding');

console.log('\n=== AI代码生成tab详情 ===');
if (aiCodingBtn) {
    console.log('AI代码生成按钮存在:', true);
    console.log('按钮内容:', aiCodingBtn.innerHTML);
} else {
    console.log('❌ AI代码生成按钮不存在');
}

if (aiCodingPanel) {
    console.log('AI代码生成面板存在:', true);
    console.log('面板display样式:', window.getComputedStyle(aiCodingPanel).display);
    console.log('面板是否有active类:', aiCodingPanel.classList.contains('active'));
    console.log('面板内容长度:', aiCodingPanel.innerHTML.length);
    console.log('面板子元素数量:', aiCodingPanel.children.length);
} else {
    console.log('❌ AI代码生成面板不存在');
}

// 测试手动切换
console.log('\n=== 测试手动切换 ===');
if (aiCodingBtn && aiCodingPanel) {
    aiCodingBtn.click();
    setTimeout(() => {
        console.log('点击后面板display样式:', window.getComputedStyle(aiCodingPanel).display);
        console.log('点击后面板是否有active类:', aiCodingPanel.classList.contains('active'));
    }, 100);
}

console.log('=== 诊断完成 ===');