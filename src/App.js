import React, { useState, useEffect } from "react";
import { Component } from "./Component";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fetchedImg, setFetchedImg] = useState();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const fetchData = async () => {
    const result = await fetch(
      "https://jsonplaceholder.typicode.com/photos"
    ).then((res) => res.json());

    // const resultUrl = result.url;
    const randomNumber = getRandomInt(result.length);

    setFetchedImg(result[randomNumber].url);
  };
  //

  const addMoveable = () => {
    fetchData();
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple", "orange"];

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        bottom: null,
        right: null,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],

        updateEnd: true,
      },
    ]);
  };
  console.log(fetchedImg);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(()=>{
  // if(moveableComponents  || moveableComponents  === -1 || moveableComponents === 1) {

  // }
  // },[moveableComponents])

  // console.log(item.top);
  // const checkLimits = () => {

  // };

  //!!!!!!

  console.log(moveableComponents);
  const updateMoveable = (e, id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      // if (e.top < 0 || e.right < 0 || e.left < 0 || e.bottom < 0) {
      //   (newComponent.top = 0),
      //     (newComponent.right = 0),
      //     (newComponent.left = 0),
      //     (newComponent.bottom = 0);
      // }

      if (e.top < 0) {
        newComponent.top = 0;
      }
      if (e.right < 0) {
        newComponent.right = 0;
      }
      if (e.left < 0) {
        newComponent.left = 0;
      }
      if (e.bottom < 0) {
        newComponent.bottom = 0;
      }
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }

      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    // if (e.top < 0 || e.right < 0 || e.left < 0 || e.bottom < 0) {
    //   setMoveableComponents([{ top: 0, left: 0, bottom: 0, right: 0 }]);
    // } else {
    //   console.log("dentro");
    // }

    // Check if the resize is coming from the left handle

    const [handlePosX, handlePosY] = e.translate;
    //console.log(handlePosX, handlePosY);
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right
    // console.log(moveableComponents);
    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX < -1) {
      // console.log("width", moveableComponents, e);

      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <button onClick={addMoveable}>Add Moveable1</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component
            selected={selected}
            {...item}
            key={index}
            // checkLimits={checkLimits}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
      </div>
    </main>
  );
};

export default App;

//? if (
//   moveableComponents[moveableComponents.length - 1].top < 0 ||
//   moveableComponents[moveableComponents.length - 1].left < 0
// ) {
//   console.log(moveable);
// } else {
//   console.log("dentro");
// }
