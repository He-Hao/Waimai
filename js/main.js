/**
 * 外卖应用主要JavaScript文件
 * 包含页面特定的功能初始化
 */

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('主脚本已加载');
    
    // 根据当前页面初始化特定功能
    initPageSpecificFeatures();
});

/**
 * 根据当前页面初始化特定功能
 */
function initPageSpecificFeatures() {
    const currentUrl = window.location.href;
    
    if (currentUrl.includes('user-home.html')) {
        initHomePage();
    } else if (currentUrl.includes('user-shop-detail.html')) {
        initShopDetailPage();
    } else if (currentUrl.includes('user-cart.html')) {
        initCartPage();
    } else if (currentUrl.includes('user-checkout.html')) {
        initCheckoutPage();
    } else if (currentUrl.includes('user-orders.html')) {
        initOrdersPage();
    } else if (currentUrl.includes('user-order-detail.html')) {
        initOrderDetailPage();
    } else if (currentUrl.includes('merchant-login.html') || currentUrl.includes('rider-login.html')) {
        initLoginPage();
    } else if (currentUrl.includes('merchant-orders.html')) {
        initMerchantOrdersPage();
    } else if (currentUrl.includes('rider-orders.html')) {
        initRiderOrdersPage();
    }
}

/**
 * 初始化首页特定功能
 */
function initHomePage() {
    console.log('初始化首页');
    
    // 初始化轮播图
    initHomeCarousel();
    
    // 初始化推荐商家
    initRecommendedShops();
}

/**
 * 初始化首页轮播图
 */
function initHomeCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // 添加轮播图切换效果
    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    
    // 设置定时器自动切换
    setInterval(() => {
        // 隐藏当前幻灯片
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // 切换到下一张
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 显示新的幻灯片
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }, 3000);
    
    // 添加指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            // 隐藏当前幻灯片
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            // 切换到点击的幻灯片
            currentSlide = index;
            
            // 显示新的幻灯片
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        });
    });
}

/**
 * 初始化推荐商家
 */
function initRecommendedShops() {
    // 为推荐商家添加点击事件
    const recommendedShops = document.querySelectorAll('.recommended-shop');
    
    recommendedShops.forEach(shop => {
        shop.addEventListener('click', function() {
            // 跳转到商家详情页
            window.location.href = '../pages/user-shop-detail.html';
        });
    });
}

/**
 * 初始化商家详情页特定功能
 */
function initShopDetailPage() {
    console.log('初始化商家详情页');
    
    // 初始化商品列表滚动监听
    initProductListScroll();
    
    // 初始化商品详情弹窗
    initProductDetailModal();
}

/**
 * 初始化商品列表滚动监听
 */
function initProductListScroll() {
    const productList = document.querySelector('.product-list');
    const categorySidebar = document.querySelector('.category-sidebar');
    
    if (!productList || !categorySidebar) return;
    
    // 监听商品列表滚动
    productList.addEventListener('scroll', function() {
        // 获取所有分类标题
        const categoryTitles = productList.querySelectorAll('.category-title');
        
        // 找到当前可见的分类
        let currentCategory = null;
        
        categoryTitles.forEach(title => {
            const rect = title.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 0) {
                currentCategory = title.textContent.trim();
            }
        });
        
        // 更新侧边栏选中状态
        if (currentCategory) {
            const categoryItems = categorySidebar.querySelectorAll('.category-item');
            
            categoryItems.forEach(item => {
                if (item.textContent.trim() === currentCategory) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}

/**
 * 初始化商品详情弹窗
 */
function initProductDetailModal() {
    // 为所有商品卡片添加点击事件
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // 获取商品信息
            const productName = this.querySelector('.product-card-title').textContent;
            const productPrice = this.querySelector('.product-card-price').textContent;
            const productImage = this.querySelector('img').src;
            
            // 创建并显示商品详情弹窗
            showProductDetailModal(productName, productPrice, productImage);
        });
    });
}

/**
 * 显示商品详情弹窗
 */
function showProductDetailModal(name, price, image) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'productDetailModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'productDetailModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productDetailModalLabel">${name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <img src="${image}" class="img-fluid rounded" alt="${name}" style="max-height: 200px;">
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="product-price">${price}</div>
                        <div class="product-sales">月售 200+</div>
                    </div>
                    <div class="product-description mb-3">
                        美味可口的${name}，采用新鲜食材精心制作，口感鲜美，回味无穷。
                    </div>
                    <div class="product-options">
                        <div class="option-group mb-2">
                            <div class="option-title">规格</div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-primary active">标准</button>
                                <button type="button" class="btn btn-outline-primary">大份</button>
                                <button type="button" class="btn btn-outline-primary">特大</button>
                            </div>
                        </div>
                        <div class="option-group mb-2">
                            <div class="option-title">辣度</div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-primary active">不辣</button>
                                <button type="button" class="btn btn-outline-primary">微辣</button>
                                <button type="button" class="btn btn-outline-primary">中辣</button>
                                <button type="button" class="btn btn-outline-primary">特辣</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="quantity-control">
                        <button class="btn btn-outline-secondary btn-sm">-</button>
                        <span class="quantity mx-2">1</span>
                        <button class="btn btn-outline-secondary btn-sm">+</button>
                    </div>
                    <button type="button" class="btn btn-primary">加入购物车</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 显示模态框
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // 处理数量控制
    const minusBtn = modal.querySelector('.quantity-control .btn-outline-secondary:first-child');
    const plusBtn = modal.querySelector('.quantity-control .btn-outline-secondary:last-child');
    const quantitySpan = modal.querySelector('.quantity');
    
    minusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
            quantitySpan.textContent = --quantity;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantitySpan.textContent);
        quantitySpan.textContent = ++quantity;
    });
    
    // 处理加入购物车按钮
    const addToCartBtn = modal.querySelector('.btn-primary');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantitySpan.textContent);
        
        // 显示添加成功提示
        showToast(`已添加 ${quantity} 份 ${name} 到购物车`);
        
        // 更新购物车数量
        updateCartBadge();
        
        // 关闭模态框
        modalInstance.hide();
    });
    
    // 模态框关闭后移除
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

/**
 * 初始化购物车页面特定功能
 */
function initCartPage() {
    console.log('初始化购物车页面');
    
    // 初始化购物车商品数量控制
    initCartItemQuantity();
    
    // 初始化购物车结算按钮
    initCartCheckout();
}

/**
 * 初始化购物车商品数量控制
 */
function initCartItemQuantity() {
    // 获取所有数量控制按钮
    const minusBtns = document.querySelectorAll('.cart-item .quantity-control .btn-minus');
    const plusBtns = document.querySelectorAll('.cart-item .quantity-control .btn-plus');
    
    // 减少数量
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quantitySpan = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent);
            
            if (quantity > 1) {
                quantitySpan.textContent = --quantity;
                updateCartItemTotal(this.closest('.cart-item'));
                updateCartTotal();
            } else {
                // 询问是否删除商品
                if (confirm('是否从购物车中删除该商品？')) {
                    this.closest('.cart-item').remove();
                    updateCartTotal();
                }
            }
        });
    });
    
    // 增加数量
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const quantitySpan = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent);
            
            quantitySpan.textContent = ++quantity;
            updateCartItemTotal(this.closest('.cart-item'));
            updateCartTotal();
        });
    });
}

/**
 * 更新购物车商品小计
 */
function updateCartItemTotal(cartItem) {
    const priceElement = cartItem.querySelector('.cart-item-price');
    const quantityElement = cartItem.querySelector('.quantity');
    const totalElement = cartItem.querySelector('.cart-item-total');
    
    const price = parseFloat(priceElement.textContent.replace('¥', ''));
    const quantity = parseInt(quantityElement.textContent);
    
    const total = price * quantity;
    totalElement.textContent = `¥${total.toFixed(2)}`;
}

/**
 * 更新购物车总计
 */
function updateCartTotal() {
    const totalElements = document.querySelectorAll('.cart-item-total');
    const cartTotalElement = document.querySelector('.cart-total .total');
    
    let total = 0;
    totalElements.forEach(element => {
        total += parseFloat(element.textContent.replace('¥', ''));
    });
    
    cartTotalElement.textContent = `¥${total.toFixed(2)}`;
}

/**
 * 初始化购物车结算按钮
 */
function initCartCheckout() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // 跳转到结算页面
            window.location.href = '../pages/user-checkout.html';
        });
    }
}

/**
 * 初始化结算页面特定功能
 */
function initCheckoutPage() {
    console.log('初始化结算页面');
    
    // 初始化支付方式选择
    initPaymentMethod();
    
    // 初始化提交订单按钮
    initSubmitOrder();
}

/**
 * 初始化支付方式选择
 */
function initPaymentMethod() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // 更新选中状态
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * 初始化提交订单按钮
 */
function initSubmitOrder() {
    const submitBtn = document.querySelector('.submit-order-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // 显示加载状态
            this.disabled = true;
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 处理中...';
            
            // 模拟提交订单
            setTimeout(() => {
                // 跳转到订单详情页
                window.location.href = '../pages/user-order-detail.html';
            }, 1500);
        });
    }
}

/**
 * 初始化订单列表页面特定功能
 */
function initOrdersPage() {
    console.log('初始化订单列表页面');
    
    // 初始化订单标签页
    initOrderTabs();
    
    // 初始化订单项点击
    initOrderItemClick();
}

/**
 * 初始化订单标签页
 */
function initOrderTabs() {
    const orderTabs = document.querySelectorAll('.order-tab');
    const orderLists = document.querySelectorAll('.order-list');
    
    orderTabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // 更新选中状态
            orderTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应的订单列表
            orderLists.forEach(list => list.style.display = 'none');
            orderLists[index].style.display = 'block';
        });
    });
}

/**
 * 初始化订单项点击
 */
function initOrderItemClick() {
    const orderItems = document.querySelectorAll('.order-item');
    
    orderItems.forEach(item => {
        item.addEventListener('click', function() {
            // 跳转到订单详情页
            window.location.href = '../pages/user-order-detail.html';
        });
    });
}

/**
 * 初始化订单详情页面特定功能
 */
function initOrderDetailPage() {
    console.log('初始化订单详情页面');
    
    // 初始化订单状态更新
    initOrderStatusUpdate();
    
    // 初始化评价按钮
    initReviewButton();
}

/**
 * 初始化订单状态更新
 */
function initOrderStatusUpdate() {
    // 模拟订单状态更新
    const statusElement = document.querySelector('.order-status');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (!statusElement || !progressSteps.length) return;
    
    // 获取当前状态
    const currentStatus = statusElement.textContent.trim();
    
    // 根据状态更新进度条
    let activeIndex = 0;
    
    if (currentStatus.includes('已接单')) {
        activeIndex = 1;
    } else if (currentStatus.includes('配送中')) {
        activeIndex = 2;
    } else if (currentStatus.includes('已送达')) {
        activeIndex = 3;
    } else if (currentStatus.includes('已完成')) {
        activeIndex = 4;
    }
    
    // 更新进度步骤
    for (let i = 0; i <= activeIndex; i++) {
        progressSteps[i].classList.add('active');
    }
}

/**
 * 初始化评价按钮
 */
function initReviewButton() {
    const reviewBtn = document.querySelector('.review-btn');
    
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            // 显示评价弹窗
            showReviewModal();
        });
    }
}

/**
 * 显示评价弹窗
 */
function showReviewModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'reviewModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'reviewModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reviewModalLabel">评价订单</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="rating-select mb-3">
                        <div class="text-center mb-2">总体评分</div>
                        <div class="d-flex justify-content-center">
                            <i class="fas fa-star fa-2x mx-1 rating-star" data-rating="1"></i>
                            <i class="fas fa-star fa-2x mx-1 rating-star" data-rating="2"></i>
                            <i class="fas fa-star fa-2x mx-1 rating-star" data-rating="3"></i>
                            <i class="fas fa-star fa-2x mx-1 rating-star" data-rating="4"></i>
                            <i class="fas fa-star fa-2x mx-1 rating-star" data-rating="5"></i>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="reviewContent" class="form-label">评价内容</label>
                        <textarea class="form-control" id="reviewContent" rows="3" placeholder="请分享您的用餐体验..."></textarea>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">上传图片</label>
                        <div class="d-flex">
                            <div class="upload-box me-2">
                                <i class="fas fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">提交评价</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 显示模态框
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // 处理星级评分
    const ratingStars = modal.querySelectorAll('.rating-star');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            
            // 更新星级显示
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('text-warning');
                } else {
                    s.classList.remove('text-warning');
                }
            });
        });
        
        // 鼠标悬停效果
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('text-warning');
                } else {
                    s.classList.remove('text-warning');
                }
            });
        });
    });
    
    // 处理提交评价按钮
    const submitBtn = modal.querySelector('.btn-primary');
    submitBtn.addEventListener('click', function() {
        // 显示提交成功提示
        showToast('评价提交成功，感谢您的反馈！');
        
        // 关闭模态框
        modalInstance.hide();
    });
    
    // 模态框关闭后移除
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

/**
 * 初始化登录页面特定功能
 */
function initLoginPage() {
    console.log('初始化登录页面');
    
    // 初始化登录表单
    initLoginForm();
}

/**
 * 初始化登录表单
 */
function initLoginForm() {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const username = this.querySelector('input[type="text"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // 简单验证
            if (!username || !password) {
                alert('请输入用户名和密码');
                return;
            }
            
            // 显示加载状态
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 登录中...';
            
            // 模拟登录
            setTimeout(() => {
                // 根据页面类型跳转
                if (window.location.href.includes('merchant-login.html')) {
                    window.location.href = '../pages/merchant-orders.html';
                } else if (window.location.href.includes('rider-login.html')) {
                    window.location.href = '../pages/rider-orders.html';
                }
            }, 1500);
        });
    }
}

/**
 * 初始化商家订单页面特定功能
 */
function initMerchantOrdersPage() {
    console.log('初始化商家订单页面');
    
    // 初始化订单操作按钮
    initMerchantOrderActions();
}

/**
 * 初始化商家订单操作按钮
 */
function initMerchantOrderActions() {
    // 接单按钮
    const acceptBtns = document.querySelectorAll('.accept-order-btn');
    
    acceptBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const orderItem = this.closest('.order-item');
            
            // 更新订单状态
            orderItem.querySelector('.order-status').textContent = '已接单';
            
            // 隐藏接单按钮，显示备餐完成按钮
            this.style.display = 'none';
            orderItem.querySelector('.complete-prep-btn').style.display = 'inline-block';
            
            // 显示提示
            showToast('已接单');
        });
    });
    
    // 备餐完成按钮
    const completePrepBtns = document.querySelectorAll('.complete-prep-btn');
    
    completePrepBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const orderItem = this.closest('.order-item');
            
            // 更新订单状态
            orderItem.querySelector('.order-status').textContent = '备餐完成';
            
            // 隐藏备餐完成按钮
            this.style.display = 'none';
            
            // 显示提示
            showToast('备餐已完成，等待骑手取餐');
        });
    });
}

/**
 * 初始化骑手订单页面特定功能
 */
function initRiderOrdersPage() {
    console.log('初始化骑手订单页面');
    
    // 初始化订单操作按钮
    initRiderOrderActions();
}

/**
 * 初始化骑手订单操作按钮
 */
function initRiderOrderActions() {
    // 接单按钮
    const acceptBtns = document.querySelectorAll('.accept-order-btn');
    
    acceptBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const orderItem = this.closest('.order-item');
            
            // 更新订单状态
            orderItem.querySelector('.order-status').textContent = '配送中';
            
            // 隐藏接单按钮，显示送达按钮
            this.style.display = 'none';
            orderItem.querySelector('.delivered-btn').style.display = 'inline-block';
            
            // 显示提示
            showToast('已接单，开始配送');
        });
    });
    
    // 送达按钮
    const deliveredBtns = document.querySelectorAll('.delivered-btn');
    
    deliveredBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const orderItem = this.closest('.order-item');
            
            // 更新订单状态
            orderItem.querySelector('.order-status').textContent = '已送达';
            
            // 隐藏送达按钮
            this.style.display = 'none';
            
            // 显示提示
            showToast('订单已送达');
        });
    });
}

/**
 * 显示提示消息
 * 这是一个辅助函数，用于显示操作提示
 * @param {string} message - 提示消息内容
 */
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.classList.add('toast-message');
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 2秒后移除提示
    setTimeout(() => {
        toast.remove();
    }, 2000);
}
