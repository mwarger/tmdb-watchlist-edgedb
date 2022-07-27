CREATE MIGRATION m1mmqv3hkzvt7bbdb3zguv2t3t4fffzcktvjvfj5cmtdghwgprkbia
    ONTO m12zsfbmdex4f7rbpkzdgwd3pwrygt3ivofmd52jw4hk55x5oxf3nq
{
  ALTER TYPE default::User {
      ALTER LINK watchList {
          RESET ON TARGET DELETE;
      };
  };
};
