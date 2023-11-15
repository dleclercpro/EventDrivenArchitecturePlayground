import { PACKAGE_VERSION } from './constants';



const execute = async () => {
    console.log(`Common app: v${PACKAGE_VERSION}`);
}



// Run
execute()
    .catch((err) => {
        console.error(err, `Uncaught error:`);
    });

export default execute;