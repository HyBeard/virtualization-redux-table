import { useRef, useEffect, useState, useCallback, createElement } from 'react'
import _ from 'lodash'

export default function CustomTable({
  itemCount,
  rowHeight,
  overscanCount,
  offsetTop,
  height,
  width,
  children,
  innerElementType
}) {
  const topOffsetRow = 5
  const containerRef = useRef()
  const visibleRowsCount = Math.floor(height / rowHeight)
  const [rowIndexes, setRowIndexes] = useState(
    [...new Array(Math.min(visibleRowsCount, itemCount))].map(
      (_, index) => index
    )
  )

  const scroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollLeft } = containerRef.current
      if (scrollLeft === 0) {
        const index = Math.floor((scrollTop + height) / rowHeight)
        const indexes = _.range(
          Math.min(index + overscanCount - topOffsetRow, itemCount)
        )
        if (indexes.length >= visibleRowsCount + overscanCount + topOffsetRow) {
          const length = indexes.length
          setRowIndexes(
            _.slice(indexes, length - visibleRowsCount - overscanCount, length)
          )
        } else {
          setRowIndexes(indexes)
        }
      } else {
        return
      }
    }
  }, [height, itemCount, overscanCount, rowHeight, visibleRowsCount])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', scroll)
    }
  }, [scroll])

  const returnItems = () => {
    return rowIndexes.map(index => {
      return createElement(children, {
        index,
        key: index,
        style: {
          height: `${rowHeight}px`,
          position: 'absolute',
          top: `${index * rowHeight + offsetTop}px`
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
