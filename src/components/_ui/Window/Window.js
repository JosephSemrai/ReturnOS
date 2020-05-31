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

function useMinimize(titleBarTransitionRef) {
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
  }, [isTransitioning]);

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
  const bounds = useBoundingRect(app.windowRef);
  const titleBarRef = useRef();
  const titleBarTransitionRef = useRef();
  const { isTransitioning, isMinimized, toggleMinimize } = useMinimize(
    titleBarTransitionRef
  );
  const [position, setPosition] = useState({ x: app.x, y: app.y });

  // Checks if the position of the Window combined with the bounds of the Window lead to the Window's content being displayed off screen
  // If this is true, we will adjust the Window to display fully within the bounds of the screen, else we will return the values unaltered
  // TODO: Move this logic into the bounds detection when moving the window so the user is unable to move the Window off of the screen
  const windowBoundsAdjuster = () => {
    if (!bounds || !position) return;

    let desktopHeight = window.innerHeight - 28;
    let desktopWidth = window.innerWidth;

    // Re-calculate new position including the delta as the changes may not have been processed yet
    if (position.y + bounds.height > desktopHeight)
      alert(
        'Bounds height:' + bounds.height + ' | ' + 'Position: ' + position.y
      );
  };

  // Run the bounds adjuster every single time the position is updated
  useEffect(() => {
    windowBoundsAdjuster();
  }, [position]);

  useEffect(() => setTaskActiveStatus(app.id, !isMinimized), [isMinimized]);
  useEffect(() => {
    if (isMinimized && activeTask === app.id) {
      toggleMinimize();
    }
  }, [activeTask]);

  const { isDragging, delta } = useDraggable(titleBarRef, {
    onDragStart() {
      setTaskActiveStatus(app.id, true);
    },
    onDragEnd({ delta }) {
      console.log(`X Delta ${delta.x}`);
      console.log(`Y Delta ${delta.y}`);
      console.log('height' + window.screen.height);

      console.log(JSON.stringify(bounds));
      setPosition((position) => ({
        x: position.x + delta.x,
        y: position.y + delta.y
      }));
    }
  });

  useEventListener(app.windowRef, 'mousedown', () =>
    setTaskActiveStatus(app.id, true)
  );
  useOnMousedownOutside(app.windowRef, () =>
    setTaskActiveStatus(app.id, false)
  );

  return (
    <app.ApplicationContext.Provider value={{ ...app, toggleMinimize }}>
      <WindowFrame
        ref={app.windowRef}
        x={position.x}
        y={position.y}
        resizable={resizable}
        tabIndex="0"
        isMinimized={isMinimized}
      >
        <TitleBar
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
        {children}
      </WindowFrame>
      {isDragging && (
        <Portal parent={app.windowRef.current.parentElement}>
          <WindowDragOutline
            resizableWindow={resizable}
            bounds={bounds}
            delta={delta}
          />
        </Portal>
      )}
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
  );
};

export default Window;
