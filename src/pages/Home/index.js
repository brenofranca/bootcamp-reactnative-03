import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~/services/api';

import { colors } from '~/styles';

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  AsyncStorage,
} from 'react-native';

import Header from '~/components/Header';

import styles from './styles';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    repositories: [],
  };

  componentDidMount() {
    this.fetchPersistedsRepositories();
  }

  saveRepository = async (repository) => {
    const { repositories } = this.state;

    const data = [...repositories, repository];

    this.setState({ repositories: data });

    await AsyncStorage.setItem('@APP3:repositories', JSON.stringify(data));
  };

  fetchRepository = async (username) => {
    const { data } = await api.get(`/repos/${username}`);

    const user = {
      id: data.id,
      name: data.name,
      login: data.owner.login,
      avatar_url: data.owner.avatar_url,
    };

    return user;
  };

  handleAddRepository = async () => {
    const { username } = this.state;

    if (!username) return;

    this.setState({ loading: true });

    try {
      const repository = await this.fetchRepository(username);

      await this.saveRepository(repository);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ username: '', loading: false });
    }
  };

  onNavigateToIssues = ({ id }) => {
    const { navigation } = this.props;

    navigation.navigate('Issues', {
      id,
    });
  };

  async fetchPersistedsRepositories() {
    const repositories = JSON.parse(await AsyncStorage.getItem('@APP3:repositories')) || [];

    this.setState({ loading: false, repositories });
  }

  renderListItem = ({ item }) => (
    <View style={styles.repositoryContainer}>
      <Image source={{ uri: item.avatar_url }} style={styles.repositoryImage} />
      <View style={styles.repositoryOwnerContainer}>
        <Text style={styles.repositoryName}>{item.name}</Text>
        <Text style={styles.repositoryOwner}>{item.login}</Text>
      </View>
      <TouchableOpacity
        onPress={() => this.onNavigateToIssues(item)}
        style={styles.buttonShowIssues}
      >
        <Text style={styles.buttonIssuesText}>
          <Icon name="angle-right" size={20} color={colors.regular} />
        </Text>
      </TouchableOpacity>
    </View>
  );

  renderList = () => {
    const { repositories } = this.state;

    return (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
      />
    );
  };

  render() {
    const { loading, username } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Repositórios" />

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              selectionColor={colors.regular}
              placeholder="Adicionar novo repositório"
              placeholderTextColor={colors.regular}
              onChangeText={text => this.setState({ username: text })}
              value={username}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={this.handleAddRepository} style={styles.buttonAdd}>
              <Text style={styles.buttonAddText}>+</Text>
            </TouchableOpacity>
          </View>
          {loading ? <ActivityIndicator /> : this.renderList()}
        </View>
      </View>
    );
  }
}

export default Home;
