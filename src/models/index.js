// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrgaType = {
  "SOLO": "solo",
  "TEAM": "team",
  "ORPHAN": "orphan"
};

const OrgaRank = {
  "ADMIN": "admin",
  "MOLDU": "moldu"
};

const { Organisation, User } = initSchema(schema);

export {
  Organisation,
  User,
  OrgaType,
  OrgaRank
};