import { prisma } from "../PrismaClient.js";

export const addTask = async (req, res) => {
  try {
    const { title, date, priority, description, userId } = req.body;
    const image = req.file?.path || null;

    const task = await prisma.task.create({
      data: {
        title,
        dueDate: date ? new Date(date) : undefined,
        priority,
        description,
        assignedToId: userId,
        image,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await prisma.task.findMany({
      where: { assignedToId: userId },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, date, priority, description } = req.body;
    const image = req.file?.path;

    const updatedTask = await prisma.task.update({
      where: { id: req.params.id },
      data: {
        title,
        dueDate: date ? new Date(date) : undefined,
        priority,
        description,
        ...(image && { image }),
      },
    });

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

