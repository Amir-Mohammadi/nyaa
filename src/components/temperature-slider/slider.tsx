import React, { Component } from 'react';
import Svg, { Circle, Defs, G, Line, Mask, Path, Rect, Text } from 'react-native-svg';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Utils from '../Utils';

interface Props {
  color: string;
  range: [number, number];
  value: number;
  action: Function;
  animation?: boolean;
}

interface States {
  animate: boolean;
}

export type TemperatureSliderProps = Props;

class TemperatureSlider extends Component<TemperatureSliderProps, States> {
  animateTimer: NodeJS.Timeout;

  state = {
    animate: false,
  };

  componentWillUnmount() {
    clearInterval(this.animateTimer);
  }

  componentDidMount() {
    this.animateTimer = setInterval(() => {
      this.setState({ animate: !this.state.animate });
    }, 600);
  }

  renderAnimatedText() {
    let component = (
      <Text fill={Colors.success} fontSize="50" strokeWidth="0" x="145" y="140" textAnchor="middle">
        {`${this.props.value} ºC`}
      </Text>
    );

    if (this.props.animation) {
      return this.state.animate ? component : null;
    } else {
      return component;
    }
  }

  Lines = Utils.svg.describeLine(140, this.props.range[1] - this.props.range[0] + 1);
  render() {
    return (
      <Svg viewBox="0 0 300 150" height={Layout.scaleY(270)} width={Layout.scaleY(270) * 2}>
        <Defs>
          <Mask id="mask" x="0" y="0" width="300" height="140">
            <Rect x="0" y="0" width="300" height="140" fill="white" />
            <Circle cx="133" cy="150" fill="#000" stroke="" r="118" />
          </Mask>
        </Defs>
        <G>
          <Circle cx="150" cy="150" fill="#999999" r="140" mask="url(#mask)" />
          <Path
            fill={Colors.success}
            d={Utils.svg.describeArc(
              150,
              150,
              140,
              -90,
              this.Lines[this.props.value - this.props.range[0]].angle - 90,
            )}
            mask="url(#mask)"
          />

          {this.Lines.map((item, i) => {
            // XS.push(item.x);

            return (
              <Line
                key={i}
                x1={150}
                y1={150}
                x2={item.x}
                y2={item.y}
                stroke="white"
                strokeWidth={2}
                mask="url(#mask)"
              />
            );
          })}
          {this.renderAnimatedText()}
        </G>
      </Svg>
    );
  }
}
export default TemperatureSlider;
