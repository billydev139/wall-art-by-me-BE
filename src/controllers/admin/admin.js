// Add barber
export const addArt = async (req, res) => {
  try {
    let data = req.body;

    let name = await Barber.find({ email: data.email });
    console.log("🚀 ~ addBarber ~ barberEmail:", barberEmail);
    if (barberEmail.length > 0) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    let barberPhone = await Barber.find({ phone: data.phone });
    console.log("🚀 ~ addBarber ~ barberPhone:", barberPhone);
    if (barberPhone.length > 0) {
      return res.status(400).json({ message: "Phone Already Exists" });
    }
    const newBarber = new Barber({
      barberName: data.barberName,
      phone: data.phone,
      email: data.email,
      skills: data.skills,
      address: data.address,
      experience: data.experience,
    });
    await newBarber.save();
    return res.status(200).json({ message: "Barber Saved successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

