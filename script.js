var myAudio, myCanvas, ctx;
var fireworksList = [];
var charIndex = 0;

// Nội dung lời chúc ngọt ngào của Tbinh gửi YenNhiii
var letterMessage = "Happy Birthday YenNhiii ! 🎉\n\nHôm nay là một ngày siêu cấp đặc biệt của cậu, và Tbinh muốn gửi đến cậu những lời chúc chân thành nhất của Tbinh. Toi cảm thấy thật may mắn khi quen biết và làm bạn với Nhi. Mặc dù chỉ quen nhau qua cái màn hình thôi nhưng đối với toi, Nhi là một người bạn tuyệt vời mà toi có được.\n\nTuổi 18 - tuổi trưởng thành, chúc cậu luôn gặt hái được nhiều 'thành tựu' mới trong cuộc sống. Chúc cậu ngoài đời luôn bình an, mạnh khỏe, xinh đẹp và chúc cho mọi ước mơ mà cậu đang ấp ủ sẽ trở thành hiện thực.\n\nTbinh mong rằng có thể làm bạn với Nhii lâu thật lâu cả Sơn và Huy nữa toi thật sự thấy vui khi chơi cùng các bạn rất nhiều. Chúc cậu tuổi mới thật hạnh phúc và luôn rạng rỡ như hiện tại nheeeee! 🌸💕";

window.onload = function() {
    myAudio = document.getElementById("birthday-audio");
    myCanvas = document.getElementById('fireworksCanvas');
    if (myCanvas) {
        ctx = myCanvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        loop();
    }

    setInterval(createHeartBubble, 300);

    // 1. CLICK MỞ HỘP QUÀ
    var btnGift = document.getElementById("btn-gift");
    if(btnGift) {
        btnGift.addEventListener("click", function() {
            var p1 = document.getElementById('part1');
            p1.style.opacity = '0';
            p1.style.transform = 'rotateY(70deg) scale(0.85)';
            
            setTimeout(function() {
                p1.style.display = 'none';
                p1.classList.remove('active');
                
                if (myCanvas) myCanvas.style.display = 'block';
                if(myAudio) { myAudio.play().catch(function(e) { console.log("Mồi nhạc thành công!"); }); }

                var p2 = document.getElementById('part2');
                if(p2) { p2.style.display = 'flex'; setTimeout(function() { p2.classList.add('active'); }, 50); }
            }, 400);
        });
    }

    // 2. CHẠM (CLICK) TRỰC TIẾP ĐỂ THỔI TẮT NẾN
    var cakeElement = document.getElementById("interactive-cake");
    if(cakeElement) {
        cakeElement.addEventListener("click", function() {
            if(!cakeElement.classList.contains('extinguished')) {
                cakeElement.classList.add('extinguished'); // Chỉ ngọn lửa tắt, số 18 giữ nguyên màu
                
                var containerRect = document.getElementById("smoke-container").getBoundingClientRect();
                var cakeRect = cakeElement.getBoundingClientRect();
                
                var smokeOriginX = cakeRect.left - containerRect.left + (cakeRect.width / 2);
                var smokeOriginY = cakeRect.top - containerRect.top + 20;

                // Tạo làn khói bốc lên khi nến tắt
                for (let i = 0; i < 15; i++) {
                    setTimeout(function() { createSmokeParticle(smokeOriginX, smokeOriginY); }, i * 30);
                }

                // Đợi khói tan 1.5 giây rồi thực hiện lật trang 3D mượt mà sang Phần 3 đọc thư
                setTimeout(function() {
                    var p2 = document.getElementById('part2');
                    p2.style.opacity = '0';
                    p2.style.transform = 'rotateY(70deg) scale(0.85)';
                    
                    setTimeout(function() {
                        p2.style.display = 'none';
                        p2.classList.remove('active');
                        
                        var p3 = document.getElementById('part3');
                        if(p3) {
                            p3.style.display = 'flex';
                            setTimeout(function() { p3.classList.add('active'); startTypingEffect(); }, 50);
                        }
                    }, 400);
                }, 1500);
            }
        });
    }

    // 3. NHẤN VÀO THƯ QUA TRANG KẾT THÚC
    var letterBox = document.getElementById("letter-box");
    if(letterBox) {
        letterBox.addEventListener("click", function() {
            var p3 = document.getElementById('part3');
            p3.style.opacity = '0';
            p3.style.transform = 'rotateY(70deg) scale(0.85)';
            
            setTimeout(function() {
                document.getElementById('part3').style.display = 'none';
                document.getElementById('part3').classList.remove('active');
                
                var p4 = document.getElementById('part4');
                if(p4) { p4.style.display = 'flex'; setTimeout(function() { p4.classList.add('active'); }, 50); }
            }, 400);
        });
    }

    // 4. SỰ KIỆN CLICK THOÁT RA KHỎI CARD
    var btnClose = document.getElementById("btn-close");
    if(btnClose) {
        btnClose.addEventListener("click", function() {
            var p4 = document.getElementById('part4');
            p4.style.opacity = '0';
            p4.style.transform = 'rotateY(70deg) scale(0.85)';
            
            setTimeout(function() {
                p4.style.display = 'none';
                p4.classList.remove('active');
                if (myCanvas) myCanvas.style.display = 'none';
                if(myAudio) { myAudio.pause(); }
                alert("Món quà khép lại rồi. Chúc cậu một ngày sinh nhật siêu cấp ngọt ngào nha! 🌸✨");
            }, 400);
        });
    }
};

function createSmokeParticle(x, y) {
    var container = document.getElementById("smoke-container");
    if(!container) return;
    var smoke = document.createElement("div");
    smoke.classList.add("smoke-particle");
    smoke.style.left = x + "px"; smoke.style.top = y + "px";
    var size = Math.random() * 6 + 4;
    smoke.style.width = size + "px"; smoke.style.height = size + "px";
    smoke.style.setProperty('--smokeX', (Math.random() * 40 - 20) + "px");
    container.appendChild(smoke);
    setTimeout(function() { smoke.remove(); }, 1200);
}

function createHeartBubble() {
    var p1 = document.getElementById('part1');
    if(p1 && p1.style.display !== 'none') {
        var heart = document.createElement("div");
        heart.innerHTML = "🌸";
        heart.classList.add("heart-particle");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.setProperty('--moveX', (Math.random() * 200 - 100) + "px");
        heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
        document.body.appendChild(heart);
        setTimeout(function() { heart.remove(); }, 4000);
    }
}

function startTypingEffect() {
    var target = document.getElementById("typing-text");
    if (!target) return;
    if (charIndex < letterMessage.length) {
        if(letterMessage.charAt(charIndex) === "\n") { target.innerHTML += "<br>"; } 
        else { target.innerHTML += letterMessage.charAt(charIndex); }
        charIndex++;
        setTimeout(startTypingEffect, 45);
    } else {
        var hint = document.getElementById("hint-to-p4");
        if(hint) hint.style.display = "block";
    }
}

function resizeCanvas() { if(myCanvas) { myCanvas.width = window.innerWidth; myCanvas.height = window.innerHeight; } }

function Particle(x, y, color) {
    this.x = x; this.y = y; this.color = color; this.radius = Math.random() * 2.2 + 0.5;
    var angle = Math.random() * Math.PI * 2; var speed = Math.random() * 4.5 + 2;
    this.velocityX = Math.cos(angle) * speed; this.velocityY = Math.sin(angle) * speed;
    this.alpha = 1; this.decay = Math.random() * 0.012 + 0.012;
}
Particle.prototype.draw = function() {
    if (!ctx) return;
    ctx.save(); ctx.globalAlpha = this.alpha; ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color; ctx.shadowBlur = 10; ctx.shadowColor = this.color;
    ctx.fill(); ctx.restore();
};
Particle.prototype.update = function() { this.x += this.velocityX; this.y += this.velocityY; this.velocityY += 0.03; this.alpha -= this.decay; };

function Firework() {
    if (!myCanvas) return;
    this.x = Math.random() * myCanvas.width; this.y = myCanvas.height;
    this.targetY = Math.random() * (myCanvas.height * 0.5) + 50;
    this.speed = Math.random() * 4 + 7; this.particles = []; this.exploded = false;
    var randomHue = Math.floor(Math.random() * 40) + 330; 
    if (randomHue > 360) randomHue = randomHue - 360;
    this.color = 'hsl(' + randomHue + ', 100%, 75%)';
}
Firework.prototype.update = function() {
    if (!this.exploded) { this.y -= this.speed; if (this.y <= this.targetY) { this.exploded = true; for (var i = 0; i < 60; i++) { this.particles.push(new Particle(this.x, this.y, this.color)); } } }
    else { for (var j = this.particles.length - 1; j >= 0; j--) { this.particles[j].update(); if (this.particles[j].alpha <= 0) { this.particles.splice(j, 1); } } }
};
Firework.prototype.draw = function() { 
    if (!ctx) return;
    if (!this.exploded) { ctx.beginPath(); ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); } 
    else { this.particles.forEach(function(p) { p.draw(); }); } 
};

function loop() {
    if(!ctx || !myCanvas) return;
    ctx.fillStyle = 'rgba(255, 240, 245, 0.2)'; ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
    if (myCanvas.style.display === 'block' && Math.random() < 0.04) { fireworksList.push(new Firework()); }
    for (var k = fireworksList.length - 1; k >= 0; k--) { fireworksList[k].update(); fireworksList[k].draw(); if (fireworksList[k].exploded && fireworksList[k].particles.length === 0) { fireworksList.splice(k, 1); } }
    requestAnimationFrame(loop);
}
