const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [2048, 2048]
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const createGrid = () => {
    const points = [];
    const count = 6;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = 0.001;

        points.push({
          color: random.pick(palette),
          radius,
          rotation: 1,
          position: [u, v]
        });
      }
    }
    return points;
  };

  // random.setSeed(1);
  const points = createGrid();
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "orange";
    context.lineTo(1648, 1148.8);
    context.lineTo(1148.8, 1398.4);
    context.lineTo(1148.8, height - margin);
    context.lineTo(1648, height - margin);
    context.closePath();
    context.stroke();
    context.fillStyle = "red";
    context.fill();

    points.forEach(data => {
      const { position, radius, color, rotation } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);

      console.log(x, y);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = "white";
      context.fill();

      // context.save();
      // context.fillStyle = color;
      // context.font = `${radius * width}px "Helvetica"`;
      // context.translate(x, y);
      // context.rotate(rotation);
      // context.scale(3, 0.5);
      // context.fillText("-", 0, 0);

      // context.restore();
    });
  };
};

canvasSketch(sketch, settings);
