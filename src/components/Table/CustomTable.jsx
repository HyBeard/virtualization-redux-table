import React, { useRef, useEffect, useState, createElement } from 'react'
import _ from 'lodash'

export default function CustomTable({
  itemCount,
  rowHeight,
  overscanCount,
  height,
  width,
  children,
  innerElementType
}) {
  const containerRef = useRef()
  const visibleRowsCount = Math.floor(height / rowHeight)
  const [rowIndexes, setRowIndexes] = useState(
    [...new Array(visibleRowsCount)].map((_, index) => index)
  )

  const scroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current
      const index = Math.floor((scrollTop + height) / rowHeight)
      const indexes = _.range(Math.min(index + overscanCount, itemCount))
      if (indexes.length >= visibleRowsCount + overscanCount) {
        const length = indexes.length
        setRowIndexes(
          _.slice(indexes, length - visibleRowsCount - overscanCount, length)
        )
      } else {
        setRowIndexes(indexes)
      }
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', scroll)
    }
  }, [])

  const returnItems = () => {
    return rowIndexes.map(index => {
      return createElement(children, {
        index,
        style: {
          height: `${rowHeight}px`,
          position: 'absolute',
          top: `${index * rowHeight}px`
        }
      })
    })
  }

  return createElement(
    'div',
    {
      ref: containerRef,
      style: { height: `${height}px`, width: width, overflow: 'auto' }
    },
    createElement(innerElementType || 'div', {
      children: returnItems(),
      style: {
        height: `${rowHeight * itemCount}px`,
        width: width,
        position: 'relative'
      }
    })
  )
}