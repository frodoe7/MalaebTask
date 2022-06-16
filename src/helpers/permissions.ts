import {PermissionsAndroid} from 'react-native';

export const readPhoneBookPermission = (): Promise<boolean> => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept accessing your phone book',
    },
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
