// Lê parâmetros da URL para personalizar a página
this.y += this.speed;
this.x += this.dx;
if(this.y > H + 50) hearts.splice(i,1);
}
Heart.prototype.draw = function(){
ctx.save();
ctx.globalAlpha = this.opacity;
drawHeart(ctx, this.x, this.y, this.size, this.color);
ctx.restore();
}


function drawHeart(ctx,x,y,size,color){
ctx.beginPath();
const topCurveHeight = size * 0.3;
ctx.moveTo(x, y + topCurveHeight);
ctx.bezierCurveTo(
x, y,
x - size / 2, y,
x - size / 2, y + topCurveHeight
);
ctx.bezierCurveTo(
x - size / 2, y + (size + topCurveHeight) / 2,
x, y + (size + topCurveHeight) / 1.4,
x, y + size
);
ctx.bezierCurveTo(
x, y + (size + topCurveHeight) / 1.4,
x + size / 2, y + (size + topCurveHeight) / 2,
x + size / 2, y + topCurveHeight
);
ctx.bezierCurveTo(
x + size / 2, y,
x, y,
x, y + topCurveHeight
);
ctx.closePath();
ctx.fillStyle = color;
ctx.fill();
}


function loop(){
ctx.clearRect(0,0,W,H);
if(Math.random() < 0.25) hearts.push(new Heart());
for(let i=hearts.length-1;i>=0;i--){
hearts[i].update(i);
hearts[i].draw();
}
requestAnimationFrame(loop);
}
loop();


// pequenas melhorias: se o usuário veio pelo WhatsApp ou pela loja, você pode passar um param 'message' para texto custom
const customMsg = params.get('message');
if(customMsg){ messageEl.textContent = decodeURIComponent(customMsg); }


})();   