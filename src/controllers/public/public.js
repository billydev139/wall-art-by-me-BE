import artCollection from "../../models/artCollection.js";
// get all the art collections
export const getArtCollection = async (req, res) => {
  try {
    const arts = await artCollection.find({}).sort({ name: 1 });
    let artCollectionData = [];
    arts.forEach((element) => {
      let artCollectionObj = {
        _id: element._id,
        name: element.name,
      };
      artCollectionData.push(artCollectionObj);
    });

    console.log("🚀 ~ get ~ art:", arts);

    return res
      .status(200)
      .json({ message: "Get Art Successfully", artCollectionData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
