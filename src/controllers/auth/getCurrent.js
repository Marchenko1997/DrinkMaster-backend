export const getCurrent = (req, res) => {
  const { email, name, birthday, avatarURL, _id, isAdult } = req.user;

  res.json({
    name,
    email,
    avatarURL,
    birthday,
    id: _id,
    isAdult,
  });
};
