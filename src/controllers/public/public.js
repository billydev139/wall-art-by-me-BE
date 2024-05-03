import fs from "fs";
// Utility function for sending responses
const sendResponse = (res, success, message, content) => {
  return res.status(success ? 200 : 400).json({ success, message, content });
};

// GET USER PROFILE DETAILS
export const hitApi = async (req, res) => {
  try {
    let { id, time_start, time_end } = req.params;
    let { time_period, interval } = req.query;
    let token  = req?.headers["authorization"]?.split(" ")[1];
  //  console.log("🚀 ~ hitApi ~ token:", token);
    if (!token) {
      return sendResponse(res, false, "Token is Required");
    }
    if (token) {
      const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical?id=${id}&time_start=${time_start}&time_end=${time_end}&time_period=${time_period}&interval=${interval}`;

      let result = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "X-CMC_PRO_API_KEY": token,
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      return sendResponse(res, true, "Alay Mara Put", result);
    } else {
      return sendResponse(res, false, "Chal Mara Put");
    }
  } catch (error) {
    console.log("🚀 ~ hitApi ~ error:", error);
    // return sendError(res, error);
    res.send("Error: " + error);
  }
};
