import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import Flag from 'react-native-flags';
import {Icon} from 'react-native-elements';
import _ from 'lodash';

import {CheckListItem, Partition} from '../../components/common';
import {withCapitalLetter} from '../../helpers/StringHelpers';
// import {setAppLanguage} from '../../action/data/AppConfigActions';
import i18n from '../../translations';
// import HeaderTitle from '../../component/HeaderTitle';

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#e4e3f1',
    height: '100%',
  },
  listItemContainer: {
    paddingVertical: 10,
  },
});

const english = {
  name: 'english',
  ISO6391: 'en',
  props: {
    key: 'english',
    icon: <Flag code="GB" size={32} />,
    subtitle: 'English',
    containerStyle: styles.listItemContainer,
  },
};

const latvian = {
  name: 'latvian',
  ISO6391: 'lv',
  props: {
    key: 'latvian',
    icon: <Flag code="LV" size={32} />,
    containerStyle: styles.listItemContainer,
    subtitle: 'Latviešu',
  },
};

const russian = {
  name: 'russian',
  ISO6391: 'ru',
  props: {
    key: 'russian',
    icon: <Flag code="RU" size={32} />,
    containerStyle: styles.listItemContainer,
    subtitle: 'Русский',
  },
};
const keyExtractor = (item, index) => item.ISO6391;

const checkBoxProps = {
  checkedIcon: <Icon color="#144774" name="check-square" type="feather" />,
  uncheckedIcon: <Icon color="#EDEEF1" name="square" type="feather" />,
  iconColor: 'red',
};

const renderItem = ({item}) => {
  const {name, props, ISO6391} = item;
  const {lang} = props;
  const checked = _.isEqual(ISO6391, lang);
  return (
    <CheckListItem
      checked={checked}
      name={withCapitalLetter(i18n.t(name))}
      props={props}
      checkProps={checkBoxProps}
      onPress={() => this.onLanguageClick(ISO6391)}
    />
    // <Text>{withCapitalLetter(i18n.t(name))}</Text>
  );
};

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const LanguageScreen = props => {
  const languagesList = [english, latvian, russian];
  return (
    <View>
      <Partition height={25} color={'#e4e3f1'} />
      <FlatList
        keyExtractor={keyExtractor}
        data={languagesList}
        renderItem={renderItem}
        // renderItem={({item}) => <Item title={item.name} />}
        style={styles.flatList}
      />
    </View>
  );
};

export default connect()(LanguageScreen);
