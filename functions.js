function getCategoryImage(category) {
  switch (category) {
    case "food":
      return "./assets/icons/food.png";
    case "transportation":
      return "./assets/icons/transportation.png";
    case "subscription":
      return "./assets/icons/subscription.png";
    case "shopping":
    default:
      return "./assets/icons/shopping.png";
  }
}
