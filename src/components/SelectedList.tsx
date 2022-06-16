import React, {ReactElement} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {white, secondColor} from '../constants/colors';
import {ISelectedContact} from '../interfaces/contacts';
import IAntdesign from 'react-native-vector-icons/AntDesign';

interface IProps {
  contacts: ISelectedContact[];
  onClick: (id: number) => void;
}

interface IItem {
  item: ISelectedContact;
  index: number;
}

type Style = {
  container: ViewStyle;
  name: TextStyle;
  nameCodeContainer: ViewStyle;
  itemContainer: ViewStyle;
  icon: TextStyle;
};

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

const SelectedList = ({contacts, onClick}: IProps) => {
  const renderItem = ({item}: IItem): ReactElement => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.nameCodeContainer}>
          <Text>{nameCode(item.name)}</Text>
          <IAntdesign
            onPress={() => {
              onClick(item.id);
            }}
            style={styles.icon}
            name="closecircle"
            size={16}
            color={white}
          />
        </View>
        <Text style={styles.name}>{truncate(item.name, 12)}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={contacts}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default SelectedList;

const styles = StyleSheet.create<Style>({
  container: {
    width: '100%',
    marginVertical: 4,
    minHeight: 80,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    color: secondColor,
    marginTop: 4,
  },
  nameCodeContainer: {
    backgroundColor: secondColor,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
