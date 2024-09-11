const prisma = require("../utils/db");

const updateAllotedNiyyat = async (req, res) => {
  const { yasin, yasin_alloted, tasbeeh, tasbeeh_alloted, user_id } = req.body;

  try {
    const updateCount = await prisma.niyyat_table.updateMany({
      where: {
        user_id: user_id,
      },
      data: {
        yasin: yasin,
        yasin_alloted: yasin_alloted,
        tasbeeh_alloted: tasbeeh_alloted,
        tasbeeh: tasbeeh,
      },
    });

    if (updateCount.count === 0) {
      throw new Error(
        "Data update failed, no records found for the given user_id"
      );
    }

    res.json({
      success: true,
      message: `${updateCount.count} record(s) updated`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllotedDua = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const allotedDua = await prisma.niyyat_table.findFirst({
      where: {
        user_id: userId,
      },
    });
    res.json(allotedDua);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const commonTasbeehUpdate = async (req, res) => {
  const { dua_id, user_id } = req.body;

  try {
    const updateCount = await prisma.overall_niyyat.create({
      data: {
        user_id: user_id,
        dua: dua_id,
      },
    });

    if (!updateCount) {
      throw new Error("Data update failed");
    }

    res.json({
      success: true,
      message: `1 record(s) Added`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCommonTasbeeh = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const duas = await prisma.dua.findMany();
    const result = {
      user_id: userId,
      dua: [],
    };
    for (const element of duas) {
      const userRecitedDua = await prisma.overall_niyyat.count({
        where: {
          user_id: userId,
          dua: element.id,
        },
      });
      result.dua = [
        ...result.dua,
        {
          dua_id: element.id,
          name: element.name,
          recited: userRecitedDua,
        },
      ];
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateAllotedNiyyat,
  commonTasbeehUpdate,
  getCommonTasbeeh,
  getAllotedDua
};
