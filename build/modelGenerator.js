const exec = require('child_process').exec;
var files = 
[
    //entities
    'src/entities/baseEntity.ts',
    'src/entities/building.ts',
    'src/entities/unit.ts',
    //models
    'src/models/attributes.ts',
    'src/models/bar.ts',
    'src/models/capturePoint.ts',
    'src/models/player.ts',
    'src/models/position.ts',
    'src/models/team.ts',
    'src/models/weapon.ts',
    //states
    'src/states/StateCapturePoints.ts',
    'src/states/StateCounter.ts',
    'src/states/StatePlayers.ts',
    'src/states/StateRoot.ts',
    'src/states/StateTeams.ts',
    'src/states/StateUnits.ts'
]

var filesString = ''

files.forEach(filePath => {
    filesString = filesString + filePath + ' '
})

var command = `npx schema-codegen ${filesString} --output dist/models --csharp --namespace Mem.Models`

exec(command,
function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
         console.log('exec error: ' + error);
    }
});