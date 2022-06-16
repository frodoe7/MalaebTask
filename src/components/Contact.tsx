import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {backgroundColor, secondColor} from '../constants/colors';
import {IContact} from '../interfaces/contacts';
import IEntypo from 'react-native-vector-icons/Entypo';

type Style = {
  container: ViewStyle;
  nameCodeContainer: ViewStyle;
  infoContainer: ViewStyle;
  name: TextStyle;
  phone: TextStyle;
  selectionContainer: ViewStyle;
};

interface IProps {
  contact: IContact;
  onClick: () => void;
}

const nameCode = (name: string): string => {
  let nameParts: string[] = name.split(' ');
  if (nameParts.length === 1) {
    return nameParts[0][0];
  } else {
    return nameParts[0][0] + nameParts[1][0];
  }
};

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
      <View style={styles.nameCodeContainer}>
        <Text>{nameCode(contact.name)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{truncate(contact.name, 12)}</Text>
        <Text style={styles.phone}>
          {contact.number ? contact.number : 'Phone number not exist'}
        </Text>
      </View>
      <View style={styles.selectionContainer}>
        {contact.selected && (
          <IEntypo name="check" size={24} color={backgroundColor} />
        )}
      </View>
    </Pressable>
  );
};

export default Contact;

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    width: '94%',
    paddingVertical: 4,
    borderTopColor: secondColor,
    borderTopWidth: 1,
    marginHorizontal: 12,
    marginTop: -1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameCodeContainer: {
    backgroundColor: secondColor,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  name: {
    color: secondColor,
    fontWeight: 'bold',
  },
  phone: {
    color: secondColor,
    fontWeight: '300',
  },
  infoContainer: {
    width: 280,
  },
  selectionContainer: {
    width: 36,
    height: 36,
    backgroundColor: secondColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
