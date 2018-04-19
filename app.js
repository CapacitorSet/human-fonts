const humanLines = require("humanlines");
const opentype = require("opentype.js");

// generate a pencil-like texture... (optional)
const texture = humanLines.generatePencilTexture();

const canvas = document.getElementById("area");
const ctx = canvas.getContext("2d");
const ctx2 = canvas.getContext("2d");
const pattern = ctx.createPattern(texture, "repeat");

//ctx.strokeStyle = pattern;
ctx.lineWidth = 3;
const a = 10;
const w = 160;
ctx.clearRect(0, 0, canvas.width, canvas.height);

/*
//ctx.translate(250, 0);
humanLines.drawRect(ctx, a, a, w, w);
humanLines.drawRect(ctx, a + w/3, a + w/3, w, w);

humanLines.drawLine(ctx, a, a, a + w/3, a + w/3);
humanLines.drawLine(ctx, a, a + w, a + w/3, a + w/3 + w);
humanLines.drawLine(ctx, a + w, a, a + w/3 + w, a + w/3);
humanLines.drawLine(ctx, a + w, a + w, a + w/3 + w, a + w/3 + w);
*/

opentype.load("fonts/Bebas.ttf", (err, font) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(font);
	path = font.getPath("lorem ipsum", 0, 200, 200);
	// From path.draw() code
    ctx.beginPath();
    let curX = 0, curY = 0;
    for (let i = 0; i < path.commands.length; i += 1) {
        const cmd = path.commands[i];
        if (cmd.type === 'M') {
        	curX = cmd.x;
        	curY = cmd.y;
        	ctx.moveTo(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            humanLines.drawLine(ctx2, curX, curY, cmd.x, cmd.y);
            //ctx.lineTo(cmd.x, cmd.y);
        	curX = cmd.x;
        	curY = cmd.y;
        } else if (cmd.type === 'C') {
            //ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === 'Q') {
            //ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === 'Z') {
            //ctx.closePath();
        }
    }

    if (path.fill) {
        ctx.fillStyle = path.fill;
        ctx.fill();
    }

    if (path.stroke) {
        ctx.strokeStyle = path.stroke;
        ctx.lineWidth = path.strokeWidth;
        ctx.stroke();
    }
})