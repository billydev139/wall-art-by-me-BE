// import artCollection from "../../models/artCollection";

//post ArtCollection


// //get artCollection
// export const getArtCollection = async (req, res) => {
//   try {
//     const artCollection = await artCollection.find({}).sort({ name: 1 });
//     let artCollectionData = [];
//     artCollectionData.forEach((element) => {
//       let artCollectionObj = {
//         _id: element.id,
//         barberName: element.name,
//       };
//       barberData.push(artCollectionObj);
//     });
//     console.log("🚀 ~ get ~ art:", artCollection);

//     // return res.status(200).json(Barber);
//     return res
//       .status(200)
//       .json({ message: "Get Barber Successfully", barberData });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
