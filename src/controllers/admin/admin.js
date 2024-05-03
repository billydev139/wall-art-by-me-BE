import artCollection from "../../models/artCollection.js";

// addArtCollection
export const addArt = async (req, res) => {
  console.log("🚀 ~ addArt ~ req:", req);
  try {
    let data = req.body;
    let image = req;

    const newArt = new artCollection({
      name: data.name,
      category: data.category,
      imgURL: data.imgURL ? "null" : req.file.filename,
      price: data.price,
      size: data.size,
      artist: data.artist,
      description: data.description,
    });
    await newArt.save();
    return res.status(200).json({ message: "Art Saved successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Update Art Collection
export const updateArtById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedArt = await artCollection.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedArt) {
      return res.status(404).json({ message: "Art not found" });
    }

    return res
      .status(200)
      .json({ message: "Art updated successfully", updatedArt });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Delete Art Collection
export const deleteArtById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArt = await artCollection.findByIdAndDelete(id);

    if (!deletedArt) {
      return res.status(404).json({ message: "Art not found" });
    }

    return res
      .status(200)
      .json({ message: "Art deleted successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Get Art Collection by ID
export const getArtById = async (req, res) => {
  try {
    const { id } = req.params;

    const art = await artCollection.findById(id);

    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    return res.status(200).json({ message: "Art found", art });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
