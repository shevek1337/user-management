import { useCallback, useMemo, useState } from "react"

interface IDropdown {
  readonly isSelected: readonly number[]
  readonly toggleDropdown: (index: number) => void
}

const useDropdown = (): IDropdown => {
  const [isSelected, setIsSelected] = useState<number[]>([])

  const toggleDropdown = useCallback(
    (index: number) => {
      if (isSelected.includes(index)) {
        setIsSelected(isSelected.filter((el) => el !== index))
      } else {
        setIsSelected([index, ...isSelected])
      }
    },
    [isSelected]
  )

  const value = useMemo(
    () => ({ isSelected, toggleDropdown }),
    [isSelected, toggleDropdown]
  )

  return value
}

export default useDropdown
