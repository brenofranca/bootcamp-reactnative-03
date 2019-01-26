import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Header extends Component {
  static defaultTypes = {
    backward: '',
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  onBackwardPage = () => {
    const { backward, navigation } = this.props;

    navigation.navigate(backward);
  }

  render() {
    const {
      title, backward, navigation,
    } = this.props;

    return (
      <View style={styles.container}>
        {!backward ? <View style={styles.left} /> : (
          <TouchableOpacity onPress={this.onBackwardPage}>
            <Icon name="chevron-left" size={14} style={styles.icon} />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{title}</Text>

        <View style={styles.right} />
      </View>
    );
  }
}

export default withNavigation(Header);
