import React, { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";

export const Component = ({
  updateMoveable,
  top,
  left,
  right,
  bottom,
  width,
  height,
  index,
  color,
  id,
  setSelected,
  isSelected = false,
  updateEnd,
  handleResizeStart,
}) => {
  const ref = useRef();

  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    right,
    bottom,
    width,
    height,
    index,
    color,
    id,
  });

  let parent = document.getElementById("parent");
  let parentBounds = parent?.getBoundingClientRect();

  // const checkIFIsOnParent = () => {
  //   if (top < 0) {
  //     console.log("fuera");
  //   }
  // };

  const onResize = async (e) => {
    // ACTUALIZAR ALTO Y ANCHO
    let newWidth = e.width;
    let newHeight = e.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;
    const positionMaxRight = right + newWidth;
    const positionMaxBottom = bottom + newHeight;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;
    if (positionMaxRight > parentBounds?.width)
      newWidth = parentBounds?.width - right;
    if (positionMaxBottom > parentBounds?.height)
      newHeight = parentBounds?.height - bottom;

    updateMoveable(id, {
      top,
      left,
      right,
      bottom,
      width: newWidth,
      height: newHeight,
      color,
    });

    // ACTUALIZAR NODO REFERENCIA
    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
      translateX,
      translateY,
      top: top + translateY < 0 ? 0 : top + translateY,
      left: left + translateX < 0 ? 0 : left + translateX,
      right: right + translateX < 0 ? 0 : right + translateX,
      bottom: bottom + translateY < 0 ? 0 : bottom + translateY,
    });
  };

  const onResizeEnd = async (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;
    const positionMaxRight = right + newWidth;
    const positionMaxBottom = bottom + newHeight;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;
    if (positionMaxRight > parentBounds?.width)
      newWidth = parentBounds?.width - right;
    if (positionMaxBottom > parentBounds?.height)
      newHeight = parentBounds?.height - bottom;

    const { lastEvent } = e;
    const { drag } = lastEvent;
    const { beforeTranslate } = drag;

    const absoluteTop = top + beforeTranslate[1];
    const absoluteLeft = left + beforeTranslate[0];
    const absoluteRight = right + beforeTranslate[0];
    const absoluteBottom = bottom + beforeTranslate[0];

    updateMoveable(
      id,
      {
        top: absoluteTop,
        left: absoluteLeft,
        right: absoluteRight,
        bottom: absoluteBottom,
        width: newWidth,
        height: newHeight,
        color,
      },
      true
    );
  };

  return (
    <>
      <div
        ref={ref}
        className="draggable"
        id={"component-" + id}
        style={{
          position: "absolute",
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          width: width,
          height: height,
          background: color,
        }}
        onClick={() => setSelected(id)}
      />

      <Moveable
        target={isSelected && ref.current}
        resizable
        draggable
        onDrag={(e) => {
          updateMoveable(e, id, {
            // top: e.top,
            // left: e.left,
            right: e.right,
            bottom: e.bottom,
            width,
            height,
            color,
          });
          handleResizeStart(id, e);
        }}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        keepRatio={false}
        throttleResize={1}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={false}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};
