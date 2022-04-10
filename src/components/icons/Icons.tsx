import React from 'react';
import Back from './Back';
import Camera from './Camera';
import Drawer from './Drawer';
import ECO from './ECO';
import Failed from './Failed';
import Flash from './Flash';
import Flesh from './Flesh';
import Freezer from './Freezer';
import Fridge from './Fridge';
import Hamberger from './Hamberger';
import IceMaker from './IceMaker';
import Lock from './Lock';
import Media from './Media';
import Mute from './Mute';
import Next from './Next';
import OpenDoor from './OpenDoor';
import Play from './Play';
import Plus from './Plus';
import Power from './Power';
import Previous from './Previous';
import Refresh from './Refresh';
import Remove from './remove';
import SuperFrost from './SuperFrost';
import TempratureDown from './TempratureDown';
import TempratureUp from './TempratureUp';
import VoltageProtector from './VoltageProtector';
import VolumeDown from './VolumeDown';
import VolumeUp from './VolumeUp';

interface Props {
  size?: number;
  color: string;
  name: string;
}

export type IconProps = Props;
const Icon: React.FC<IconProps> = ({ size = 32, ...props }) => {
  var icon = null;

  switch (props.name) {
    case 'eco': {
      icon = <ECO size={size} color={props.color} />;
      break;
    }
    case 'flash': {
      icon = <Flash size={size} color={props.color} />;
      break;
    }
    case 'freezer': {
      icon = <Freezer size={size} color={props.color} />;
      break;
    }
    case 'fridge': {
      icon = <Fridge size={size} color={props.color} />;
      break;
    }
    case 'lock': {
      icon = <Lock size={size} color={props.color} />;
      break;
    }
    case 'media': {
      icon = <Media size={size} color={props.color} />;
      break;
    }
    case 'mute': {
      icon = <Mute size={size} color={props.color} />;
      break;
    }
    case 'next': {
      icon = <Next size={size} color={props.color} />;
      break;
    }
    case 'opendoor': {
      icon = <OpenDoor size={size} color={props.color} />;
      break;
    }
    case 'play': {
      icon = <Play size={size} color={props.color} />;
      break;
    }
    case 'power': {
      icon = <Power size={size} color={props.color} />;
      break;
    }
    case 'previous': {
      icon = <Previous size={size} color={props.color} />;
      break;
    }
    case 'superfrost': {
      icon = <SuperFrost size={size} color={props.color} />;
      break;
    }
    case 'tempraturedown': {
      icon = <TempratureDown size={size} color={props.color} />;
      break;
    }
    case 'tempratureup': {
      icon = <TempratureUp size={size} color={props.color} />;
      break;
    }
    case 'voltageprotector': {
      icon = <VoltageProtector size={size} color={props.color} />;
      break;
    }
    case 'volumedown': {
      icon = <VolumeDown size={size} color={props.color} />;
      break;
    }
    case 'volumeup': {
      icon = <VolumeUp size={size} color={props.color} />;
      break;
    }
    case 'hamberger': {
      icon = <Hamberger size={size} color={props.color} />;
      break;
    }
    case 'drawer': {
      icon = <Drawer size={size} color={props.color} />;
      break;
    }
    case 'flesh': {
      icon = <Flesh size={size} color={props.color} />;
      break;
    }
    case 'plus': {
      icon = <Plus size={size} color={props.color} />;
      break;
    }
    case 'back': {
      icon = <Back size={size} color={props.color} />;
      break;
    }
    case 'image': {
      icon = <Camera size={size} color={props.color} />;
      break;
    }
    case 'icemaker': {
      icon = <IceMaker size={size} color={props.color} />;
      break;
    }
    case 'remove': {
      icon = <Remove size={size} color={props.color} />;
      break;
    }
    case 'refresh': {
      icon = <Refresh size={size} color={props.color} />;
      break;
    }
    case 'failed': {
      icon = <Failed size={size} color={props.color} />;
      break;
    }
  }

  return icon;
};

export default Icon;
