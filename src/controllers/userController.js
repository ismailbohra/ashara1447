const prisma = require("../utils/db");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Fetch user details
    const user = await prisma.user.findFirst({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch user's niyyat details
    const niyyat = await prisma.niyyat_table.findFirst({
      where: { user_id: userId },
      select: {
        id: true,
        yasin: true,
        yasin_alloted: true,
        tasbeeh: true,
        tasbeeh_alloted: true,
      },
    });

    // Fetch all duas
    const duas = await prisma.dua.findMany();

    // Prepare the result object
    const result = {
      data: user,
      alloted: niyyat,
      commonDua: {},
    };

    // Loop through each dua and calculate the count of recitations for the user
    for (const element of duas) {
      const count = await prisma.overall_niyyat.count({
        where: {
          user_id: userId,
          dua: element.id,
        },
      });
      result.commonDua[element.name] = count;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { its } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        its: its,
      },
    });
    if (!user) {
      throw new Error("User Not Found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  login,
  getUser,
};
