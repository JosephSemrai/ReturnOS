import React, { useState, useLayoutEffect } from 'react';
import id from 'lib/id';

export const TaskManagerContext = React.createContext({});

// Hook that returns a setter for the loading piece of state
function useApplicationLoading() {
  const [isLoadingApplication, setIsLoadingApplication] = useState(false);
  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      const method = isLoadingApplication ? 'add' : 'remove';
      document.body.classList[method]('isLoadingApplication');
      console.log('Loading application...');
    }
  }, [isLoadingApplication]);

  return setIsLoadingApplication;
}

const TaskManager = ({ children }) => {
  // Object that keeps track of the tasks of the application
  const [tasks, setTasks] = useState({});
  const [activeTask, setActiveTask] = useState(null);
  const setIsLoading = useApplicationLoading();

  // Create task function (gets added to the TaskManagerContext)
  function createTask({ application, ...runtimeProps }) {
    if (application.singleton) {
      const running = Object.values(tasks).find(
        (task) => task.application === application
      );
      if (running) {
        setActiveTask(running.id);
        return running.id;
      }
    }

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500); // Simulates loading by stopping loading after 1 second

    const taskId = id();
    const windowRef = React.createRef();
    const taskbarRef = React.createRef();

    // This is what usually ends up as the runtime props unless we have any overrides
    const task = {
      ...runtimeProps,
      id: taskId,
      application,
      windowRef,
      taskbarRef
    };

    setTasks({ ...tasks, [taskId]: task });
    setActiveTask(taskId);
    return taskId;
  }

  async function endTask(taskId, { force } = {}) {
    const nextTasks = { ...tasks };
    const task = tasks[taskId];

    if (typeof task.taskWillEnd === 'function' && !force) {
      await task.taskWillEnd();
    }

    delete nextTasks[taskId];
    setTasks(nextTasks);
  }

  // Responsible for setting the active status of a task
  function setTaskActiveStatus(taskId, isActive) {
    // If the window is active and the task has a different ID, make this task's ID the active task
    if (isActive && taskId !== activeTask) {
      console.log('Making Task Active: ' + taskId);
      setActiveTask(taskId);
    } else if (!isActive && taskId === activeTask) {
      // If the window is not active (click off) and we are not focused on another window (same task ID), just have no tasks active
      setActiveTask(null);
    }
  }

  return (
    <TaskManagerContext.Provider
      value={{ tasks, createTask, endTask, activeTask, setTaskActiveStatus }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};

export default TaskManager;
