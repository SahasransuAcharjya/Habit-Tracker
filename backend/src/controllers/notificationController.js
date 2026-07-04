const saveSubscription = async (req, res) => {
  try {
    const { subscription } = req.body;

    return res.status(201).json({
      success: true,
      message: "Notification subscription saved successfully.",
      data: subscription || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save notification subscription.",
      error: error.message,
    });
  }
};

const sendTestNotification = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Test notification request received successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send test notification.",
      error: error.message,
    });
  }
};

module.exports = {
  saveSubscription,
  sendTestNotification,
};