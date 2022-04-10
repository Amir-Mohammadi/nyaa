import React from 'react';
import { View } from 'react-native';
import Svg, { Circle as ReactCircle, G, Line, Path, Text } from 'react-native-svg';
import Colors from '../constants/Colors';
import { FontSize } from '../constants/Fonts';
import Layout from '../constants/Layout';
import Icon from './icons/Icons';
import Logo from './Logo';

interface Props {
  buttons: {
    text: string;
    icon: string;
    toggle?: boolean;
    onPress?: Function;
    isFocused?: boolean;
  }[];
  width: number;
  dock: 'up' | 'button';
  middleButtonAction?: Function;
  middleButtonToggle?: boolean;
  selectedIndex?: number;
  changeStatus?: Function;
}

export type SemiCircleMenuProps = Props;
class SemiCircleMenu extends React.Component<SemiCircleMenuProps> {
  width = 523.87;
  height = 262.18;
  linePositions = [{ ax: 0, ay: 0, bx: 0, by: 0 }];
  countOfButtons = this.props.buttons.length;
  slice = 180 / this.countOfButtons;
  unit = 180 / this.countOfButtons;
  AngleOfIcons: number[] = [];
  temp = 130.9675 * (this.unit / 57);
  size = this.temp > 40 ? 40 : this.temp;
  x = 261.935 - this.size / 4;
  y = 25;

  render() {
    this.width = 523.87;
    this.height = 262.18;
    this.linePositions = [{ ax: 0, ay: 0, bx: 0, by: 0 }];
    this.countOfButtons = this.props.buttons.length;
    this.slice = 180 / this.countOfButtons;
    this.unit = 180 / this.countOfButtons;
    this.AngleOfIcons = [];
    this.temp = 130.9675 * (this.unit / 57);
    this.size = this.temp > 40 ? 40 : this.temp;
    this.x = 261.935 - this.size / 4;
    this.y = 25;

    const creatLinePositions = () => {
      for (var i = this.slice; i < 180; i += this.slice) {
        var x1 = +(261.935 - 130.9675 * Math.cos((i * Math.PI) / 180)).toFixed(4);
        var y1 = +(262.18 - 130.9675 * Math.sin((i * Math.PI) / 180)).toFixed(4);
        var x2 = +(261.935 - 261.935 * Math.cos((i * Math.PI) / 180)).toFixed(4);
        var y2 = +(262.18 - 261.935 * Math.sin((i * Math.PI) / 180)).toFixed(4);

        this.linePositions.push({ ax: x1, ay: y1, bx: x2, by: y2 });
      }
      this.linePositions = this.linePositions.filter(function (el) {
        return el != null;
      });
    };
    creatLinePositions();

    const creatButtonAngles = () => {
      if (this.countOfButtons % 2 == 0) {
        var temp = this.unit / 2;
        var tempArr: number[] = [];
        tempArr.push(temp);
        for (i = 0; i < this.countOfButtons / 2 - 1; i += 1) {
          temp += this.unit;
          tempArr.push(temp);
        }
        this.AngleOfIcons = tempArr.reverse();
        tempArr.forEach((element) => {
          this.AngleOfIcons.push(element * -1);
        });
      } else {
        var temp = 0;
        var tempArr: number[] = [];
        for (var i = 0; i < this.countOfButtons / 2 - 1; i += 1) {
          temp += this.unit;
          tempArr.push(temp);
        }
        this.AngleOfIcons = tempArr.reverse();
        tempArr.forEach((element) => {
          this.AngleOfIcons.push(element * -1);
        });
        this.AngleOfIcons.push(0);
      }
      this.AngleOfIcons = this.AngleOfIcons.sort(function (a, b) {
        return a - b;
      }).reverse();
    };
    creatButtonAngles();

    const describeArc = (
      x: number,
      y: number,
      radius: number,
      spread: number,
      startAngle: number,
      endAngle: number,
    ) => {
      var innerStart = polarToCartesian(x, y, radius, endAngle);
      var innerEnd = polarToCartesian(x, y, radius, startAngle);
      var outerStart = polarToCartesian(x, y, radius + spread, endAngle);
      var outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

      var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

      var d = [
        'M',
        outerStart.x,
        outerStart.y,
        'A',
        radius + spread,
        radius + spread,
        0,
        largeArcFlag,
        0,
        outerEnd.x,
        outerEnd.y,
        'L',
        innerEnd.x,
        innerEnd.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        1,
        innerStart.x,
        innerStart.y,
        'L',
        outerStart.x,
        outerStart.y,
        'Z',
      ].join(' ');

      return d;
    };

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

    const wrapsTheText = (
      text: string,
      rotate: number,
      positionY: number,
      originX: number,
      originY: number,
      color: string,
    ) => {
      const lineSize = 30;
      const fontSize = FontSize.medium;
      const x = this.width / 2;
      const textAnchor = 'middle';
      const transform = `rotate(${rotate} ${originX} ${originY})`;

      if (text.split(' ').length < 2) {
        return (
          <Text
            fontSize={fontSize}
            transform={transform}
            x={x}
            y={positionY}
            textAnchor={textAnchor}
            fill={color}>
            {text}
          </Text>
        );
      } else {
        return (
          <>
            <Text
              fontSize={fontSize}
              transform={transform}
              x={x}
              y={positionY}
              textAnchor={textAnchor}
              fill={color}>
              {text.split(' ')[0]}
            </Text>
            <Text
              fontSize={fontSize}
              transform={transform}
              x={x}
              y={positionY + lineSize}
              textAnchor={textAnchor}
              fill={color}>
              {text.split(' ').slice(1).join(' ')}
            </Text>
          </>
        );
      }
    };

    const creatButtonMenu = () => {
      return (
        <>
          <Svg
            viewBox="0 0 523.87 262.18"
            height={this.props.width * (this.height / this.width)}
            width={this.props.width}>
            <ReactCircle cx={this.width / 2} cy={this.height} r={this.width / 2} fill="#ccc" />
            <ReactCircle cx={this.width / 2} cy={this.height} r={this.width / 4} fill="#00a99d" />
            {this.AngleOfIcons
              ? this.AngleOfIcons.map((element, i) => (
                  <G
                    onPressIn={() => {
                      this.props.changeStatus!(i);
                    }}
                    key={i + '-jjuyjy'}>
                    <Path
                      key={i + '-dsfdsf'}
                      d={describeArc(
                        this.width / 2,
                        this.height,
                        this.width / 4,
                        this.width / 4,
                        element - this.unit / 2,
                        element + this.unit / 2,
                      )}
                      fill={this.props.buttons[i].toggle ? Colors.success : '#ccc'}
                    />
                    <G
                      transform={`rotate(${element} ${this.size / 2} ${this.width / 2 - this.y})`}
                      x={this.x - this.size / 4}
                      y={this.y}>
                      <Icon
                        size={this.size}
                        color={this.props.buttons[i].toggle ? 'white' : 'gray'}
                        name={this.props.buttons[i].icon}
                      />
                    </G>
                    {wrapsTheText(
                      this.props.buttons[i].text,
                      element,
                      this.y + 70,
                      this.width / 2,
                      this.width / 2,
                      this.props.buttons[i].toggle ? 'white' : 'gray',
                    )}
                  </G>
                ))
              : null}

            <ReactCircle
              onPressIn={() => this.props.middleButtonAction!()}
              cx={this.width / 2}
              cy={this.height}
              r={this.width / 4}
              stroke="gray"
              strokeWidth="0.5"
              fill={this.props.middleButtonToggle ? Colors.primary : '#ccc'}
            />

            <G
              x={this.width / 2 - (this.size * 1.5) / 2}
              y={this.height - this.width / 4 / 2 - (this.size * 1.5) / 2}>
              <Icon name="power" size={this.size * 1.5} color="white" />
            </G>

            {this.linePositions
              ? this.linePositions.map((item, i) => (
                  <Line
                    key={i + '-dftdtdfg'}
                    x1={item.ax}
                    y1={item.ay}
                    x2={item.bx}
                    y2={item.by}
                    stroke="#999"
                    strokeWidth={0.5}
                  />
                ))
              : null}
          </Svg>
        </>
      );
    };

    const creatUpMenu = () => {
      return (
        <>
          <Svg
            viewBox="0 0 523.87 262.18"
            height={this.props.width * (this.height / this.width)}
            width={this.props.width}>
            <ReactCircle cx={this.width / 2} cy="0" r={this.height} fill="#ccc" />
            <ReactCircle
              cx={this.width / 2}
              cy="0"
              r={this.width / 4}
              fill="#ccc"
              stroke="#999"
              strokeWidth={0.5}
            />
            {this.linePositions
              ? this.linePositions.map((item, i) => (
                  <Line
                    key={i + '-line'}
                    x1={item.ax}
                    y1={this.height - item.ay}
                    x2={item.bx}
                    y2={this.height - item.by}
                    stroke="#999"
                    strokeWidth={0.5}
                  />
                ))
              : null}

            {this.AngleOfIcons
              ? this.AngleOfIcons.map((element, i) => (
                  <G key={i + '-button2'} onPressIn={() => this.props.buttons[i].onPress!()}>
                    <Path
                      key={i + '-arch2'}
                      d={describeArc(
                        this.width / 2,
                        0,
                        this.width / 4,
                        this.width / 4,
                        180 + element - this.unit / 2,
                        180 + element + this.unit / 2,
                      )}
                      fill={this.props.buttons[i].isFocused ? Colors.primary : '#ccc'}
                    />
                    <G
                      transform={`rotate(${element} ${this.size / 2} ${-1 * (this.height - 115)})`}
                      x={this.x - this.size / 4}
                      y={this.height - 115}>
                      <Icon
                        size={this.size}
                        color={this.props.buttons[i].isFocused ? 'white' : 'gray'}
                        name={this.props.buttons[i].icon}
                      />
                    </G>
                    {wrapsTheText(
                      this.props.buttons[i].text,
                      element,
                      this.width / 2 - 40,
                      this.height,
                      0,
                      this.props.buttons[i].isFocused ? 'white' : 'gray',
                    )}
                  </G>
                ))
              : null}
            <View
              style={{
                position: 'absolute',
              }}>
              <G x={this.width / 2 - Layout.scaleX(217.61) / 2} y={this.width / 8 - 40}>
                <Logo size="sm" color="white" />
              </G>
            </View>
          </Svg>
        </>
      );
    };

    if ('button' == this.props.dock) {
      if (this.props.buttons != undefined && this.props.buttons.length > 0) {
        return creatButtonMenu();
      } else {
        return <View></View>;
      }
    } else {
      return creatUpMenu();
    }
  }
}

export default SemiCircleMenu;
