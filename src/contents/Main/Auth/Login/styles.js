import {StyleSheet} from 'react-native';
import * as colors from '@colors';
import AppView from '@utils/appView';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header_imgae: {
    width: AppView.bodyWidth - 50,
    height: 300,
    alignSelf: 'center',
    // marginLeft: 30,
    marginTop: 60,
    marginBottom: 30,
  },
  titleView: {
    alignSelf: 'center',
    top: -90,
  },
  titleTxt: {
    fontWeight: 'bold',
    color: colors.colorFF3152,
    fontSize: 20,
  },
  inputView: {
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    borderColor: colors.border,
    paddingHorizontal: 15,
  },
  contentView: {
    paddingHorizontal: 20,
    top: -30,
  },
  mgT30: {
    marginTop: 30,
  },
  forgotPass: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    width: AppView.bodyWidth,
    top: -10,
  },
  btnView: {
    width: AppView.bodyWidth,
    height: 50,
    alignSelf: 'center',
    backgroundColor: colors.colorFF3152,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSignIn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    color: colors.text,
  },
  bgBtnView: {
    top: 50,
  },
  errorTxt: {
    marginTop: 10,
  },
});
