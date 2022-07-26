module default {
  type WatchListItem {
    required property movieId -> str;  
  }

  type User {
    property uid -> str {
      constraint exclusive;
    };
    property email -> str;
    multi link watchList -> WatchListItem;
  }
};