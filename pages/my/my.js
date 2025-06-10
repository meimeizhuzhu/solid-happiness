Page({
  data: {
    snowflakes: [],
    snowflakeCount: 0,
    maxSnowflakes: 100,
    animationId: null,
    snowflakeChars: ['❄', '❅', '❆', '✻', '✼', '✽', '✾', '✿', '❀', '❁'],
    windowWidth: 375,
    windowHeight: 667
  },

  onLoad: function() {
    // 更可靠的动画API兼容性处理
    this.initAnimationPolyfill();
    
    this.getWindowSize();
    this.initSnowflakes(30);
    this.startAnimation();
  },

  onUnload: function() {
    this.stopAnimation();
  },

  // 新增方法：初始化动画polyfill
  initAnimationPolyfill: function() {
    // 优先使用微信官方API
    if (wx && wx.requestAnimationFrame) {
      this.requestAnimationFrame = wx.requestAnimationFrame.bind(wx);
      this.cancelAnimationFrame = wx.cancelAnimationFrame.bind(wx);
    } 
    // 次选方案：使用小程序组件中的API
    else if (wx && wx.createSelectorQuery && wx.createSelectorQuery()._component) {
      this.requestAnimationFrame = wx.createSelectorQuery()._component.requestAnimationFrame;
      this.cancelAnimationFrame = wx.createSelectorQuery()._component.cancelAnimationFrame;
    }
    // 最后备选：使用setTimeout模拟
    else {
      this.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 16);
      };
      this.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  },

  getWindowSize: function() {
    try {
      const res = wx.getSystemInfoSync();
      this.setData({
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight
      });
    } catch (e) {
      console.error('获取窗口尺寸失败:', e);
    }
  },

  createSnowflake: function() {
    if (this.data.snowflakeCount >= this.data.maxSnowflakes) return;
    
    const snowflake = {
      id: Date.now() + Math.random(),
      char: this.data.snowflakeChars[Math.floor(Math.random() * this.data.snowflakeChars.length)],
      size: Math.random() * 0.8 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      x: Math.random() * this.data.windowWidth,
      y: -20,
      speed: Math.random() * 3 + 1,
      sway: Math.random() * 5 + 1,
      swayFrequency: Math.random() * 0.02 + 0.01,
      time: Math.random() * 100,
      swayX: 0
    };
    
    this.setData({
      snowflakes: [...this.data.snowflakes, snowflake],
      snowflakeCount: this.data.snowflakeCount + 1
    });
  },

  removeSnowflake: function() {
    if (this.data.snowflakeCount <= 0) return;
    
    const snowflakes = this.data.snowflakes.slice(0, -1);
    
    this.setData({
      snowflakes: snowflakes,
      snowflakeCount: this.data.snowflakeCount - 1
    });
  },

  initSnowflakes: function(count) {
    for (let i = 0; i < count; i++) {
      this.createSnowflake();
    }
  },

  updateSnowflakes: function() {
    const snowflakes = this.data.snowflakes.map(item => {
      const newItem = {...item};
      newItem.y += newItem.speed;
      newItem.time += newItem.swayFrequency;
      newItem.swayX = Math.sin(newItem.time) * newItem.sway;
      
      if (newItem.y > this.data.windowHeight) {
        newItem.y = -20;
        newItem.x = Math.random() * this.data.windowWidth;
      }
      
      if (newItem.x < -20 || newItem.x > this.data.windowWidth + 20) {
        newItem.y = -20;
        newItem.x = Math.random() * this.data.windowWidth;
      }
      
      return newItem;
    });
    
    this.setData({ snowflakes });
  },

  startAnimation: function() {
    if (!this.requestAnimationFrame) {
      console.error('requestAnimationFrame 未定义');
      return;
    }
    
    const animate = () => {
      this.updateSnowflakes();
      this.data.animationId = this.requestAnimationFrame(animate);
    };
    this.data.animationId = this.requestAnimationFrame(animate);
  },

  stopAnimation: function() {
    if (this.data.animationId && this.cancelAnimationFrame) {
      this.cancelAnimationFrame(this.data.animationId);
      this.data.animationId = null;
    }
  },

  addSnow: function() {
    this.createSnowflake();
  },

  removeSnow: function() {
    this.removeSnowflake();
  }
});