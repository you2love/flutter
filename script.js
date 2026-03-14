// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // Tab 切换功能
    initTabNavigation();
    // 代码复制功能
    initCopyButtons();
    // 小程序代码示例标签切换
    initExampleTabs();
});

// Tab 切换功能
function initTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // 移除所有 active 类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // 添加 active 类到当前按钮和面板
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // 平滑滚动到内容顶部
            const tabContentContainer = document.querySelector('.tab-content-container');
            if (tabContentContainer) {
                tabContentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// 代码复制功能
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.parentElement.querySelector('.code-block pre code');
            const textToCopy = codeBlock.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // 显示成功消息
                const originalText = this.textContent;
                this.textContent = '已复制!';
                this.style.background = 'var(--success)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'var(--primary-color)';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动选择文本复制');
            });
        });
    });
}

// 页面加载时的淡入效果
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// 添加滚动动画
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.feature-card, .tutorial-item, .example-card, .resource-card, .step-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// 添加搜索功能（简单的页面内搜索）
function searchContent(query) {
    query = query.toLowerCase();
    const searchResults = [];

    // 搜索教程项目
    document.querySelectorAll('.tutorial-item').forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            searchResults.push(item);
        }
    });

    // 搜索代码示例
    document.querySelectorAll('.example-card').forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const code = item.querySelector('.code-block').textContent.toLowerCase();

        if (title.includes(query) || code.includes(query)) {
            searchResults.push(item);
        }
    });

    return searchResults;
}

// 添加深色模式支持（可选）
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // 可以在这里保存到localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

// 检查用户之前是否设置了深色模式
function checkDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// 初始化时检查深色模式偏好
checkDarkModePreference();

// 添加响应式菜单切换（移动端）
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
}

// 添加工具提示功能
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.appendChild(tooltip);

    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// 添加加载状态指示器
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading-indicator';
    loading.style.position = 'fixed';
    loading.style.top = '50%';
    loading.style.left = '50%';
    loading.style.transform = 'translate(-50%, -50%)';
    loading.style.background = 'rgba(0, 0, 0, 0.7)';
    loading.style.color = 'white';
    loading.style.padding = '20px';
    loading.style.borderRadius = '8px';
    loading.style.zIndex = '9999';
    loading.textContent = '加载中...';

    document.body.appendChild(loading);
    return loading;
}

function hideLoading() {
    const loading = document.getElementById('loading-indicator');
    if (loading) {
        loading.remove();
    }
}

// 添加错误处理
function handleError(error) {
    console.error('发生错误:', error);
    alert('发生错误，请刷新页面重试');
}

// 性能优化：延迟加载图片（如果有）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 初始化延迟加载
lazyLoadImages();

// 添加页面可见性检测
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('页面被隐藏');
    } else {
        console.log('页面可见');
    }
});

// 导出全局函数供HTML中使用
window.copyCode = function(button) {
    const codeBlock = button.parentElement.querySelector('.code-block pre code');
    const textToCopy = codeBlock.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.textContent;
        button.textContent = '已复制!';
        button.style.background = 'var(--success)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'var(--primary-color)';
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动选择文本复制');
    });
};

// 添加打印样式支持
function printPage() {
    window.print();
}

// 添加书签功能
function bookmarkPage() {
    if (window.sidebar && window.sidebar.addPanel) {
        window.sidebar.addPanel(document.title, window.location.href, "");
    } else if (window.external && ('AddFavorite' in window.external)) {
        window.external.AddFavorite(window.location.href, document.title);
    } else {
        alert('请按 Ctrl+D (Cmd+D) 添加书签');
    }
}

console.log('Flutter 教程网站已加载完成！');
// 小程序代码示例标签切换功能
function initExampleTabs() {
    const exampleTabs = document.querySelectorAll('.example-tab');
    const exampleContents = document.querySelectorAll('.example-content');

    exampleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetExample = this.getAttribute('data-example');

            // 移除所有 active 类
            exampleTabs.forEach(t => t.classList.remove('active'));
            exampleContents.forEach(c => c.classList.remove('active'));

            // 添加 active 类到当前标签和内容
            this.classList.add('active');
            const targetContent = document.getElementById('example-' + targetExample);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}
