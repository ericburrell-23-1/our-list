const LOCAL_IP = "192.168.1.151";

// Define predefined options for dropdowns
const FORM_OPTIONS = {
  CUISINE_OPTIONS: [
    "American",
    "Breakfast",
    "Chinese",
    "Coffee",
    "Greek",
    "Italian",
    "Just Drinks",
    "Mediterranean",
    "Mexican",
    "Pizza",
    "Sushi",
    "Tapas",
  ].sort(),

  LOCATION_OPTIONS: [
    "Lakeview East",
    "Loop",
    "Streeterville",
    "West Lakeview",
    "River North",
    "West Loop",
    "Wicker Park",
    "Lincoln Park",
    "Old Town",
    "Southport Corridor",
  ].sort(),

  PRICE_OPTIONS: ["$", "$$", "$$$", "$$$$"],
};

module.exports = { LOCAL_IP, FORM_OPTIONS };
