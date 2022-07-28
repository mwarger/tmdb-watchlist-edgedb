CREATE MIGRATION m16io3iwyqlsurvqp4ymklkljrzp4cwjoobmfazp7fcfyghtdmaeqa
    ONTO m1dkmumathom2dvjzz33v6kzlozzo4ti47wi2ruvbbui6l3qlhr2da
{
  CREATE GLOBAL default::current_user -> std::str;
  ALTER TYPE default::WatchListItem {
      CREATE LINK user -> default::User;
      CREATE ACCESS POLICY own_watchlist
          ALLOW ALL USING ((.user.uid ?= GLOBAL default::current_user));
  };
  ALTER TYPE default::User {
      DROP LINK watchList;
  };
};
