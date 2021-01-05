import { Sequelize } from 'sequelize';

export  default () => {
    const db = new Sequelize('postgres://postgres:admin@localhost:5432/livestax_deveclopment') // Example for postgres
  
    const teams = db.import("./models/teams")
    const admin_users = db.import("./models/admin_users")
    const app_categories = db.import("./models/app_categories")
    const apps = db.import("./models/apps")
    const pages = db.import("./models/pages")
    const page_apps = db.import("./models/page_apps")
    const organizations = db.import("./models/organizations")
    const spaces = db.import("./models/spaces")
    const app_category_apps = db.import("./models/app_category_apps")
    const users = db.import("./models/users")

    
  };
  