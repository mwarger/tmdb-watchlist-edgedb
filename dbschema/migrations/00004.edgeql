CREATE MIGRATION m17t62wnp52hxp5mfnpso2wkx74y7vjm3giykplvibywjyhe6oimbq
    ONTO m1mmqv3hkzvt7bbdb3zguv2t3t4fffzcktvjvfj5cmtdghwgprkbia
{
  ALTER TYPE default::User {
      ALTER LINK watchList {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
