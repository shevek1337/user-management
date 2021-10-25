import { useMemo, useState } from "react"
import { IData } from "~/context/data"

enum KeyType {
  firstName = "firstName",
  role = "role",
  active = "active",
}

const useSortData = (items: IData[]) => {
  const [config, setConfig] = useState<null | {
    key: KeyType
    direction: string
  }>(null)

  const sortedItems = useMemo(() => {
    if (config != null) {
      items.sort((a, b) =>
        config.direction === "ascending"
          ? a[config.key].toString().localeCompare(b[config.key].toString())
          : b[config.key].toString().localeCompare(a[config.key].toString())
      )
    }
    return items
  }, [items, config])

  const sort = (key: KeyType) => {
    let direction = "ascending"
    config && config.direction === "ascending" && (direction = "descending")
    setConfig({ key, direction })
  }

  const classNames = (name: KeyType, className?: string) => {
    if (config?.key !== name) {
      return "disabled"
    }
    return config.key === name && config.direction === "ascending"
      ? undefined
      : className
  }

  return { items: sortedItems, sort, config, KeyType, classNames }
}

export default useSortData
