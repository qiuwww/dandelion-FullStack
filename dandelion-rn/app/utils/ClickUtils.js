/**
 * Created by chenwei on 2017/7/24.
 */

export class ClickUtils {

  //防止多次点击
  static onPress (onPress, delay = 1500) {
    return () => {
      if (onPress && (!onPress.clickTime || (new Date().getTime() - onPress.clickTime > delay))) {
        onPress.clickTime = new Date().getTime()
        if (typeof onPress === 'function') {
          onPress()
        }
      }
    }
  }
}