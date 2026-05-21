import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageTokensService {

  static readonly AUTH_TOKEN: string = 'AUTH_TOKEN'
  static readonly AUTH_REMEMBER_ME: string = 'AUTH_REMEMBER_ME'

  static readonly DEFAULT_ATTRIBUTE = 'defaultAttribute'
  static readonly DATA_BODY_IMAGE = 'data-body-image'
  static readonly DATA_BS_THEME = 'data-bs-theme'
  static readonly DATA_LAYOUT = 'data-layout'
  static readonly DATA_LAYOUT_POSITION = 'data-layout-position'
  static readonly DATA_LAYOUT_STYLE = 'data-layout-style'
  static readonly DATA_LAYOUT_WIDTH = 'data-layout-width'
  static readonly DATA_PRELOADER = 'data-preloader'
  static readonly DATA_SIDEBAR = 'data-sidebar'
  static readonly DATA_SIDEBAR_IMAGE = 'data-sidebar-image'
  static readonly DATA_SIDEBAR_SIZE = 'data-sidebar-size'
  static readonly DATA_SIDEBAR_VISIBILITY = 'data-sidebar-visibility'
  static readonly DATA_THEME = 'data-theme'
  static readonly DATA_THEME_COLORS = 'data-theme-colors'
  static readonly DATA_TOPBAR = 'data-topbar'

  constructor() { }
}
