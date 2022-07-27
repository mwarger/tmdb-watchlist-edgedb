CREATE MIGRATION m1dkmumathom2dvjzz33v6kzlozzo4ti47wi2ruvbbui6l3qlhr2da
    ONTO m17t62wnp52hxp5mfnpso2wkx74y7vjm3giykplvibywjyhe6oimbq
{
  ALTER TYPE default::User {
      ALTER LINK watchList {
          ON TARGET DELETE ALLOW;
      };
  };
};
