
module default {
  global current_user -> str;
  
  type User {
    property uid -> str {
      constraint exclusive;
    };
    property email -> str;
    access policy own_user
       allow all
       using (.uid ?= global current_user)
  }

  type WatchListItem {
    required property movieId -> str;  
    link user -> User;
    access policy own_watchlist
       allow all
       using (.user.uid ?= global current_user)
  }

};