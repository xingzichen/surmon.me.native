/**
 * App main
 * @file App 骨架
 * @module app/main
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import { ViewStyle } from 'react-native'
import {
  createStackNavigator,
  NavigationComponent,
  TabBarIconProps,
  NavigationRouteConfig,
  NavigationScreenConfig,
  NavigationScreenOptions
} from 'react-navigation'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { headerStyles } from '@app/components/layout/header'
import { Home } from '@app/pages/home'
import { ArticleSearch } from '@app/pages/home/search'
import { ArticleDetail } from '@app/pages/home/detail'
import { About } from '@app/pages/about'
import { Github } from '@app/pages/about/github'
import { Setting } from '@app/pages/about/setting'
import { Guestbook } from '@app/pages/guestbook'
import { WebViewPage } from '@app/pages/common/webview'
import { EHomeRoutes, EGuestbookRoutes, EAboutRoutes } from '@app/routes'
import { LANGUAGE_KEYS } from '@app/constants/language'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'

// 公共头部样式
export function getCommonHeaderStyles() {
  const { title } = headerStyles.styles
  return {
    headerTitleStyle: title,
    headerTintColor: title.color,
    headerStyle: {
      backgroundColor: colors.primary
    }
  }
}

// 默认导航器配置
export function getDefaultNavigationOptions() {
  return () => ({ ...getCommonHeaderStyles() })
}

// 路由配置
function getNavigationRouteConfig(
  component: NavigationComponent,
  titleName: LANGUAGE_KEYS,
  options?: () => NavigationScreenConfig<NavigationScreenOptions>
): NavigationRouteConfig {
  return {
    screen: component,
    navigationOptions: () => Object.assign({
      title: i18n.t(titleName),
    }, options ? options() : null)
  }
}

// 菜单图标样式
function getTabIconStyles(options: TabBarIconProps, extendStyle?: ViewStyle) {
  const { focused, tintColor } = options
  // 激活色
  const color = focused && tintColor
    ? tintColor
    : colors.textTitle
  // 样式
  const style = {
    opacity: focused ? 1 : 0.8,
    ...extendStyle
  }
  return { style, color }
}

export const HomeStack = createStackNavigator({
  [EHomeRoutes.Home]: getNavigationRouteConfig(Home, LANGUAGE_KEYS.HOME, getCommonHeaderStyles),
  [EHomeRoutes.ArticleSearch]: ArticleSearch,
  [EHomeRoutes.ArticleDetail]: ArticleDetail,
  [EHomeRoutes.ArticleWebview]: WebViewPage
}, {
  navigationOptions({ navigation }) {
    return {
      // 非根 Home 屏都要隐藏 Tabbar（Search、Detail）
      tabBarVisible: navigation.state.index === 0,
      tabBarLabel: i18n.t(LANGUAGE_KEYS.HOME),
      tabBarIcon: options => (
        <Ionicon
          name="ios-quote"
          size={23}
          {...getTabIconStyles(options)}
        />
      )
    }
  }
})

export const GuestbookStack = createStackNavigator({
  Guestbook: getNavigationRouteConfig(Guestbook, LANGUAGE_KEYS.GUESTBOOK)
}, {
  defaultNavigationOptions: getDefaultNavigationOptions(),
  navigationOptions: () => ({
    tabBarLabel: i18n.t(LANGUAGE_KEYS.GUESTBOOK),
    tabBarIcon: options => (
      <Ionicon
        name="ios-chatboxes"
          size={19}
          {...getTabIconStyles(options, { marginBottom: 0 })}
      />
    )
  })
})

export const AboutStack = createStackNavigator({
  [EAboutRoutes.About]: getNavigationRouteConfig(About, LANGUAGE_KEYS.ABOUT),
  [EAboutRoutes.Github]: getNavigationRouteConfig(Github, LANGUAGE_KEYS.GITHUB),
  [EAboutRoutes.Setting]: getNavigationRouteConfig(Setting, LANGUAGE_KEYS.SETTING)
}, {
  defaultNavigationOptions: getDefaultNavigationOptions(),
  navigationOptions: ({ navigation }) => ({
    // 非根 About 屏都要隐藏 Tabbar（Github、Setting）
    tabBarVisible: navigation.state.index === 0,
    tabBarLabel: i18n.t(LANGUAGE_KEYS.ABOUT),
    tabBarIcon: options => (
      <Ionicon
        name="ios-paw"
          size={21}
          {...getTabIconStyles(options, { marginBottom: 0 })}
      />
    )
  })
})

export const navigatorStacks = {
  [EHomeRoutes.Home]: HomeStack,
  [EGuestbookRoutes.Guestbook]: GuestbookStack,
  [EAboutRoutes.About]: AboutStack
}

export const navigatorBaseOptions = {
  initialRouteName: EHomeRoutes.Home
}
