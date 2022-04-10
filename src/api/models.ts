import { DeviceTypes } from '../constants/DeviceTypes';

//auth
export interface NewAccount {
  phone: string;
  first_name: string;
  last_name: string;
  national_code: string;
  code: string;
}

export interface Account {
  privateKey: string;
  token: string;
}

export interface VerifyPhone {
  phone: string;
}
export interface VerifyCode {
  phone: string;
  code: string;
}
export interface VerifiedAccount {
  isRegistered: boolean;
  token: string;
  privateKey: string;
}
//token
export interface GetPk {
  privateKey: string;
}
//user
export interface AllUsers {
  users: string[];
}
export interface NewUser {
  first_name: string;
  last_name: string;
  national_code: string;
  phone: string;
  role: string;
}
export interface ShowUser {
  id: number;
}
export interface ShownUser {
  result: string[];
}
export interface UpdateUser {
  id: number;
  name: string;
  role: string;
  password: string;
  old_password: string;
}
export interface UpdatedUser {
  user: string[];
}
//device serial
export interface ShowDeviceSerial {
  id: string;
}
export interface ShownDeviceSerial {
  result: string[];
}
export interface ReplaceDevice {
  old: string;
  serial: string;
}
export interface ReplacedDevice {
  device: string;
}
//device
export interface AllDevices {
  user_id: number;
}
export interface Devices {
  utils: string;
}
export interface NewDevice {
  name: string;
  type: number;
  owner: number;
}
export interface CreatedDevice {
  response: string[];
}
export interface UpdateDevice {
  id: number;
  enabled?: number;
  name: string;
}
export interface UpdatedDevice {
  device: string[];
}
export interface DestroyDevice {
  id: number;
}
export interface ShowDevice {
  id: number;
}
export interface ShownDevice {
  id: number;
  name: string;
  secret: string;
  enabled: number;
  created_at: string;
  updated_at: string;
  serial: string;
  owner: {
    id: 1;
    first_name: string;
    last_name: string;
    name: string;
    national_code: string;
    phone: string;
    active: string;
    birthday: string;
    address: string;
    email: string;
    role: 'regular' | 'admin';
    privatekey: string;
    created_at: string;
    updated_at: string;
  };
  type: {
    id: number;
    name: string;
    version: string;
    manufacturer: string;
    provider: string;
    description: string;
    properties: [
      {
        id: number;
        namespace: string;
        name: string;
        description: string;
        type: string;
        method: string;
      },
    ];
  };
}
export interface FindDeviceId {
  serial: string;
}

export interface GetDeviceInfo {
  serial: string;
}
export interface GetDeviceInfoResponse {
  id: string;
  name: string;
  type: Type;
  secret: string;
}
export interface FoundDeviceId {
  id: string;
  name: string;
  secret: string;
  enabled: number;
  serial: string;
}
export interface Checkowner {
  id: string;
}
export interface CheckedOwner {
  link_hash: string;
  message: string;
}
export interface TransferOwner {
  device_id: string;
}
export interface TransferedOwner {
  message: string;
}
export interface VerifyTransfer {
  verify_token: string;
  device_id: string;
  device_name?: string;
}
export interface VerifiedTransfer {
  message: string;
}
//deviceType
export interface AllDevicesType {
  utils: string[];
}
export interface NewDeviceType {
  name: string;
  version: string;
  manufacturer: string;
  provider: string;
  description: string;
  user_id: number;
  properties: string;
}
export interface DeviceType {
  device_type: string[];
}
export interface ShowDeviceType {
  id: number;
}
export interface ShownDeviceType {
  result: string[];
}
export interface UpdateDeviceType {
  id: number;
  description: string;
}
export interface UpdatedDeviceType {
  deviceType: string[];
}
export interface DestroyDeviceType {
  id: number;
}

export interface DeviceListNode {
  id: number;
  name: string;
  secret: string;
  enabled: number;
  created_at: string;
  updated_at: string;
  serial?: string;
  owner?: Owner;
  type: Type;
  sharing: ShownUser[];
}

export interface Owner {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  national_code: string;
  phone: string;
  active: string;
  birthday: string;
  address: string;
  email: string;
  role: 'regular' | 'admin';
  privatekey: string;
}

export interface DeviceRole {
  id: number;
  value: string;
  access: 'write' | 'read';
  client_id: number;
}

export interface Page<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
}

export interface RequestSharedDevice {
  phone: string;
  device_id: string;
}

export interface ValidateSharedDevice {
  phone: string;
  code: string;
  device_id: string;
}
export interface SharedDevice {
  id: number;
  parent: User;
  device: Devices;
  user: User;
}

export interface Devices {
  id: number;
  name: string;
  secret: string;
  enabled: boolean;
  owner_id: number;
  serial: string;
  mac_address: string;
}

export interface DevicesPage {
  current_page: number;
  data: DeviceListNode[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
}

export interface Properties {
  id: number;
  namespace: string;
  name: string;
  description: string;
  type: 'output' | 'input';
  method: string;
}

export interface Device {
  id: number;
  name: string;
  secret: string;
  enabled: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  serial: string;
  owner: Owner;
  client_id: number;
  roles: DeviceRole[];
  type: Type;
}

export interface Type {
  id: number;
  name: DeviceTypes;
  version: string;
  manufacturer: string;
  provider: string;
  description: string;
  properties: Properties[];
}

export interface Topic {
  topic: string;
  signature: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  name: null;
  national_code: string;
  phone: string;
  active: null;
  birthday: null;
  address: null;
  email: null;
  role: 'admin' | 'regular';
  privatekey: string;
  client_id: number;
}

export interface PublicDeviceInfo {
  id: string;
  name: string;
  type: Type;
  secret: string;
}
