export const DeviceTypeProperties: DevicePropertiesType = {
  'emersun-sum-22ft': {
    buttonMenu: [
      'core.parlar.ToggleableBool.lock',
      'core.parlar.ReadonlyBool.freezer_door',
      'core.parlar.ReadonlyBool.fridge_door',
      'core.parlar.ToggleableBool.mute',
      'core.parlar.ToggleableBool.super',
      'core.parlar.ToggleableBool.eco',
    ],
    upperMenu: ['Fridge', 'Media', 'Freezer'],
  },
  'emersun-w5': {
    buttonMenu: [
      'core.parlar.ToggleableBool.lock',
      'core.parlar.ReadonlyBool.freezer_door',
      'core.parlar.ReadonlyBool.fridge_door',
      'core.parlar.ToggleableBool.super',
      'core.parlar.ToggleableBool.eco',
      'core.parlar.ToggleableBool.ice_maker',
    ],
    upperMenu: ['Fridge', 'Image', 'Freezer'],
  },
  'emersun-w4': {
    buttonMenu: [
      'core.parlar.ToggleableBool.lock',
      'core.parlar.ReadonlyBool.freezer_door',
      'core.parlar.ReadonlyBool.fridge_door',
      'core.parlar.ToggleableBool.super',
      'core.parlar.ToggleableBool.ice_maker',
    ],
    upperMenu: ['Fridge', 'Image', 'Freezer'],
  },
  'emersun-smart': {
    buttonMenu: [
      'core.parlar.ToggleableBool.lock',
      'core.parlar.ReadonlyBool.fridge_door',
      'core.parlar.ToggleableBool.mute',
      'core.parlar.ToggleableBool.super',
      'core.parlar.ToggleableBool.eco',
    ],
    upperMenu: ['Fridge', 'Media', 'Freezer'],
  },
};

export type DeviceTypes = 'emersun-sum-22ft' | 'emersun-w5' | 'emersun-w4' | 'emersun-smart';

export type DevicePropertiesType = {
  [key in DeviceTypes]: {
    buttonMenu: Array<string>;
    upperMenu: Array<DeviceUpperMenuType>;
  };
};
export type DeviceUpperMenuType = 'Fridge' | 'Media' | 'Freezer' | 'Image';
