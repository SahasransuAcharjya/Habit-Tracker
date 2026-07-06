const catchAsync = require("../utils/catchAsync");
const {
  getTodayUserReport,
  generateTodayUserReport,
} = require("../services/reportService");

const getTodayReport = catchAsync(async (req, res) => {
  const report = await getTodayUserReport(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Today's report fetched successfully.",
    data: report,
  });
});

const generateTodayReport = catchAsync(async (req, res) => {
  const tone = req.body.tone || req.user.assistantTone || "BALANCED";

  const report = await generateTodayUserReport(req.user.id, tone);

  return res.status(200).json({
    success: true,
    message: "Today's report generated successfully.",
    data: report,
  });
});

module.exports = {
  getTodayReport,
  generateTodayReport,
};