import { prisma } from "../PrismaClient.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, ownerId } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        members: {
          create: {
            userId: ownerId,
            role: "OWNER",
          },
        },
      },
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all projects a user is part of
export const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.query;

    const projects = await prisma.projectMember.findMany({
      where: { userId },
      include: {
        project: true,
      },
    });

    res.json(projects.map((pm) => pm.project));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get project details (including members)
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        tasks: true,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Invite a user to a project
export const inviteUserToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userEmail, role } = req.body;

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existing = await prisma.projectMember.findFirst({
      where: { userId: user.id, projectId },
    });

    if (existing) {
      return res.status(400).json({ error: "User already in the project" });
    }

    const member = await prisma.projectMember.create({
      data: {
        userId: user.id,
        projectId,
        role: role ? role.toUpperCase() : "MEMBER",
      },
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign a Task to a project
export const assignTaskToProject = async (req, res) => {
  try {
    const { taskId, projectId } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { projectId },
    });

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProjectOverview = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await prisma.task.findMany({ where: { projectId } });

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "COMPLETED").length;
    const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const pending = total - (completed + inProgress);

    res.json({ total, completed, inProgress, pending });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
