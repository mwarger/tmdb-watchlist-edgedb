CREATE MIGRATION m1lhwnequj3gz3a5k5qy224mmmguvahqbxymup2f2fruhb7s4h3g6a
    ONTO initial
{
  CREATE TYPE default::WatchListItem {
      CREATE REQUIRED PROPERTY movieId -> std::str;
  };
  CREATE TYPE default::User {
      CREATE MULTI LINK watchList -> default::WatchListItem;
      CREATE PROPERTY email -> std::str;
      CREATE PROPERTY uid -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
