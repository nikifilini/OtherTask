import { getRoot, Instance, SnapshotIn, types } from "mobx-state-tree"
import { ColorName, ColorNames } from "../../palette/colors"
import Collection, { ICollection } from "./Collection"
import { IRootStore } from "../RootStore"
import { IconName, IconNames } from "../../palette/icons"

const CollectionColumn = types
  .model("CollectionColumn", {
    id: types.identifier,
    name: types.string,
    color: types.optional(types.enumeration("Color", ColorNames), "blue"),
    icon: types.optional(types.enumeration("Icon", IconNames), "lightning"),
    index: types.number,
    collection: types.reference(Collection)
  })
  .views(self => ({
    get syncable() {
      return true
    },
    get syncName() {
      return "CollectionColumn"
    },
    get cards() {
      const root = getRoot<IRootStore>(self)
      return root.collectionsStore.cards.filter(card => card.column === self)
    }
  }))
  .actions(self => {
    const actions: Record<string, any> = {}
    const actionsMap: Record<string, string[]> = {}

    actions.setName = (val: string) => self.name = val
    actionsMap.setName = ["name"]

    actions.setColor = (val: ColorName) => self.color = val
    actionsMap.setColor = ["color"]

    actions.setIcon = (val: IconName) => self.icon = val
    actionsMap.setIcon = ["icon"]

    actions.setIndex = (val: number) => self.index = val
    actionsMap.setIndex = ["index"]

    // @ts-ignore
    actions.setCollection = (val: string | ICollection) => self.collection = val
    actionsMap.setCollection = ["collection"]

    actions.getActionsMap = () => actionsMap
    return actions
  })

export function factory(data) {
  return data
}

export default CollectionColumn
export type ICollectionColumn = Instance<typeof CollectionColumn>
export type ICollectionColumnSnapshot = SnapshotIn<typeof CollectionColumn>