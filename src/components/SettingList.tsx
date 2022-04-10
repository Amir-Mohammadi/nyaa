import React, { Component } from 'react';
import { BackHandler, FlatList, NativeEventSubscription, View } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Button from './Button';
import Item from './items';

const prevList: Array<any> = [];
const prevTitle: Array<any> = [];

interface Props {
  list: any;
  backButtonAction: Function;
  headerOnChange: Function;
  deviceName: string;
  versionCode: string;
  deviceCode: number;
  deviceType: string;
  shareList: SharedDeviceItem[];
  updateDeviceName: Function;
  shareDeviceAvailable: boolean;
}

export type SettingListProps = Props;

export type SharedDeviceItem = {
  type: 'ShareItem';
  title: string;
  number: string;
  action: () => any;
};
export default class SettingList extends Component<SettingListProps> {
  state: {
    username?: string | undefined;
    deviceName?: string | undefined;
    list?: Error[];
  };

  constructor(props: SettingListProps) {
    super(props);
    this.state = {
      username: undefined,
      list: [],
    };
  }

  List = () => [
    {
      title: 'پروفایل',
      type: 'ItemWithIcon',
      action: () => {
        prevList.push(this.state.list);

        this.props.headerOnChange(this.List()[0].title, '', (headerTitle: string) => {
          prevTitle.push(headerTitle);
        });
        this.setState({
          list: this.List()[0].subItem,
        });
      },
      visible: true,
      subItem: [
        {
          title: 'Version Code',
          type: 'InfoItem',
          info: this.props.versionCode,
        },
        {
          title: 'نوع دستگاه',
          type: 'InfoItem',
          info: this.props.deviceType,
        },
        {
          title: 'نام دستگاه',
          type: 'InfoItem',
          info: this.props.deviceName,
        },
      ],
    },
    {
      title: 'تنظیمات اتصال',
      type: 'ItemWithIcon',
      action: () => {
        prevList.push(this.state.list);

        this.props.headerOnChange(this.List()[1].title, '', (headerTitle: string) =>
          prevTitle.push(headerTitle),
        );
        this.setState({
          list: this.List()[1].subItem,
        });
      },
      visible: true,
      subItem: [
        {
          title: this.props.deviceName,

          type: 'ItemWithButton',
          buttonText: 'Edit',
          ButtonColor: Colors.success,
          action: () => {
            prevList.push(this.state.list);
            this.props.headerOnChange(this.List()[1].title, '', (headerTitle: string) =>
              prevTitle.push(headerTitle),
            );
            this.setState({
              list: this.List()[1].subItem[0].options,
            });
          },
          visible: true,
          options: [
            {
              title: 'تغییر نام کاربری',
              type: 'ItemWithIcon',
              action: () => {
                prevList.push(this.state.list);

                this.props.headerOnChange(
                  this.List()[1].subItem[0].options[0].title,
                  '',
                  (headerTitle: string) => prevTitle.push(headerTitle),
                );
                this.setState({
                  list: this.List()[1].subItem[0].options[0].subItem,
                });
              },
              visible: this.props.shareDeviceAvailable,
              subItem: [
                {
                  labelText: 'Name',
                  type: 'InputItem',
                  title: this.state.username,
                  defaultValue: this.props.deviceName,
                  height: Layout.scaleY(75),
                  onChange: (value: string) => {
                    this.setState({
                      deviceName: value,
                    });
                  },
                  mode: 'withButton',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'نمایش خطا',
      type: 'ItemWithIcon',
      action: () => {
        prevList.push(this.state.list);

        this.props.headerOnChange(this.List()[2].title, '', (headerTitle: string) =>
          prevTitle.push(headerTitle),
        );
        this.setState({
          list: this.List()[2].subItem,
        });
      },
      subItem: this.props.list,
      visible: true,
    },
    {
      title: 'اشتراک گذاری',
      type: 'ItemWithIcon',
      action: () => {
        prevList.push(this.state.list);
        this.props.headerOnChange(this.List()[3].title, 'plus', (headerTitle: string) =>
          prevTitle.push(headerTitle),
        );
        this.setState({
          list: this.List()[3].subItem,
        });
      },
      subItem: this.props.shareList,
      visible: this.props.shareDeviceAvailable,
    },
  ];

  backButtonAction = () => {
    if (prevList.length >= 1) {
      this.props.headerOnChange(prevTitle.pop(), 'remove');
      this.setState({
        list: prevList.pop(),
      });
      return true;
    }
    this.props.backButtonAction();
    return true;
  };
  backHandler: NativeEventSubscription = null;
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backButtonAction);
    this.setState({ list: this.List() });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <FlatList
        data={this.state.list}
        renderItem={({ item, index }) => {
          return (
            <View>
              {/* @ts-ignore */}
              <Item
                // @ts-ignore
                value={item.title}
                action={() => {
                  // @ts-ignore
                  item.action();
                }}
                // @ts-ignore
                name={item.type}
                // @ts-ignore
                info={item.info || null}
                // @ts-ignore
                ButtonColor={item.ButtonColor}
                // @ts-ignore
                buttonText={item.buttonText}
                // @ts-ignore
                labelText={item.labelText}
                // @ts-ignore
                height={item.height}
                // @ts-ignore
                placeholder={item.placeholder}
                // @ts-ignore
                onChange={(value: string) => item.onChange(value)}
                // @ts-ignore
                secureTextEntry={item.secureTextEntry}
                // @ts-ignore
                subvalue={item.subvalue}
                // @ts-ignore
                defaultValue={item.defaultValue}
                // @ts-ignore
                number={item.number}
              />
              {/* @ts-ignore */}
              {item.mode === 'withButton' ? (
                <View
                  style={{
                    alignItems: 'center',
                    padding: Layout.scaleY(46),
                  }}>
                  <Button
                    title="تایید"
                    onPress={() => {
                      this.props.updateDeviceName(this.state.deviceName);
                    }}
                    height={Layout.scaleY(86)}
                    color={Colors.primary}
                    isLoading={false}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
          );
        }}
        keyExtractor={(item, index) => {
          return index + 'dtfyguhui';
        }}
      />
    );
  }
}
