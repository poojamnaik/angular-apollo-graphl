import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver } from 'graphql';


// One drawback of this approach is that it does not guarantee fields will be wrapped if they are added to the schema after AuthDirective is applied,
//  and the whole getUser(context.headers.authToken) is a made-up API that would need to be fleshed out
export default class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
      console.log('Ensure field wrappeds')
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;

        if (! requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        console.log('requiredRole', requiredRole);
        // const user = await getUser(context.headers.authToken);
        if (context.role != requiredRole) {
          throw new Error("not authorized");
        }

        return resolve.apply(this, args);
      };
    });
  }
}
