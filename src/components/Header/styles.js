import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 54 + getStatusBarHeight(),
    justifyContent: 'center',
    paddingHorizontal: metrics.basePadding,
    paddingTop: getStatusBarHeight(),
  },
  title: {
    color: colors.darker,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
