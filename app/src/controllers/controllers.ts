import { RequestHandler } from "express";
import { Task } from "../models/models";
import { TASK_IDEAS } from "../data/tasks";

export const getTask: RequestHandler = (req, res, next) => {
  const newTask: Task = {
    due_date: new Date(),
    task_name:
      TASK_IDEAS.mem_store[
        Math.floor(Math.random() * TASK_IDEAS.mem_store.length)
      ],
  };
  res.status(200).send(
    `<h1>Task Idea</h1>
    <p>By ${newTask.due_date.toDateString()} you should ${
      newTask.task_name
    }</p>`
  );
};

export const listTasks: RequestHandler = (req, res, next) => {
  let htmlList = "<ul>";
  for (const task in TASK_IDEAS.mem_store) {
    htmlList += `<li>${TASK_IDEAS.mem_store[task]}</li>`;
  }
  htmlList += "</ul>";
  res.status(200).send(`<h1>All Tasks</h1><p>${htmlList}</p>`);
};

export const addTask: RequestHandler = (req, res, next) => {
  const text = (req.query as { task: string }).task;
  if (text != undefined) {
    TASK_IDEAS.add(text);
  }
  res.status(201).send(`<h1>New Task Created!</h1><p>${text}</p>`);
};
