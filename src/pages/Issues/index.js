import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~/services/api';

import { colors } from '~/styles';

import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

import Header from '~/components/Header';

import styles from './styles';

class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    data: [],
    error: '',
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.fetchIssues();
  }

  fetchIssues = async () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    try {
      const { data } = await api.get(`/repositories/${id}/issues`);

      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error: 'O usuário não possui issues!' });
    } finally {
      this.setState({ loading: false });
    }
  };

  onRedirectToIssue = ({ url }) => {
    Linking.openURL(url);
  }

  renderListItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemImageContainer}>
        <Image
          source={{ uri: item.user.avatar_url }}
          style={styles.listItemImage}
        />
      </View>
      <View style={styles.listItemOwnerContainer}>
        <Text style={styles.listItemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.listItemLogin}>{item.user.login}</Text>
      </View>
      <TouchableOpacity onPress={() => this.onRedirectToIssue(item)} style={styles.buttonShow}>
        <Text style={styles.buttonText}>
          <Icon name="angle-right" size={20} color={colors.regular} />
        </Text>
      </TouchableOpacity>
    </View>
  );

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        refreshing={refreshing}
        onRefresh={this.fetchIssues}
      />
    );
  };

  render() {
    const { loading, error } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Issues" backward="Home" />

        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.content} loading={!!loading}>
            {this.renderList()}
          </View>
        )}
      </View>
    );
  }
}

export default Issues;
