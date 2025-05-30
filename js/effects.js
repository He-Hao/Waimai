/**
 * 外卖应用视觉效果和动画
 * 用于增强用户体验的各种视觉效果
 */

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('效果脚本已加载');
    
    // 添加点击波纹效果
    addRippleEffect();
    
    // 添加滚动动画效果
    addScrollAnimations();
    
    // 添加加载动画
    setupLoadingEffects();
    
    // 添加页面过渡效果
    setupPageTransitions();
});

/**
 * 添加点击波纹效果
 * 当用户点击按钮或卡片时显示波纹动画
 */
function addRippleEffect() {
    // 为所有按钮和可点击元素添加波纹效果
    const clickableElements = document.querySelectorAll('.btn, .tab-item, .shop-item, .product-card, .category-item, .checkout-btn');
    
    clickableElements.forEach(element => {
        element.classList.add('ripple-effect');
        
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
    
    // 添加必要的CSS
    addRippleStyles();
}

/**
 * 添加波纹效果所需的CSS样式
 */
function addRippleStyles() {
    // 检查是否已存在样式
    if (document.getElementById('ripple-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'ripple-styles';
    styleSheet.textContent = `
        .ripple-effect {
            position: relative;
            overflow: hidden;
            transform: translate3d(0, 0, 0);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

/**
 * 添加滚动动画效果
 * 当元素滚动到视图中时添加动画
 */
function addScrollAnimations() {
    // 获取所有需要添加动画的元素
    const animatedElements = document.querySelectorAll('.shop-item, .product-card, .category-nav');
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // 动画只执行一次
            }
        });
    }, { threshold: 0.1 }); // 当10%的元素可见时触发
    
    // 观察所有元素
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
    
    // 添加必要的CSS
    addScrollAnimationStyles();
}

/**
 * 添加滚动动画所需的CSS样式
 */
function addScrollAnimationStyles() {
    // 检查是否已存在样式
    if (document.getElementById('scroll-animation-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'scroll-animation-styles';
    styleSheet.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
}

/**
 * 设置加载动画
 * 在数据加载过程中显示加载动画
 */
function setupLoadingEffects() {
    // 添加加载动画样式
    addLoadingStyles();
    
    // 模拟加载状态（实际项目中应根据真实数据加载状态显示）
    const contentAreas = document.querySelectorAll('.content, .product-list');
    
    contentAreas.forEach(area => {
        // 创建加载指示器
        const loader = document.createElement('div');
        loader.classList.add('loading-spinner');
        loader.innerHTML = '<div></div><div></div><div></div><div></div>';
        
        // 添加到页面
        area.appendChild(loader);
        
        // 模拟加载完成后隐藏
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    });
}

/**
 * 添加加载动画所需的CSS样式
 */
function addLoadingStyles() {
    // 检查是否已存在样式
    if (document.getElementById('loading-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'loading-styles';
    styleSheet.textContent = `
        .loading-spinner {
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            z-index: 1000;
        }
        
        .loading-spinner div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 32px;
            height: 32px;
            margin: 4px;
            border: 4px solid #ff6b00;
            border-radius: 50%;
            animation: loading-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #ff6b00 transparent transparent transparent;
        }
        
        .loading-spinner div:nth-child(1) {
            animation-delay: -0.45s;
        }
        
        .loading-spinner div:nth-child(2) {
            animation-delay: -0.3s;
        }
        
        .loading-spinner div:nth-child(3) {
            animation-delay: -0.15s;
        }
        
        @keyframes loading-spinner {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

/**
 * 设置页面过渡效果
 * 在页面切换时添加平滑过渡
 */
function setupPageTransitions() {
    // 获取所有链接
    const links = document.querySelectorAll('a[href], .tab-item, .back-btn');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // 对于实际链接，添加页面过渡效果
            if (this.hasAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // 创建过渡效果
                const transition = document.createElement('div');
                transition.classList.add('page-transition');
                document.body.appendChild(transition);
                
                // 动画完成后跳转
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 300);
            }
        });
    });
    
    // 添加必要的CSS
    addTransitionStyles();
    
    // 页面加载时的入场动画
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
    });
}

/**
 * 添加页面过渡所需的CSS样式
 */
function addTransitionStyles() {
    // 检查是否已存在样式
    if (document.getElementById('transition-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'transition-styles';
    styleSheet.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        body.page-loaded {
            opacity: 1;
        }
        
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 107, 0, 0.2);
            z-index: 9999;
            animation: fade-in 0.3s ease forwards;
        }
        
        @keyframes fade-in {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}
