// import jsonfile from 'jsonfile';
// import moment from 'moment';
// import simpleGit from 'simple-git';
// import  random from 'random';

// const FILE_PATH = './data.json';

// // const makeCommit = n => {

//     // if (n==0) return simpleGit.push();
//     // const x = random.int(0,54);
//     // const y = random.int(0,6);

//     const DATE = moment().subtract(1,'y').add(1,'d')
//                         .add(1, 'w').add(1, 'd') .format();
//     const data ={
//        date: DATE
//     }
//       // call back function to ensure that file has to be written before pushed 
//     console.log("Date ",DATE)
//     jsonfile.writeFile(FILE_PATH, data, ()=>{
//         // git commit --date="Mon 2024"
//         simpleGit().add([FILE_PATH]).commit(DATE,{'--date': DATE}, 
//          makeCommit.bind(this).push());
//     });

// // }

// // makeCommit(100);


import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';

const FILE_PATH = './data.json';
const git = simpleGit();

// Set the commit date to yesterday
const DATE = moment().subtract(1,'d').format();//subtract(1,'y').add(1,'d')

// Data to write to the JSON file
const data = {
    date: DATE
};

// Log the date and perform the Git operations
console.log("Date:", DATE);

jsonfile.writeFile(FILE_PATH, data, async () => {
    try {
        await git.add([FILE_PATH]);
        await git.commit(`Commit for ${DATE}`, { '--date': DATE });
        await git.push();
        console.log("Commit and push successful!");
    } catch (error) {
        console.error("Error during commit or push:", error);
    }
});
