const exec = require('child_process').exec;
var files = 
[
    //models
    'src/models/capturePoint.ts',
    'src/models/player.ts',
    'src/models/position.ts',
    'src/models/team.ts',
    //states
    'src/states/StateCapturePoints.ts',
    'src/states/StateCounter.ts',
    'src/states/StatePlayers.ts',
    'src/states/StateRoot.ts',
    'src/states/StateTeams.ts'
]

var filesString = ''

files.forEach(filePath => {
    filesString = filesString + filePath + ' '
})

var command = `npx schema-codegen ${filesString} --output dist/models --csharp --namespace Mem.Models.Schema`

exec(command,
function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
         console.log('exec error: ' + error);
    }
});