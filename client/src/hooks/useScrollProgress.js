import { useState } from 'react'

const maxOffset = 24

export default function useScrollProgress() {
  const [visible, setVisible] = useState(false)
  const [offset, setOffset] = useState(maxOffset)

  const handleScrollProgress = ({ progress }) => {
    const newOffset = maxOffset - 0.9 * progress * maxOffset
    setOffset(Math.min(Math.round(newOffset), maxOffset))
  }

  return { handleScrollProgress, setVisible, visible, setOffset, offset }
}
