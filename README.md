# image gallery Drag and Drop without third party libraries.



This documentation provides an overview of a React.js application for creating an image gallery with a drag and drop feature. The application allows users to view, select, and reorder images within the gallery. Below is a brief description of the key components, features, and styles used in this application.

## Table of Contents
1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Components](#components)
4. [CSS Styles](#css-styles)
5. [Usage](#usage)

## 1. Introduction <a name="introduction"></a>

The React Image Gallery is a web application designed to manage and display a collection of images in a gallery format. Users can interact with the images through various features, including selecting images for further actions, such as deletion, and rearranging images via drag and drop.

## 2. Key Features <a name="key-features"></a>

### Image Management
- View a collection of images in a grid layout.
- Select one or multiple images by clicking on the checkbox associated with each image.
- Deselect all selected images by clicking a master checkbox in the header.

### Drag and Drop
- Reorder images within the gallery by dragging and dropping them.
- A virtual drop zone indicates the position where a dragged image can be dropped.
- Real-time visual feedback during the drag-and-drop operation.

### Image Deletion
- Delete selected images from the gallery.
- The "Delete" button in the header deletes either a single image or multiple selected images, depending on the selection count.

## 3. Components <a name="components"></a>

### App.tsx
- The main application component that renders the image gallery.
- Manages the state for image data, selected images, and drag-and-drop operations.
- Provides functions to handle image selection, deletion, and reordering.
- Implements drag-and-drop event handlers for images.
- Utilizes CSS classes to apply styles to the gallery elements.

## 4. CSS Styles <a name="css-styles"></a>

The application's appearance is defined in the `App.css` file. Key CSS classes and styles include:

- Styling for the main container, header, and individual image containers.
- Custom styles for the master checkbox in the header.
- Animation and transition effects during drag-and-drop operations.
- Visual effects for the virtual drop zone and hover state.
- Checkbox opacity control for image selection.
- Responsive design adjustments for smaller screens.

## 5. Usage <a name="usage"></a>

To use this React Image Gallery with Drag and Drop feature, follow these steps:

1. Clone or download the project source code. `git clone https://github.com/aliahadmd/image-gallery-Drag-and-Drop.git`
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install the project's dependencies.
4. Run `npm run dev` to start the development server.


You can then interact with the image gallery by selecting images, dragging and dropping them to reorder, and deleting selected images as needed.

