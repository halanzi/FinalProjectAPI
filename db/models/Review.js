module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    comment: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        // message: "Rating must be between 1 to 5 ",
      },
    },
  });
  return Review;
};
