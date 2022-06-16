import React from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {black, green, white} from '../constants/colors';
import {IContact} from '../interfaces/contacts';
import IEntypo from 'react-native-vector-icons/Entypo';
import {profile} from '../constants/images';

type Style = {
  container: ViewStyle;
  nameCodeContainer: ImageStyle;
  infoContainer: ViewStyle;
  name: TextStyle;
  phone: TextStyle;
  selectionContainer: ViewStyle;
  row: ViewStyle;
};

interface IProps {
  contact: IContact;
  onClick: () => void;
}

const truncate = (name: string, maxLength: number) => {
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...';
  } else {
    return name;
  }
};

const Contact = ({contact, onClick}: IProps) => {
  return (
    <Pressable onPress={onClick} style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.nameCodeContainer} source={profile} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{truncate(contact.name, 12)}</Text>
          <Text style={styles.phone}>
            {contact.number ? contact.number : 'Phone number not exist'}
          </Text>
        </View>
      </View>
      {contact.selected && (
        <View style={styles.selectionContainer}>
          <IEntypo name="check" size={16} color={white} />
        </View>
      )}
    </Pressable>
  );
};

export default Contact;

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
  },
  nameCodeContainer: {
    width: 57,
    height: 57,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  name: {
    color: black,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'left',
  },
  phone: {
    color: black,
    fontWeight: '300',
    fontSize: 14,
    textAlign: 'left',
  },
  infoContainer: {
    width: 280,
    justifyContent: 'center',
    marginLeft: 12,
  },
  selectionContainer: {
    width: 25,
    height: 25,
    backgroundColor: green,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
