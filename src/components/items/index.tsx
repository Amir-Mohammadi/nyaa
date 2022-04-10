import React from 'react';
import ExpaindableItem from './ExpaindableItem';
import InfoItem from './InfoItem';
import InfoItemWithIcon from './InfoItemWithIcon';
import InputItem from './InputItem';
import ItemWithButton from './ItemWithButton';
import ItemWithIcon from './ItemWithIcon';
import ShareItem from './ShareItem';
import SimpleItem from './SimpleItem';
interface Props {
  fontsize?: number;
  color?: string;
  name: string;
  number: string;
  disable: boolean;
  value?: string;
  info?: string;
  ButtonColor?: string;
  buttonText?: string;
  subvalue?: string;
  placeholder?: string;
  labelText?: string;
  height?: number;
  action: Function;
  onChange?: Function;
  secureTextEntry?: boolean;
  defaultValue?: string;
}

export type IconProps = Props;
const Item: React.FC<IconProps> = ({ fontsize = 32, ...props }) => {
  var item = null;

  switch (props.name) {
    case 'SimpleItem': {
      item = <SimpleItem value={props.value!} action={() => null} />;
      break;
    }
    case 'ItemWithIcon': {
      item = <ItemWithIcon value={props.value!} action={() => props.action()} />;
      break;
    }
    case 'InfoItem': {
      item = <InfoItem value={props.value!} info={props.info!} />;
      break;
    }
    case 'InfoItemWithIcon': {
      item = (
        <InfoItemWithIcon
          disable={props.disable}
          value={props.value!}
          info={props.info!}
          action={() => props.action()}
        />
      );
      break;
    }
    case 'ItemWithButton': {
      item = (
        <ItemWithButton
          value={props.value!}
          action={() => props.action()}
          buttonTextColor={props.ButtonColor!}
          buttonText={props.buttonText!}
        />
      );
      break;
    }

    case 'ExpaindableItem': {
      item = (
        <ExpaindableItem
          value={props.value!}
          action={() => props.action()}
          subvalue={props.subvalue!}
          buttonText={props.buttonText!}
        />
      );
      break;
    }
    case 'InputItem': {
      item = (
        <InputItem
          value={props.value!}
          height={props.height!}
          labelText={props.labelText!}
          placeholder={props.placeholder}
          onChange={(value: string) => props.onChange!(value)}
          secureTextEntry={props.secureTextEntry!}
          defaultValue={props.defaultValue}
        />
      );
      break;
    }
    case 'ShareItem': {
      item = <ShareItem action={() => props.action()} name={props.value!} number={props.number} />;
      break;
    }
  }

  return item;
};

export default Item;
