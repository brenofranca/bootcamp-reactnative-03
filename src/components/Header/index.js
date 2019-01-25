import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import styles from './styles';

const Header = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
