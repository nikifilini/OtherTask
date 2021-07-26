import classNames from "classnames"
import styles from "./styles.styl"
import React from "react"
import NextIcon from "assets/customIcons/next.svg"
import PencilIcon from "assets/customIcons/pencil.svg"
import TrashIcon from "assets/customIcons/trash.svg"
import PlusIcon from "assets/customIcons/plus.svg"
import DoneIcon from "assets/customIcons/done.svg"

export const ActionMove = () => {
  return (
    <div className={classNames(styles.action, styles.move)}>
      <NextIcon />
    </div>
  )
}

export const ActionEdit = () => {
  return (
    <div className={classNames(styles.action, styles.edit)}>
      <PencilIcon />
    </div>
  )
}

export const ActionDelete = () => {
  return (
    <div className={classNames(styles.action, styles.delete)}>
      <TrashIcon />
    </div>
  )
}

export const ActionComplete = () => {
  return (
    <div className={classNames(styles.action, styles.complete)}>
      <DoneIcon />
    </div>
  )
}

export const ActionCreate = () => {
  return (
    <div className={classNames(styles.action, styles.create)}>
      <PlusIcon />
    </div>
  )
}
