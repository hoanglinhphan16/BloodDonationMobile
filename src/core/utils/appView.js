import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

class CAppView {
  _instance;

  constructor() {
    // ...
  }

  static get Instance() {
    if (!this._instance) {
      this._instance = new this()
    }
    return CAppView._instance
  }
  safeAreaInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  bottomNavigationBarHeight = 55;

  headerHeight = 50;

  headerPaddingHorizontal = 26;

  bodyHeight = height - this.headerHeight - this.bottomNavigationBarHeight - this.safeAreaInsets.top - this.safeAreaInsets.bottom;

  bodyPaddingHorizontal = 26;

  bodyWidth = width - 2 * this.bodyPaddingHorizontal;

  roundedBorderRadius = 8;

  itemMarginVertical = 5;

  itemMarginHorizontal = 10;

  screenWidth = width;

  screenHeight = height;

  isHorizontal = this.screenWidth > this.screenHeight;

  initSafeArea = (safeAreaInsets) => {
    const dimensions = Dimensions.get('window')
    this.safeAreaInsets = safeAreaInsets
    this.bodyHeight = dimensions.height - this.headerHeight - this.bottomNavigationBarHeight - safeAreaInsets.top - safeAreaInsets.bottom
  };
}


const AppView = CAppView.Instance
export default AppView
