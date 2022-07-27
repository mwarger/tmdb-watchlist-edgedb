CREATE MIGRATION m12zsfbmdex4f7rbpkzdgwd3pwrygt3ivofmd52jw4hk55x5oxf3nq
    ONTO m1lhwnequj3gz3a5k5qy224mmmguvahqbxymup2f2fruhb7s4h3g6a
{
  ALTER TYPE default::User {
      ALTER LINK watchList {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
