'use strict'

// js - plugins
import SweetScroll from 'sweet-scroll'

// js - libs
import { Utils } from './libs/utils'
import { Uac } from './libs/uac'

const utils = new Utils()
const uac = new Uac()

// console.log('fugafuga')

/**
 * sample
 */
console.log('utils.getWindowWidth: ' + utils.getWindowWidth())
console.log('utils.mq("1279", "max"): ' + utils.mq('1279', 'max'))
console.log('utils.mq("1280"): ' + utils.mq('1280'))

console.log('browser name: ' + uac.browser())
console.log('device name: ' + uac.device())
console.log('if it\'s IE: ' + uac.isIE())
console.log('if it\'s ios: ' + uac.isiOS())
console.log('if it\'s a mobile device: ' + uac.isMobile())
console.log('if it\'s a tablet device: ' + uac.isTablet())
console.log('if it\'s a touch device: ' + uac.isTouch())
console.log('if it\'s a modern browser: ' + uac.isModern())

/**
 * add classes <html>
 */
// uac.homeClass();

/**
 * 画像ロールオーバー vanilla JS
 *
 * @param none
 *
 */
function smartRollover() {
  let preLoadImg = {}
  if (document.getElementsByClassName) {
    let elm = document.getElementsByClassName('over')
    for (let i=0; i < elm.length; i++) {
      let elmSrc = elm[i].getAttribute('src')
      let sep = elmSrc.lastIndexOf('.')
      let onSrc = elmSrc.substr(0, sep) + '_on' + elmSrc.substr(sep, 4)
      preLoadImg[elmSrc] = new Image()
      preLoadImg[elmSrc].src = onSrc
      elm[i].onmouseover = (e) => {
        e.preventDefault()
        e.currentTarget.classList.add('is-hover')
        e.currentTarget.setAttribute('src', onSrc)
      }
      elm[i].onmouseout = (e) => {
        e.preventDefault()
        e.currentTarget.classList.remove('is-hover')
        e.currentTarget.setAttribute('src', elmSrc)
      }
    }// for
  }// if
}// func
window.addEventListener('load', smartRollover, false)

/**
 * sweet scroll ES6
 * @author http://webdesign-dackel.com/2015/12/17/sweet-scroll/
 * @param option
 * @param HTMLElement
 */
document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-unused-vars
  const sweetScroll = new SweetScroll({
    header: '[data-scroll-header]'
  })
}, false)

/**
 * page top btn
 *
 * @param none
 *
 */
if (document.querySelectorAll('[data-pagetop]')) {
  let btnPageTop = document.querySelectorAll('[data-pagetop]')
  for (let i = 0; i < btnPageTop.length; i++) {
    window.onscroll = () => {
      const offset = window.pageYOffset,
        value = btnPageTop[i].getAttribute('data-pagetop')
      if (offset > value) {
        btnPageTop[i].classList.add('is-active')
      } else {
        btnPageTop[i].classList.remove('is-active')
      }
    }
  }// for
}// if
