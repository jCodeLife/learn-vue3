//首先，通过Rain构造出很多很多雨滴，且每滴雨的位置、速度和方向不一
class Rain {
    constructor(opt = {}) {
        // 每个el即是一个雨滴
        this.el = null;
        // 雨点的出现的位置
        this.x = 0;
        this.y = 0;
        //雨的颗粒度大小
        this.width = opt.width;
        this.maxWidth = opt.maxWidth || 3;
        this.minWidth = opt.minWidth || 1;
        // 雨点的长度
        this.height = 0;
        this.maxHeight = opt.maxHeight || 30;
        this.minHeight = opt.minHeight || 20;
        // 雨的下落速度
        this.speed_x = 0
        this.speed_y = 0
        this.maxSpeed = opt.maxSpeed || 100;
        this.minSpeed = opt.minSpeed || 10;
        // 初始化数据
        this.init();

    }
    //初始化函数
    init() {
        // 初始化指定范围的随机雨点大小
        this.width = Math.floor(Math.random() * this.maxWidth + this.minWidth)
        this.height = Math.floor(Math.random() * this.maxHeight + this.minHeight)
        // 初始化指定范围的随机雨点位置
        this.x = Math.floor(Math.random() * (window.innerWidth - this.width))
        this.y = Math.floor(Math.random() * (window.innerHeight - this.height))
        // 初始化指定范围的随机雨点速度
        this.speed_y = Math.random() * this.maxSpeed + this.minSpeed
        this.speed_x = Math.random() * this.maxSpeed
    }
    // 设置样式
    setStyle() {
        this.el.style.cssText = `
        position:fixed;
        left:0;
        top:0;
        display:block;
        width:${this.width}px;
        height:${this.height}px;
        background-image: radial-gradient(#fff 0%, rgba(255, 255, 255, 0) 60%);
        z-index: 999999999;
        opacity:.6;
        pointer-events: none;
        transform: translate(${this.x}px, ${this.y}px);
    
    `
    }
    //渲染雨点
    render() {
        this.el = document.createElement('div')
        this.setStyle()
        document.body.appendChild(this.el)
    }
    // 雨下起来(改变位置)
    move() {
        this.x += 5;
        this.y += this.speed_y
        // 判断边界
        if (this.x < -this.width || this.x > window.innerWidth || this.y > window.innerHeight) {
            this.init()
            this.setStyle()
        }
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`

    }
}
//渲染1000个雨滴
let rainList = []
for (let i = 0; i <= 1200; i++) {
    let rain = new Rain({
        maxWidth: 5,
        speemaxSpeed: 150
    });
    rain.render();
    rainList.push(rain);
}
// 下雨
function moveRain() {
    window.requestAnimationFrame(() => {
        rainList.forEach((item) => {
            item.move()
        })
        moveRain()
    })
}

moveRain()