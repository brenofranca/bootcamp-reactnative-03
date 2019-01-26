import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },
  content: {
    padding: metrics.basePadding,
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  listItemContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius + 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: metrics.baseMargin,
    paddingHorizontal: metrics.basePadding - 5,
    paddingVertical: metrics.basePadding / 2,
  },
  listItemImage: {
    borderRadius: 40 / 2,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  listItemImageContainer: {},
  listItemLogin: {
    color: colors.regular,
    fontSize: 11,
    marginTop: 2,
  },
  listItemOwnerContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingRight: metrics.basePadding,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
