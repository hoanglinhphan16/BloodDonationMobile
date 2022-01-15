import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
import AppView from '@utils/appView';

import * as colors from '@colors';
import IconSource from '@icons';
import NavigationService from '@utils/navigation';

export default function HeaderPhone({
  title,
  date,
  backAction,
  rightIcon,
  rightAction,
  styleView,
  nameStatus,
  imgBack,
  hiddenBack,
  childRight,
  styleImgBack,
  subTitle,
  titleStyle,
  leftIconColor,
  leftIconComponent,
  closeIcon,
  isShowLeftIcon = true,
}) {
  const _onPressBack = () => {
    NavigationService.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        styleView,
        nameStatus ? styles.statusView : null,
      ]}>
      <StatusBar barStyle={'light-content'} />
      <TouchableOpacity
        style={[
          styles1(nameStatus).backTO,
          nameStatus ? styles.statusView : null,
        ]}
        disabled={hiddenBack}
        onPress={backAction || _onPressBack}>
        {
          hiddenBack
            ? null
            : leftIconComponent ||
              (closeIcon ? (
                <IconSource.CloseIcon
                  fill={colors.white}
                  width={14}
                  height={14}
                />
              ) : isShowLeftIcon ? (
                <IconSource.ArrowLeftIcon stroke={leftIconColor || '#000'} />
              ) : null)
          // <Image
          //   source={imgBack || ImagesSource.BackIcon}
          //   style={[styles.imgBack, styleImgBack]}
          // />
        }
      </TouchableOpacity>
      <View style={styles1(nameStatus).viewCenter}>
        <Text
          numberOfLines={2}
          bold
          fontSize={17}
          color={colors.white}
          style={[
            {
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              color: '#000000',
            },
            titleStyle,
          ]}>
          {title || ''}
        </Text>
        {subTitle && (
          <Text numberOfLines={2} bold fontSize={12} color={colors.white}>
            {subTitle || ''}
          </Text>
        )}
        {date ? <Text style={styles.txtDate}>{date}</Text> : null}
      </View>
      {childRight ? (
        childRight
      ) : (
        <TouchableOpacity
          style={[
            styles1(nameStatus).backTO,
            nameStatus ? styles.statusView : null,
          ]}
          onPress={rightAction}>
          {rightIcon ? rightIcon : null}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  imgBack: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  imgRight: {
    width: 20,
    height: 20,
  },
  txtTitle: {
    color: '#FFF',
    // fontFamily: Fonts.Bold,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  },
  txtDate: {
    textAlign: 'center',
    color: '#FFF',
    marginTop: 2,
    // fontFamily: Fonts.Bold,
    fontSize: 13,
    fontWeight: '700',
  },
  statusView: {
    height: 128,
  },
  outsideView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  txtStatus: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  txtTitleStatus: {
    marginTop: 50,
  },
  imgBackPH: {
    width: 25,
    height: 25,
  },
  showLeftIcon: {
    display: 'none',
  },
});

const styles1 = wait =>
  StyleSheet.create({
    backTO: {
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusView: {
      height: 28,
      marginTop: 4,
      marginBottom: 15,
      // backgroundColor: utils.getBGStatusColor(wait),
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtStatus: {
      // fontFamily: Fonts.Bold,
      fontSize: 12,
      // color: utils.getTextStatusColor(wait),
      marginTop: 3,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 3,
    },
  });
