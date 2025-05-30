/**
 * 外卖应用交互功能
 * 包含用户界面的主要交互逻辑
 */

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('交互脚本已加载');
    
    // 初始化所有交互功能
    initAllInteractions();
});

/**
 * 初始化所有交互功能
 */
function initAllInteractions() {
    // 初始化点击波纹效果
    initRippleEffect();
    
    // 初始化底部标签栏
    initTabBar();
    
    // 初始化返回按钮
    initBackButtons();
    
    // 初始化商品添加到购物车
    initAddToCart();
    
    // 初始化地址选择器
    initAddressSelector();
    
    // 初始化商家详情标签页
    initShopDetailTabs();
    
    // 初始化搜索栏
    initSearchBar();
}

/**
 * 初始化点击波纹效果
 */
function initRippleEffect() {
    // 为所有按钮和可点击元素添加点击事件
    const clickableElements = document.querySelectorAll('.btn, .tab-item, .shop-item, .product-card, .category-item, .checkout-btn');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // 创建波纹元素
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // 设置波纹位置
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // 动画结束后移除波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * 初始化底部标签栏
 */
function initTabBar() {
    const tabItems = document.querySelectorAll('.tab-bar .tab-item');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // 获取当前标签的索引
            const index = Array.from(tabItems).indexOf(this);
            
            // 根据索引跳转到相应页面
            switch(index) {
                case 0: // 首页
                    if (!window.location.href.includes('user-home.html')) {
                        window.location.href = '../pages/user-home.html';
                    }
                    break;
                case 1: // 发现
                    if (!window.location.href.includes('user-search.html')) {
                        window.location.href = '../pages/user-search.html';
                    }
                    break;
                case 2: // 购物车
                    if (!window.location.href.includes('user-cart.html')) {
                        window.location.href = '../pages/user-cart.html';
                    }
                    break;
                case 3: // 订单
                    if (!window.location.href.includes('user-orders.html')) {
                        window.location.href = '../pages/user-orders.html';
                    }
                    break;
                case 4: // 我的
                    // 假设用户个人页面
                    alert('个人中心功能即将上线');
                    break;
            }
        });
    });
    
    // 根据当前页面高亮对应的标签
    highlightCurrentTab();
}

/**
 * 根据当前页面URL高亮对应的底部标签
 */
function highlightCurrentTab() {
    const tabItems = document.querySelectorAll('.tab-bar .tab-item');
    const currentUrl = window.location.href;
    
    // 移除所有标签的active类
    tabItems.forEach(tab => tab.classList.remove('active'));
    
    // 根据URL设置active类
    if (currentUrl.includes('user-home.html')) {
        tabItems[0].classList.add('active');
    } else if (currentUrl.includes('user-search.html')) {
        tabItems[1].classList.add('active');
    } else if (currentUrl.includes('user-cart.html')) {
        tabItems[2].classList.add('active');
    } else if (currentUrl.includes('user-orders.html')) {
        tabItems[3].classList.add('active');
    } else if (currentUrl.includes('user-profile.html')) {
        tabItems[4].classList.add('active');
    }
}

/**
 * 初始化返回按钮
 */
function initBackButtons() {
    const backButtons = document.querySelectorAll('.back-btn, .nav-bar .back');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 如果有指定的返回URL，则跳转到该URL
            if (this.dataset.href) {
                window.location.href = this.dataset.href;
            } else {
                // 否则返回上一页
                window.history.back();
            }
        });
    });
}

/**
 * 初始化商品添加到购物车
 */
function initAddToCart() {
    const addButtons = document.querySelectorAll('.product-card-add');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            
            // 获取商品信息
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productTitle = productCard.querySelector('.product-card-title');
            if (!productTitle) return;
            
            const productName = productTitle.textContent;
            
            // 显示添加成功提示
            showToast(`已添加 ${productName} 到购物车`);
            
            // 更新购物车数量
            updateCartBadge();
        });
    });
}

/**
 * 显示提示消息
 * @param {string} message - 提示消息内容
 */
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.classList.add('toast-message');
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 添加必要的CSS
    if (!document.getElementById('toast-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.textContent = `
            .toast-message {
                position: fixed;
                bottom: 120px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                z-index: 1000;
                animation: toast-animation 2s ease;
            }
            
            @keyframes toast-animation {
                0% {
                    opacity: 0;
                    transform: translate(-50%, 20px);
                }
                10% {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
                90% {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -20px);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // 2秒后移除提示
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

/**
 * 更新购物车数量标记
 */
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) return;
    
    // 获取当前数量
    let count = parseInt(cartBadge.textContent || '0');
    
    // 增加数量
    count++;
    
    // 更新显示
    cartBadge.textContent = count;
    
    // 添加动画效果
    cartBadge.classList.add('badge-animation');
    setTimeout(() => {
        cartBadge.classList.remove('badge-animation');
    }, 500);
    
    // 添加必要的CSS
    if (!document.getElementById('badge-animation-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'badge-animation-styles';
        styleSheet.textContent = `
            .badge-animation {
                animation: badge-pulse 0.5s ease;
            }
            
            @keyframes badge-pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.5);
                }
                100% {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

/**
 * 初始化地址选择器
 */
function initAddressSelector() {
    const addressSelector = document.querySelector('.address-selector');
    
    if (addressSelector) {
        addressSelector.addEventListener('click', function() {
            alert('地址选择功能即将上线');
        });
    }
}

/**
 * 初始化商家详情标签页
 */
function initShopDetailTabs() {
    const tabs = document.querySelectorAll('.shop-detail-tab');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // 更新选中状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 根据索引切换内容
            if (index === 0) {
                alert('点餐标签已选中');
            } else if (index === 1) {
                alert('评价标签已选中');
            } else if (index === 2) {
                alert('商家标签已选中');
            }
        });
    });
}

/**
 * 初始化搜索栏
 */
function initSearchBar() {
    const searchBars = document.querySelectorAll('.search-bar');
    
    searchBars.forEach(searchBar => {
        const input = searchBar.querySelector('input');
        if (!input) return;
        
        // 点击搜索栏跳转到搜索页面
        searchBar.addEventListener('click', function() {
            if (!window.location.href.includes('user-search.html')) {
                window.location.href = '../pages/user-search.html';
            }
        });
        
        // 搜索输入处理
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                
                // 获取搜索关键词
                const keyword = this.value.trim();
                if (keyword) {
                    alert(`搜索: ${keyword}`);
                }
            }
        });
    });
}
