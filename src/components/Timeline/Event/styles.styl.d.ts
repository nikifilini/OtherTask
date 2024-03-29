declare namespace StylesStylNamespace {
  export interface IStylesStyl {
    allDayEvent: string
    colorVariant: string
    compact: string
    disabled: string
    duration: string
    event: string
    eventAndMenuWrapper: string
    eventMenu: string
    menuAction: string
    menuItem: string
    menuItemName: string
    menuItemValue: string
    name: string
    selected: string
    start: string
    times: string
  }
}

declare const StylesStylModule: StylesStylNamespace.IStylesStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesStylNamespace.IStylesStyl
}

export = StylesStylModule
