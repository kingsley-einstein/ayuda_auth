import env from "../../env";

const { db } = env;

export default {
  development: {
    ...db.development,
    define: {
      underscored: true
    },
    sync: {
      force: false
    }
  },
  test: {
    ...db.test,
    define: {
      underscored: true
    },
    sync: {
      force: true
    }
  },
 production: {
   ...db.production,
   define: {
    underscored: true
   },
   sync: {
    force: false,
    alter: true
   }
 }
}
