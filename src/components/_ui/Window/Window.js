import React, { useState, useRef, useEffect } from 'react';
import WindowFrame from './WindowFrame';
import WindowDragOutline from './WindowDragOutline';
import TitleBar, { DEFAULT_TITLEBAR_BUTTONS } from './TitleBar';
import TitleBarTransition from './TitleBarTransition';
import { MenuBar, MenuBarItem } from './MenuBar';
import Portal from 'lib/Portal';
import useTaskManager from 'lib/useTaskManager';
import useApplicationContext from 'lib/useApplicationContext';
import useDraggable from 'lib/useDraggable';
import useBoundingRect from 'lib/useBoundingRect';
import useEventListener from 'lib/useEventListener';
import { useOnMousedownOutside } from 'lib/useOnClickOutside';
import { taskbarHeight } from 'lib/constants';
import { ResizableBox, Resizable } from 'react-resizable';
import { Rnd } from 'react-rnd';

function useMinimize(titleBarTransitionRef) {
  // MINIMIZING SYSTEM
  /* Minimizing system should be triggered through `setIsTransitioning` as this will 
  trigger the transition and, as a side effect, will toggle the minimize state. 
  This is to allow the animation to complete before making the window disappear. */
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  function toggleMinimize() {
    setIsTransitioning(true);
  }

  useEffect(() => {
    if (isTransitioning && titleBarTransitionRef.current) {
      const handler = () => {
        setIsTransitioning(false);
        setIsMinimized((isMinimized) => !isMinimized);
      };
      titleBarTransitionRef.current.addEventListener('transitionend', handler, {
        once: true
      });
    }
  }, [isTransitioning, titleBarTransitionRef]);

  return { isTransitioning, isMinimized, toggleMinimize };
}

const Window = ({
  icon,
  title,
  titlebarButtons = DEFAULT_TITLEBAR_BUTTONS,
  menuItems,
  resizable,
  children
}) => {
  const { activeTask, setTaskActiveStatus } = useTaskManager();
  const app = useApplicationContext();
  // const bounds = useBoundingRect(app.windowRef);
  const titleBarRef = useRef();
  const activeWindowRef = useRef();
  const titleBarTransitionRef = useRef();
  const { isTransitioning, isMinimized, toggleMinimize } = useMinimize(
    titleBarTransitionRef
  );
  const [position, setPosition] = useState({ x: app.x, y: app.y });
  const [isDragging, setIsDragging] = useState(false);
  const [delta, setDelta] = useState();
  const dragContainerRef = useRef();

  useEffect(
    () => setTaskActiveStatus(app.id, !isMinimized),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMinimized, app.id] // app.id added to dependency list, setTaskActiveStatus excluded, possible stale closure
  );

  useEffect(() => {
    if (isMinimized && activeTask === app.id) {
      toggleMinimize();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTask, app.id]); // app.id added to dependency list, toggleMinimize excluded, possible stale closure

  // Change active task to the window on mousedown of the window
  useEventListener(dragContainerRef, 'mousedown', () => {
    setTaskActiveStatus(app.id, true);
  });

  // Attempt to change active task to null as we are no longer focused on the window
  useOnMousedownOutside(dragContainerRef, () =>
    setTaskActiveStatus(app.id, false)
  );

  return (
    <Rnd
      style={{ cursor: '' }}
      default={{
        x: app.x,
        y: app.y,
        width: app.width,
        height: app.height
      }}
      minWidth={app.minWidth}
      minHeight={app.minHeight}
      bounds="parent"
      position={{ x: position.x, y: position.y }}
      onDragStart={() => {
        setTaskActiveStatus(app.id, true);
        setIsDragging(true);
      }}
      onResizeStart={() => setTaskActiveStatus(app.id, true)}
      onResizeStop={(_, __, ___, ____, position) => {
        setTaskActiveStatus(app.id, true);
        setPosition({
          x: position.x,
          y: position.y
        });
      }}
      onDragStop={(mouseEvent, draggableData) => {
        setDelta({ x: draggableData.deltaX, y: draggableData.deltaY });
        setPosition({
          x: draggableData.x,
          y: draggableData.y
        });
        setIsDragging(false);
      }}
      dragHandleClassName="titleBar"
    >
      {/* ContextProvider, Window, and AppComponent will latch onto this ref. Must add the display none, otherwise, we will detect clicks on the div when it is minimized, which will alert the listeners to make the window active */}
      <div
        ref={dragContainerRef}
        style={{
          height: '100%',
          display: isMinimized && !isTransitioning ? 'none' : null
        }}
      >
        <app.ApplicationContext.Provider value={{ ...app, toggleMinimize }}>
          <WindowFrame
            ref={app.windowRef}
            tabIndex="0"
            isMinimized={isMinimized}
          >
            <TitleBar
              className="titleBar"
              ref={titleBarRef}
              active={app.id === activeTask}
              title={title + '| ' + position.x + ', ' + position.y}
              buttons={titlebarButtons}
              icon={icon}
              onMinimize={toggleMinimize}
            />
            {menuItems ? (
              <MenuBar>
                {menuItems.map((menuItem, i) => (
                  <MenuBarItem key={i}>{menuItem}</MenuBarItem>
                ))}
              </MenuBar>
            ) : undefined}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
          </WindowFrame>

          {/* {isDragging && (
          <Portal parent={app.windowRef.current.parentElement}>
            <WindowDragOutline
              resizableWindow={resizable}
              bounds={bounds}
              delta={delta}
            />
          </Portal>
        )} */}
          {isTransitioning && (
            <Portal parent={app.windowRef.current.parentElement}>
              <TitleBarTransition
                ref={titleBarTransitionRef}
                title={title}
                icon={icon}
                srcRef={isMinimized ? app.taskbarRef : titleBarRef}
                destRef={isMinimized ? titleBarRef : app.taskbarRef}
              />
            </Portal>
          )}
        </app.ApplicationContext.Provider>
      </div>
    </Rnd>
  );
};

export default Window;
