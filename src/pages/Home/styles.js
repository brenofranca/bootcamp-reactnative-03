import { StyleSheet, Platform } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  buttonAdd: {
    height: 40,
    marginLeft: metrics.baseMargin,
  },
  buttonAddText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },
  content: {
    padding: metrics.basePadding,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.light,
    borderRadius: metrics.baseRadius + 1,
    borderWidth: 1,
    color: colors.dark,
    flex: 1,
    height: 40,
    paddingHorizontal: metrics.basePadding / 2,
  },

  repositoryContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius + 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: metrics.baseMargin,
    padding: metrics.basePadding,
  },
  repositoryImage: {
    height: 40,
    marginRight: 10,
    width: 40,
  },
  repositoryName: {
    fontWeight: 'bold',
  },
  repositoryOwner: {
    color: colors.regular,
    fontSize: 11,
    marginTop: 2,
  },
  repositoryOwnerContainer: {
    flex: 1,
  },
  searchContainer: {
    borderBottomColor: colors.regular,
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    marginBottom: metrics.baseMargin,
    paddingBottom: metrics.basePadding / 2,
  },
});

export default styles;
