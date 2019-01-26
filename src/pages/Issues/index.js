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
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    data: [],
    error: '',
    filter: 'all',
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.fetchIssues();
  }

  fetchIssues = async () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id') || 80149262;

    try {
      const { data } = await api.get(`/repositories/${id}/issues`);

      this.setState({ data, loading: false });
    } catch (_err) {
      this.setState({ error: 'O usuário não possui issues!' });
    } finally {
      this.setState({ loading: false });
    }
  };

  onRedirectToIssue = ({ url }) => {
    Linking.openURL(url);
  };

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
      <TouchableOpacity
        onPress={() => this.onRedirectToIssue(item)}
        style={styles.buttonShow}
      >
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

  onFilterIssues = async (filter) => {
    this.setState({ filter, loading: true });

    const { navigation } = this.props;
    const id = navigation.getParam('id') || 80149262;

    try {
      const { data } = await api.get(
        `/repositories/${id}/issues?state=${filter}`,
      );

      this.setState({ data });
    } catch (_err) {
      this.setState({ error: 'Erro ao recuperar as Issues' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, error, filter } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Issues" backward="Home" />

        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.buttonAction}
              onPress={() => this.onFilterIssues('all')}
            >
              <Text
                style={[
                  styles.buttonActionText,
                  filter === 'all' && styles.buttonActived,
                ]}
              >
                Todas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAction}
              onPress={() => this.onFilterIssues('open')}
            >
              <Text
                style={[
                  styles.buttonActionText,
                  filter === 'open' && styles.buttonActived,
                ]}
              >
                Abertas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAction}
              onPress={() => this.onFilterIssues('closed')}
            >
              <Text
                style={[
                  styles.buttonActionText,
                  filter === 'closed' && styles.buttonActived,
                ]}
              >
                Fechadas
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" style={styles.loadingContainer} />
          ) : (
            this.renderList()
          )}
        </View>
      </View>
    );
  }
}

export default Issues;
