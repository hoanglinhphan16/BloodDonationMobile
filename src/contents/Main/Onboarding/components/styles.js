import {StyleSheet} from 'react-native';
import * as colors from '@colors';
import AppView from '@utils/appView';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imgView: {
    width: AppView.screenWidth,
    height: AppView.screenHeight / 2,
    borderRadius: 10,
  },
  contentView: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignSelf: 'center',
    top: -100,
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  titleTxt: {
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
  bgNext: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginBottom: 22,
    padding: 10,
  },
  bgStart: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    // backgroundColor: colors.colorf5cac3,
    marginBottom: 40,
    marginRight: 20,
  },
});
