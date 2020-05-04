import { ErrorReporting } from '@google-cloud/error-reporting';

 // Instantiates a client
 const errorReport = new ErrorReporting({
    reportMode: 'always',
  });


  export default errorReport;