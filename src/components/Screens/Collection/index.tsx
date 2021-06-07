import React from "react"
import { observer } from "mobx-react"
import { IRootStore, useMst } from "models/RootStore"
import styles from "./styles.styl"
import Column from "./components/Column"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import CardForm from "../../CardForm"
import noop from "lodash-es/noop"
import Select, { Variant } from "../../Select"
import Button from "../../Button"
import PlusIcon from "../../../assets/line_awesome/plus-solid.svg"

const Collection = observer(() => {
  const { collectionsStore: { collections, selectCollection, selectedCollection, moveColumn, moveCard, editingCard, createColumn } }: IRootStore = useMst()

  if (!selectedCollection) {
    selectCollection([...collections][0].id)
    return <div />
  }

  const columns = [...selectedCollection.columns]
  columns.sort((a,b) => a.index - b.index)

  const onPlusClick = () => {
    createColumn({name: "Новая колонка", collection: selectedCollection.id})
  }

  return (
    <div className={styles.screen}>
      <div className={styles.head}>
        <div className={styles.info}>
          <Select variants={collections.map(c => ({code: c.id, name: c.name, icon: "fire"}))}
                  selected={selectedCollection.id} select={id => selectCollection(id)} />
          <Button icon={PlusIcon} square onClick={onPlusClick} />
        </div>
      </div>
      {editingCard !== null && <CardForm cardId={editingCard.id} onDone={noop} />}
      <DragDropContext onDragEnd={({draggableId, destination, type}) => {
        if (!destination) return
        if (type === "COLUMN") {
          console.log(`moveColumn("${draggableId}", ${destination.index})`)
          moveColumn(draggableId, destination.index)
        } else {
          console.log(`moveCard("${draggableId}", "${destination.droppableId}", ${destination.index})`)
          moveCard(draggableId, destination.droppableId, destination.index)
        }
      }}>
        <Droppable droppableId={selectedCollection.id} direction={"horizontal"} type={"COLUMN"}>
          {(provided) => (
            <div
              className={styles.columns}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.map(col => (
                <Draggable draggableId={col.id} index={col.index} key={col.id}>
                  {(provided) =>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Column column={col} handleProps={provided.dragHandleProps} />
                    </div>
                  }
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
})

export default Collection
