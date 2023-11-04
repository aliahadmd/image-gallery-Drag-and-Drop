import React, { useState } from "react";
import "./App.css";
import images from "./images";

function App() {
  const [imageList, setImageList] = useState(images); // It stores an array of image data
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null); // It keeps track of the index of the currently dragged image or is set to null if no image is being dragged.
  const [virtualDropZone, setVirtualDropZone] = useState<number | null>(null); //It stores the index of the virtual drop zone or is set to null when no drop zone is active.
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]); //It is an array that keeps track of the selected image indices.

  // helper function used in a React component to toggle the selection state of images in an image gallery.
  const toggleSelect = (index: number) => {
    if (selectedPhotos.includes(index)) {
      setSelectedPhotos(selectedPhotos.filter((item) => item !== index));
    } else {
      setSelectedPhotos([...selectedPhotos, index]);
    }
  };

  //the deleteSelectedPhotos function filters out and removes the selected images from the imageList state and clears the list of selected images, effectively implementing a deletion feature for the selected images in the image gallery.
  const deleteSelectedPhotos = () => {
    const filteredImages = imageList.filter(
      (_, index) => !selectedPhotos.includes(index)
    );
    setImageList(filteredImages);
    setSelectedPhotos([]);
  };

  //   the handleDragStart function prepares and configures the drag-and-drop operation by setting the data to be transferred, updating the draggedIndex state, and specifying a custom drag image to be displayed during the drag operation.

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("index", index.toString());
    setDraggedIndex(index);
    e.dataTransfer.setDragImage(e.target, 50, 50); // Prevents default ghost image
  };

  // the handleDragOver function is responsible for configuring the behavior of the drag-and-drop operation when an element is being dragged over a specific element.

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setVirtualDropZone(index);
    e.currentTarget.setAttribute("data-drag-over", "true");
    e.dataTransfer.effectAllowed = "move"; // Set the effectAllowed to move
    e.dataTransfer.dropEffect = "move"; // Set the dropEffect to move
    e.currentTarget.style.cursor = "default"; // Change the cursor style to default
  };

  //the handleDrop function is responsible for processing the drop event and implementing the actual reordering of images in the gallery as part of a drag-and-drop operation

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, toIndex: number) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData("index");

    if (fromIndex === "") return;

    const updatedImageList = [...imageList];
    const [draggedImage] = updatedImageList.splice(Number(fromIndex), 1);
    updatedImageList.splice(toIndex, 0, draggedImage);

    setImageList(updatedImageList);
    setDraggedIndex(null);
    setVirtualDropZone(null);

    // Add animation-related code here, e.g., using CSS transitions.
  };

  //the handleDragEnd function is responsible for resetting certain state variables related to the drag-and-drop operation when the drag operation is completed or ends. It clears the virtualDropZone and draggedIndex state variables, ensuring that there is no active dragging or hover state after the drag operation has finished.

  const handleDragEnd = () => {
    setVirtualDropZone(null);
    setDraggedIndex(null);
  };

  return (
    <div className="main">
      <div className="main__header">
        {selectedPhotos.length > 0 && selectedPhotos.length < 2 ? (
          <div className="main__header__checkbox">
            <input
              type="checkbox"
              name="a"
              id="a"
              className="main__header__checkbox__input"
              checked={selectedPhotos.length > 0}
              //   If all images are already selected, checking the checkbox clears the selection. If not all images are selected, checking the checkbox selects all images in the gallery.
              onChange={() => {
                const allSelected = selectedPhotos.length === imageList.length;
                if (allSelected) {
                  setSelectedPhotos([]);
                } else {
                  setSelectedPhotos(imageList.map((_, index) => index));
                }
              }}
            />
            <label htmlFor="a" className="main__header__checkbox__label">
              {selectedPhotos.length} File selected
            </label>
          </div>
        ) : selectedPhotos.length > 1 ? (
          <div className="main__header__checkbox">
            <input
              type="checkbox"
              name="a"
              id="a"
              className="main__header__checkbox__input"
              checked={selectedPhotos.length > 0}
              //   If all images are already selected, checking the checkbox clears the selection (deselects all images). If not all images are selected, checking the checkbox selects all images in the gallery.
              onChange={() => {
                const allSelected = selectedPhotos.length === imageList.length;
                if (allSelected) {
                  setSelectedPhotos([]);
                } else {
                  setSelectedPhotos(imageList.map((_, index) => index));
                }
              }}
            />
            <label htmlFor="a" className="main__header__checkbox__label">
              {selectedPhotos.length} Files selected
            </label>
          </div>
        ) : (
          <div className="main__header__checkbox">
            <h3>Gallery</h3>
          </div>
        )}

        {selectedPhotos.length === 1 ? (
          <button onClick={deleteSelectedPhotos}>Delete file</button>
        ) : selectedPhotos.length > 1 ? (
          <button onClick={deleteSelectedPhotos}>Delete files</button>
        ) : (
          <h1></h1>
        )}
      </div>

      <hr className="main__hr" />

      <div className="container">
        {imageList.map((image, index) => (
          <div
            key={image.id}
            className={`container__children ${index === 0 ? "large" : ""} ${
              index === draggedIndex ? "dragging" : ""
            } ${index === virtualDropZone ? "virtual-drop-zone" : ""} ${
              selectedPhotos.includes(index) > 0
                ? "container__children__opacity"
                : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <img
              src={image.image}
              alt="picture"
              width="150px"
              height="150px"
              className="container__children__image"
              loading="lazy"
            />
            <input
              type="checkbox"
              name="x"
              id="x"
              className={`container__children__checkbox ${
                selectedPhotos.includes(index)
                  ? "container__children__checkbox__display__true"
                  : "container__children__checkbox__display__false"
              }`}
              onChange={() => toggleSelect(index)}
              checked={selectedPhotos.includes(index)}
            />
          </div>
        ))}
        <div className="upload">
          <img
            src={"media.svg"}
            alt={"media"}
            width={30}
            height={30}
            className=""
            loading="lazy"
          />
          <h3 className="upload__rext">Add Images</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
