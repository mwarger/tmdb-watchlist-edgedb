CREATE MIGRATION m1iymnmz6qvqvs3kkxn6xi2gs4tdmeephzliznocat5nsjsgurcm5a
    ONTO m16io3iwyqlsurvqp4ymklkljrzp4cwjoobmfazp7fcfyghtdmaeqa
{
  ALTER TYPE default::User {
      CREATE ACCESS POLICY own_user
          ALLOW ALL USING ((.uid ?= GLOBAL default::current_user));
  };
};
