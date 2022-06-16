import React, {ReactElement} from 'react';
import {
  FlatList,
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {white, red, black} from '../constants/colors';
import {ISelectedContact} from '../interfaces/contacts';
import IAntdesign from 'react-native-vector-icons/AntDesign';
import {profile} from '../constants/images';

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
  nameCodeContainer: ImageStyle;
  itemContainer: ViewStyle;
  iconContainer: ViewStyle;
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
        <ImageBackground style={styles.nameCodeContainer} source={profile}>
          <Pressable
            onPress={() => {
              onClick(item.id);
            }}
            style={styles.iconContainer}>
            <IAntdesign name="closecircle" size={16} color={red} />
          </Pressable>
        </ImageBackground>
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
    maxHeight: 80,
    minHeight: 80,
    backgroundColor: white,
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
    color: black,
    marginTop: 4,
  },
  nameCodeContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: white,
    borderRadius: 100,
    right: -2,
    top: -2,
  },
});
