export default {
  svg: {
    describeArc: (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
      const polarToCartesian = (
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number,
      ) => {
        var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians),
        };
      };
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);

      var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

      var d = [
        'M',
        start.x,
        start.y,

        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,

        end.x,
        end.y,
        'L',
        x,
        y,
      ].join(' ');

      return d;
    },
    describeLine: (radius: number, count: number) => {
      var total = [];
      var sum = 0,
        preValue = 0;
      for (let i = 1; i <= 1 + (count - 1) * 0.2 + 0.1; i += 0.2) {
        sum += i;
      }
      var newAngle = 180 / sum;
      for (var i = 1; i <= 1 + (count - 1) * 0.2 + 0.1; i += 0.2) {
        preValue += i * newAngle;
        total.push({
          x: (150 - radius * Math.cos((preValue * Math.PI) / 180)).toFixed(3),
          y: (150 - radius * Math.sin((preValue * Math.PI) / 180)).toFixed(3),
          angle: preValue,
        });
      }
      return total;
    },
  },
};
